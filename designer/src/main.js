import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import fontData from 'three/examples/fonts/helvetiker_bold.typeface.json';
import { Brush, Evaluator, ADDITION, SUBTRACTION } from 'three-bvh-csg';

const FONT = new FontLoader().parse(fontData);

// A flat 2D outline extruded 1 unit and laid flat on the ground (extrudes upward).
function flatShape(shape, curveSegments = 32) {
  return new THREE.ExtrudeGeometry(shape, { depth: 1, bevelEnabled: false, curveSegments }).rotateX(-Math.PI / 2);
}

/* ------------------------------------------------------------------ *
 * Shapes. Every primitive is normalised to fit a 1×1×1 box, so an
 * object's scale is exactly its size in grid units.
 * ------------------------------------------------------------------ */
const SHAPES = {
  box: { label: 'Box', size: [2, 2, 2], make: () => new THREE.BoxGeometry(1, 1, 1) },
  sphere: { label: 'Sphere', size: [2, 2, 2], make: () => new THREE.SphereGeometry(0.5, 48, 32) },
  cylinder: { label: 'Cylinder', size: [2, 2, 2], make: () => new THREE.CylinderGeometry(0.5, 0.5, 1, 48) },
  cone: { label: 'Cone', size: [2, 2, 2], make: () => new THREE.ConeGeometry(0.5, 1, 48) },
  pyramid: {
    label: 'Pyramid',
    size: [2, 2, 2],
    make: () => new THREE.ConeGeometry(Math.SQRT1_2, 1, 4).rotateY(Math.PI / 4),
  },
  wedge: {
    label: 'Wedge',
    size: [2, 2, 2],
    make: () => {
      const s = new THREE.Shape();
      s.moveTo(-0.5, -0.5);
      s.lineTo(0.5, -0.5);
      s.lineTo(-0.5, 0.5);
      s.closePath();
      return new THREE.ExtrudeGeometry(s, { depth: 1, bevelEnabled: false });
    },
  },
  torus: {
    label: 'Ring',
    size: [2, 0.6, 2],
    make: () => new THREE.TorusGeometry(0.35, 0.15, 24, 64).rotateX(Math.PI / 2),
  },
  dome: {
    label: 'Dome',
    size: [2, 1, 2],
    make: () => {
      const top = new THREE.SphereGeometry(0.5, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2);
      const bottom = new THREE.CircleGeometry(0.5, 48).rotateX(Math.PI / 2);
      return mergeGeometries([top, bottom]);
    },
  },
  tube: {
    label: 'Tube',
    size: [2, 2, 2],
    make: () => {
      const s = new THREE.Shape().absarc(0, 0, 0.5, 0, Math.PI * 2, false);
      s.holes.push(new THREE.Path().absarc(0, 0, 0.36, 0, Math.PI * 2, true));
      return flatShape(s, 48);
    },
  },
  hexagon: {
    label: 'Hexagon',
    size: [1.732, 2, 2],
    make: () => new THREE.CylinderGeometry(0.5, 0.5, 1, 6),
  },
  capsule: {
    label: 'Capsule',
    size: [1.5, 3, 1.5],
    make: () => new THREE.CapsuleGeometry(0.5, 1, 12, 32),
  },
  star: {
    label: 'Star',
    size: [2, 0.5, 2],
    make: () => {
      const s = new THREE.Shape();
      for (let i = 0; i < 10; i++) {
        const r = i % 2 ? 0.2 : 0.5;
        const a = (i / 10) * Math.PI * 2 + Math.PI / 2;
        if (i === 0) s.moveTo(Math.cos(a) * r, Math.sin(a) * r);
        else s.lineTo(Math.cos(a) * r, Math.sin(a) * r);
      }
      s.closePath();
      return flatShape(s);
    },
  },
  heart: {
    label: 'Heart',
    size: [2, 0.5, 2],
    make: () => {
      const s = new THREE.Shape();
      s.moveTo(0, -0.5);
      s.bezierCurveTo(0.1, -0.35, 0.5, -0.1, 0.5, 0.15);
      s.bezierCurveTo(0.5, 0.45, 0.15, 0.5, 0, 0.3);
      s.bezierCurveTo(-0.15, 0.5, -0.5, 0.45, -0.5, 0.15);
      s.bezierCurveTo(-0.5, -0.1, -0.1, -0.35, 0, -0.5);
      return flatShape(s);
    },
  },
};
// Shapes that look the same after a left/right mirror (when not rotated).
const X_SYMMETRIC = new Set([
  'box', 'sphere', 'cylinder', 'cone', 'pyramid', 'torus', 'dome', 'tube', 'hexagon', 'capsule', 'star', 'heart',
]);

function textGeometry(text) {
  const g = new TextGeometry(text, { font: FONT, size: 1, depth: 0.4, curveSegments: 8, bevelEnabled: false });
  g.clearGroups();
  g.computeBoundingBox();
  const c = g.boundingBox.getCenter(new THREE.Vector3());
  g.translate(-c.x, -c.y, -c.z);
  g.computeBoundingBox();
  return g;
}

const PALETTE = ['#e8604c', '#f2a541', '#f4d35e', '#5fbf77', '#3fa7d6', '#6c63ff', '#c069c9', '#f0f0f0', '#8a8f98', '#2b2d33'];
const SNAP = { rotate: THREE.MathUtils.degToRad(15) };

// Measurement units. Internally 1 unit = 1 cm; these only change what you see and type.
// cell = grid square, move = snap step for moving, fine = snap step for sketches/sizes (all in cm).
const UNITS = {
  mm: { label: 'mm', factor: 10, cell: 1, move: 0.5, fine: 0.1, digits: 1 },
  cm: { label: 'cm', factor: 1, cell: 1, move: 0.5, fine: 0.25, digits: 2 },
  m: { label: 'm', factor: 0.01, cell: 10, move: 5, fine: 1, digits: 3 },
  in: { label: 'in', factor: 1 / 2.54, cell: 2.54, move: 1.27, fine: 0.635, digits: 3 },
};
const UNIT_KEY = 'shaper3d.units';
let unitKey = 'cm';
try {
  const saved = localStorage.getItem(UNIT_KEY);
  if (UNITS[saved]) unitKey = saved;
} catch {
  /* storage blocked: use cm */
}
const unit = () => UNITS[unitKey];
const fmtLen = (v) => {
  const p = 10 ** unit().digits;
  return String(Math.round(v * unit().factor * p) / p);
};
const withUnit = (v) => `${fmtLen(v)} ${unit().label}`;
const fromDisp = (v) => v / unit().factor;
const MIN_SIZE = 0.05;
const STORAGE_KEY = 'shaper3d.autosave.v1';
const MM_PER_UNIT = 10;

/* ------------------------------------------------------------------ *
 * Scene setup
 * ------------------------------------------------------------------ */
const viewport = document.getElementById('viewport');
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
viewport.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x1c1f25);

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 2000);
camera.position.set(12, 10, 14);

scene.add(new THREE.HemisphereLight(0xffffff, 0x3a3f4a, 1.6));
const sun = new THREE.DirectionalLight(0xffffff, 2.2);
sun.position.set(10, 22, 8);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
Object.assign(sun.shadow.camera, { left: -25, right: 25, top: 25, bottom: -25, near: 1, far: 80 });
sun.shadow.bias = -0.0005;
scene.add(sun);
const fill = new THREE.DirectionalLight(0xbfd4ff, 0.6);
fill.position.set(-12, 6, -10);
scene.add(fill);

const ground = new THREE.Mesh(new THREE.PlaneGeometry(4000, 4000), new THREE.ShadowMaterial({ opacity: 0.28 }));
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

let grid = null;
function buildGrid() {
  if (grid) {
    scene.remove(grid);
    grid.geometry.dispose();
    grid.material.dispose();
  }
  grid = new THREE.GridHelper(40 * unit().cell, 40, 0x4a515e, 0x30353f);
  grid.position.y = 0.002;
  scene.add(grid);
  axes.scale.set(unit().cell, 1, unit().cell);
}
const axes = new THREE.LineSegments(
  new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-20, 0.004, 0), new THREE.Vector3(20, 0.004, 0),
    new THREE.Vector3(0, 0.004, -20), new THREE.Vector3(0, 0.004, 20),
  ]),
  new THREE.LineBasicMaterial({ vertexColors: true }),
);
axes.geometry.setAttribute('color', new THREE.Float32BufferAttribute(
  [0.85, 0.3, 0.3, 0.85, 0.3, 0.3, 0.3, 0.5, 0.9, 0.3, 0.5, 0.9], 3));
scene.add(axes);
buildGrid();

const world = new THREE.Group();
scene.add(world);

// TransformControls must be created before OrbitControls so its pointer
// handler runs first and can stop the camera from orbiting while dragging.
const transform = new TransformControls(camera, renderer.domElement);
transform.setSize(1.1);
scene.add(transform.getHelper());
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableDamping = true;
orbit.dampingFactor = 0.12;
orbit.target.set(0, 1, 0);
orbit.maxDistance = 400;

function resize() {
  const w = viewport.clientWidth;
  const h = viewport.clientHeight;
  if (!w || !h) return;
  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}
new ResizeObserver(resize).observe(viewport);
resize();

// Smooth camera moves (used when drawing turns to face a surface).
let camAnim = null;
function animateCamera(pos, target, ms = 450) {
  camAnim = { fromPos: camera.position.clone(), fromTarget: orbit.target.clone(), pos, target, t0: performance.now(), ms };
}

renderer.setAnimationLoop(() => {
  if (camAnim) {
    const k = Math.min(1, (performance.now() - camAnim.t0) / camAnim.ms);
    const ease = 1 - (1 - k) ** 3;
    camera.position.lerpVectors(camAnim.fromPos, camAnim.pos, ease);
    orbit.target.lerpVectors(camAnim.fromTarget, camAnim.target, ease);
    if (k === 1) camAnim = null;
  }
  orbit.update();
  if (pullArrow.visible) {
    // Keep the arrow the same size on screen.
    pullArrow.scale.setScalar(camera.position.distanceTo(pullArrow.position) * 0.075);
  }
  renderer.render(scene, camera);
});

/* ------------------------------------------------------------------ *
 * Objects
 * ------------------------------------------------------------------ */
const objects = []; // meshes, in creation order
const geoCache = {};
let colorIndex = 0;

function normalise(geometry) {
  geometry.clearGroups();
  geometry.computeBoundingBox();
  const size = geometry.boundingBox.getSize(new THREE.Vector3());
  const center = geometry.boundingBox.getCenter(new THREE.Vector3());
  geometry.translate(-center.x, -center.y, -center.z);
  geometry.scale(1 / size.x, 1 / size.y, 1 / size.z);
  geometry.computeBoundingBox();
  return geometry;
}

function primitiveGeometry(type) {
  if (!geoCache[type]) geoCache[type] = normalise(SHAPES[type].make());
  return geoCache[type];
}

function geometryFromData(data) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(data.position, 3));
  if (data.normal) g.setAttribute('normal', new THREE.Float32BufferAttribute(data.normal, 3));
  else g.computeVertexNormals();
  if (data.index) g.setIndex(data.index);
  g.computeBoundingBox();
  return g;
}

const round = (v, p = 1e4) => Math.round(v * p) / p;

function geometryToData(g) {
  return {
    position: Array.from(g.attributes.position.array, (v) => round(v, 1e5)),
    normal: g.attributes.normal ? Array.from(g.attributes.normal.array, (v) => round(v, 1e4)) : undefined,
    index: g.index ? Array.from(g.index.array) : undefined,
  };
}

function makeMaterial(color, hole) {
  if (hole) {
    return new THREE.MeshStandardMaterial({
      color: 0x9aa4b5, transparent: true, opacity: 0.32, depthWrite: false, roughness: 0.9,
    });
  }
  return new THREE.MeshStandardMaterial({ color, roughness: 0.45, metalness: 0.05 });
}

function createMesh(desc) {
  const custom = desc.type === 'custom';
  const geometry = custom
    ? geometryFromData(desc.geometry)
    : desc.type === 'text'
      ? textGeometry(desc.text || 'Text')
      : primitiveGeometry(desc.type);
  const mesh = new THREE.Mesh(geometry, makeMaterial(desc.color, desc.hole));
  mesh.name = desc.name;
  mesh.position.fromArray(desc.position);
  mesh.rotation.set(...desc.rotation);
  mesh.scale.fromArray(desc.scale);
  mesh.visible = desc.visible !== false;
  mesh.castShadow = !desc.hole;
  mesh.receiveShadow = true;
  mesh.userData = {
    id: desc.id || crypto.randomUUID(),
    type: desc.type,
    color: desc.color,
    hole: !!desc.hole,
    geomData: custom ? desc.geometry : null,
    text: desc.type === 'text' ? desc.text || 'Text' : undefined,
    base: geometry.boundingBox.getSize(new THREE.Vector3()),
  };
  return mesh;
}

const ownsGeometry = (mesh) => mesh.userData.type === 'custom' || mesh.userData.type === 'text';

function addObject(mesh) {
  objects.push(mesh);
  world.add(mesh);
}

function removeObject(mesh) {
  if (transform.object === mesh) transform.detach();
  world.remove(mesh);
  objects.splice(objects.indexOf(mesh), 1);
  mesh.material.dispose();
  if (ownsGeometry(mesh)) mesh.geometry.dispose();
}

function clearAll() {
  transform.detach();
  deselectSketch();
  [...objects].forEach(removeObject);
  [...sketches].forEach(removeSketch);
}

function describe(mesh) {
  const d = mesh.userData;
  return {
    id: d.id,
    name: mesh.name,
    type: d.type,
    color: d.color,
    hole: d.hole,
    visible: mesh.visible,
    position: mesh.position.toArray().map((v) => round(v)),
    rotation: [mesh.rotation.x, mesh.rotation.y, mesh.rotation.z].map((v) => round(v, 1e6)),
    scale: mesh.scale.toArray().map((v) => round(v)),
    ...(d.type === 'custom' ? { geometry: d.geomData } : {}),
    ...(d.type === 'text' ? { text: d.text } : {}),
  };
}

function serialize() {
  return {
    app: 'shaper3d', version: 1, units: unitKey, objects: objects.map(describe), sketches: sketches.map(sketchData),
  };
}

function load(data) {
  clearAll();
  if (UNITS[data.units] && data.units !== unitKey) setUnits(data.units, false);
  for (const desc of data.objects) {
    if (desc.type !== 'custom' && desc.type !== 'text' && !SHAPES[desc.type]) continue;
    addObject(createMesh(desc));
  }
  for (const sk of data.sketches || []) {
    if (sk && sk.plane && ['rect', 'circle', 'poly'].includes(sk.kind)) addSketch(sk);
  }
}

function getSize(mesh) {
  return mesh.scale.clone().multiply(mesh.userData.base);
}

function setSize(mesh, size) {
  const b = mesh.userData.base;
  mesh.scale.set(
    Math.max(MIN_SIZE, size.x) / (b.x || 1),
    Math.max(MIN_SIZE, size.y) / (b.y || 1),
    Math.max(MIN_SIZE, size.z) / (b.z || 1),
  );
}

function uniqueName(label) {
  const names = new Set(objects.map((o) => o.name));
  let n = 1;
  while (names.has(`${label} ${n}`)) n++;
  return `${label} ${n}`;
}

/* ------------------------------------------------------------------ *
 * Selection
 * ------------------------------------------------------------------ */
let selection = []; // meshes; last one is the "primary" (gets the gizmo)
let multiMode = false;
const primary = () => selection[selection.length - 1] || null;

function setSelection(list) {
  selection = list.filter((m) => objects.includes(m));
  if (selection.length && selectedSketch) deselectSketch();
  for (const o of objects) {
    const sel = selection.includes(o);
    o.material.emissive.set(sel ? 0x2a5cff : 0x000000);
    o.material.emissiveIntensity = sel ? 0.22 : 0;
  }
  const p = primary();
  if (p && p.visible && !pull.on) transform.attach(p);
  else transform.detach();
  if (pull.mesh && !selection.includes(pull.mesh)) clearPullFace();
  refreshUI();
}

function selectionIds() {
  return selection.map((m) => m.userData.id);
}

function selectByIds(ids) {
  setSelection(ids.map((id) => objects.find((o) => o.userData.id === id)).filter(Boolean));
}

/* ------------------------------------------------------------------ *
 * History (undo / redo) + autosave
 * ------------------------------------------------------------------ */
const history = { stack: [], index: -1 };
const MAX_HISTORY = 60;

function commit() {
  const snap = JSON.stringify(serialize());
  if (history.stack[history.index] === snap) return;
  history.stack = history.stack.slice(0, history.index + 1);
  history.stack.push(snap);
  if (history.stack.length > MAX_HISTORY) history.stack.shift();
  history.index = history.stack.length - 1;
  try {
    localStorage.setItem(STORAGE_KEY, snap);
  } catch {
    /* storage full or blocked: design still lives in memory */
  }
  refreshUI();
}

function restore(snap) {
  clearPullFace();
  const ids = selectionIds();
  load(JSON.parse(snap));
  try {
    localStorage.setItem(STORAGE_KEY, snap);
  } catch {
    /* ignore */
  }
  selectByIds(ids);
}

function undo() {
  if (history.index <= 0) return;
  history.index--;
  restore(history.stack[history.index]);
}

function redo() {
  if (history.index >= history.stack.length - 1) return;
  history.index++;
  restore(history.stack[history.index]);
}

/* ------------------------------------------------------------------ *
 * Tools
 * ------------------------------------------------------------------ */
let snapOn = true;

// Switch measurement units: grid, snapping and every displayed number follow.
function setUnits(key, save = true) {
  if (!UNITS[key]) return;
  unitKey = key;
  try {
    localStorage.setItem(UNIT_KEY, key);
  } catch {
    /* ignore */
  }
  buildGrid();
  applySnap();
  const u = unit();
  const step = (v) => String(Math.round(v * u.factor * 1e4) / 1e4);
  document.querySelectorAll('.unit-tag').forEach((el) => (el.textContent = `(${u.label})`));
  document.querySelectorAll('.xyz[data-prop=size] input, .xyz[data-prop=position] input').forEach((el) => (el.step = step(u.move)));
  for (const id of ['skW', 'skH', 'skD', 'skExtrude', 'pullDist']) $(id).step = step(u.fine);
  $('unitSelect').value = key;
  refreshPanel();
  if (selectedSketch) selectSketch(selectedSketch);
  if (save) {
    commit();
    toast(`Units: ${{ mm: 'millimetres', cm: 'centimetres', m: 'metres', in: 'inches' }[key]}`);
  }
}

function applySnap() {
  transform.setTranslationSnap(snapOn ? unit().move : null);
  transform.setRotationSnap(snapOn ? SNAP.rotate : null);
  transform.setScaleSnap(snapOn ? unit().fine : null);
}
applySnap();

function setMode(mode) {
  const wasPull = pull.on;
  pull.on = mode === 'pull';
  if (pull.on) {
    if (draw.active) cancelDraw();
    transform.detach();
    const p = primary();
    setSelection(p ? [p] : []);
  } else {
    transform.setMode(mode);
    if (wasPull) {
      if (!selectedSketch) clearPullFace();
      setSelection(selection);
    }
  }
  $('pullbar').hidden = !pull.on;
  document.body.classList.toggle('pulling', pull.on);
  document.querySelectorAll('[data-mode]').forEach((b) => b.classList.toggle('active', b.dataset.mode === mode));
}

// Where a new object of the given height goes: on top of the selected object
// (so models can be built up), otherwise on the ground where the camera looks.
function placement(height) {
  const p = primary();
  if (p && p.visible) {
    const box = new THREE.Box3().setFromObject(p);
    const c = box.getCenter(new THREE.Vector3());
    toast(`Placed on top of "${p.name}". Press Esc first to place it on the ground.`);
    return [round(c.x), round(box.max.y + height / 2), round(c.z)];
  }
  const t = orbit.target;
  return [Math.round(t.x), height / 2, Math.round(t.z)];
}

function addShape(type) {
  const shape = SHAPES[type];
  const mesh = createMesh({
    type,
    name: uniqueName(shape.label),
    color: PALETTE[colorIndex++ % 7],
    hole: false,
    position: placement(shape.size[1] * unit().cell),
    rotation: [0, 0, 0],
    scale: shape.size.map((v) => v * unit().cell),
  });
  addObject(mesh);
  setSelection([mesh]);
  setMode('translate');
  commit();
}

function addText() {
  const mesh = createMesh({
    type: 'text',
    text: 'Hello',
    name: uniqueName('Text'),
    color: PALETTE[colorIndex++ % 7],
    hole: false,
    position: [0, 0, 0],
    rotation: [0, 0, 0],
    scale: [unit().cell, unit().cell, unit().cell],
  });
  mesh.position.fromArray(placement(mesh.userData.base.y * unit().cell));
  addObject(mesh);
  setSelection([mesh]);
  setMode('translate');
  commit();
  document.body.classList.add('show-inspector');
  const input = $('pText');
  input.focus();
  input.select();
}

function setText(mesh, text) {
  text = text.trim();
  if (!text || mesh.userData.type !== 'text' || text === mesh.userData.text) return;
  mesh.geometry.dispose();
  mesh.geometry = textGeometry(text);
  mesh.userData.text = text;
  mesh.userData.base = mesh.geometry.boundingBox.getSize(new THREE.Vector3());
  if (mesh.name.startsWith('Text')) mesh.name = uniqueName(`"${text.slice(0, 16)}"`);
  commit();
}

// Line up the centres of the selected objects (left/right and front/back) with the
// last-selected one. Handy for putting a hole right in the middle of a shape.
function alignSelection() {
  const p = primary();
  if (!p || selection.length < 2) return;
  const target = new THREE.Box3().setFromObject(p).getCenter(new THREE.Vector3());
  for (const m of selection) {
    if (m === p) continue;
    const c = new THREE.Box3().setFromObject(m).getCenter(new THREE.Vector3());
    m.position.x += target.x - c.x;
    m.position.z += target.z - c.z;
  }
  refreshPanel();
  commit();
  toast(`Centred on "${p.name}".`);
}

// Signed volume; negative means the triangles face inward.
function signedVolume(g) {
  const pos = g.attributes.position;
  const idx = g.index;
  const a = new THREE.Vector3();
  const b = new THREE.Vector3();
  const c = new THREE.Vector3();
  let vol = 0;
  const count = idx ? idx.count : pos.count;
  for (let i = 0; i < count; i += 3) {
    a.fromBufferAttribute(pos, idx ? idx.getX(i) : i);
    b.fromBufferAttribute(pos, idx ? idx.getX(i + 1) : i + 1);
    c.fromBufferAttribute(pos, idx ? idx.getX(i + 2) : i + 2);
    vol += a.dot(b.cross(c)) / 6;
  }
  return vol;
}

// Turn a freshly built geometry (in world coordinates) into a new object.
function addGeometryObject(geometry, label) {
  geometry.clearGroups();
  for (const key of Object.keys(geometry.attributes)) {
    if (key !== 'position' && key !== 'normal') geometry.deleteAttribute(key);
  }
  if (signedVolume(geometry) < 0) {
    flipWinding(geometry);
    const n = geometry.attributes.normal;
    for (let i = 0; i < n.array.length; i++) n.array[i] = -n.array[i];
  }
  geometry.computeBoundingBox();
  const box = geometry.boundingBox.clone(); // translate() below recomputes the original
  const center = box.getCenter(new THREE.Vector3());
  geometry.translate(-center.x, -center.y, -center.z);
  if (box.min.y < 0) center.y -= box.min.y; // keep it above the ground
  const mesh = createMesh({
    type: 'custom',
    name: uniqueName(label),
    color: PALETTE[colorIndex++ % 7],
    hole: false,
    position: center.toArray().map((v) => round(v)),
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    geometry: geometryToData(geometry),
  });
  geometry.dispose();
  addObject(mesh);
  setSelection([mesh]);
  setMode('translate');
  commit();
  return mesh;
}

function duplicateSelection() {
  if (!selection.length) return;
  const copies = selection.map((m) => {
    const d = describe(m);
    d.id = undefined;
    d.name = uniqueName(m.name.replace(/\s\d+$/, ''));
    d.position[0] += 1;
    d.position[2] += 1;
    const copy = createMesh(d);
    addObject(copy);
    return copy;
  });
  setSelection(copies);
  commit();
}

function deleteSelection() {
  if (!selection.length) return;
  [...selection].forEach(removeObject);
  setSelection([]);
  commit();
}

function setHole(hole) {
  if (!selection.length) return;
  for (const m of selection) {
    m.userData.hole = hole;
    m.material.dispose();
    m.material = makeMaterial(m.userData.color, hole);
    m.castShadow = !hole;
  }
  setSelection(selection);
  commit();
}

function toggleHole() {
  if (!selection.length) return;
  setHole(!selection.every((m) => m.userData.hole));
}

function setColor(color, save) {
  for (const m of selection) {
    m.userData.color = color;
    if (!m.userData.hole) m.material.color.set(color);
  }
  if (save) commit();
}

function dropToFloor() {
  for (const m of selection) {
    m.updateMatrixWorld();
    const box = new THREE.Box3().setFromObject(m);
    m.position.y -= box.min.y;
  }
  refreshPanel();
  commit();
}

// Bake an object's rotation + scale into its own geometry (position stays on the mesh).
function bakedGeometry(mesh) {
  mesh.updateMatrix();
  const m = new THREE.Matrix4().compose(new THREE.Vector3(), mesh.quaternion, mesh.scale);
  const g = mesh.geometry.clone();
  g.applyMatrix4(m);
  return g;
}

function flipWinding(g) {
  if (g.index) {
    const idx = g.index.array;
    for (let i = 0; i < idx.length; i += 3) [idx[i + 1], idx[i + 2]] = [idx[i + 2], idx[i + 1]];
    return;
  }
  for (const attr of Object.values(g.attributes)) {
    const a = attr.array;
    const n = attr.itemSize;
    for (let i = 0; i < attr.count; i += 3) {
      for (let k = 0; k < n; k++) {
        const j1 = (i + 1) * n + k;
        const j2 = (i + 2) * n + k;
        [a[j1], a[j2]] = [a[j2], a[j1]];
      }
    }
  }
}

function toCustom(mesh, geometry, position) {
  for (const key of Object.keys(geometry.attributes)) {
    if (key !== 'position' && key !== 'normal') geometry.deleteAttribute(key);
  }
  geometry.computeBoundingBox();
  const d = describe(mesh);
  return createMesh({
    ...d,
    type: 'custom',
    position: position.toArray(),
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
    geometry: geometryToData(geometry),
  });
}

function mirrorSelection() {
  if (!selection.length) return;
  const box = new THREE.Box3();
  selection.forEach((m) => box.expandByObject(m));
  const cx = box.getCenter(new THREE.Vector3()).x;
  const ids = [];
  for (const mesh of [...selection]) {
    const newPos = mesh.position.clone();
    newPos.x = 2 * cx - newPos.x;
    const r = mesh.rotation;
    if (X_SYMMETRIC.has(mesh.userData.type) && r.x === 0 && r.y === 0 && r.z === 0) {
      mesh.position.copy(newPos);
      ids.push(mesh.userData.id);
      continue;
    }
    const g = bakedGeometry(mesh);
    g.scale(-1, 1, 1);
    flipWinding(g);
    const replacement = toCustom(mesh, g, newPos);
    g.dispose();
    const i = objects.indexOf(mesh);
    removeObject(mesh);
    objects.splice(i, 0, replacement);
    world.add(replacement);
    ids.push(replacement.userData.id);
  }
  selectByIds(ids);
  commit();
}

function combineSelection() {
  if (selection.length < 2) {
    toast('Select 2 or more objects to combine (Shift+click or Multi-select).');
    return;
  }
  const solids = selection.filter((m) => !m.userData.hole);
  const holes = selection.filter((m) => m.userData.hole);
  if (!solids.length) {
    toast('Combine needs at least one solid shape — holes cut into solids.');
    return;
  }

  const evaluator = new Evaluator();
  evaluator.attributes = ['position', 'normal'];
  evaluator.useGroups = false;
  const toBrush = (m) => {
    m.updateMatrixWorld();
    const g = m.geometry.clone();
    g.applyMatrix4(m.matrixWorld);
    for (const key of Object.keys(g.attributes)) {
      if (key !== 'position' && key !== 'normal') g.deleteAttribute(key);
    }
    g.clearGroups();
    const b = new Brush(g);
    b.updateMatrixWorld();
    return b;
  };

  let result;
  try {
    result = toBrush(solids[0]);
    for (const s of solids.slice(1)) result = evaluator.evaluate(result, toBrush(s), ADDITION);
    for (const h of holes) result = evaluator.evaluate(result, toBrush(h), SUBTRACTION);
  } catch (err) {
    console.error(err);
    toast('Could not combine these shapes. Try moving them slightly.');
    return;
  }

  const g = result.geometry;
  if (!g.attributes.position || g.attributes.position.count === 0) {
    toast('Nothing left — the hole removes the whole shape.');
    return;
  }
  g.computeBoundingBox();
  const center = g.boundingBox.getCenter(new THREE.Vector3());
  g.translate(-center.x, -center.y, -center.z);

  const first = solids[0];
  const combined = toCustom(first, g, center);
  combined.userData.id = crypto.randomUUID();
  combined.name = uniqueName('Group');
  const index = Math.min(...selection.map((m) => objects.indexOf(m)));
  [...selection].forEach(removeObject);
  objects.splice(index, 0, combined);
  world.add(combined);
  setSelection([combined]);
  commit();
  toast(holes.length ? 'Combined — holes cut out.' : 'Combined into one object.');
}

function toggleVisible(mesh) {
  mesh.visible = !mesh.visible;
  if (!mesh.visible && selection.includes(mesh)) setSelection(selection.filter((m) => m !== mesh));
  commit();
}

/* ------------------------------------------------------------------ *
 * Camera
 * ------------------------------------------------------------------ */
const VIEWS = {
  persp: [0.62, 0.5, 0.72],
  top: [0, 1, 0.0001],
  front: [0, 0.0001, 1],
  right: [1, 0.0001, 0],
};

function frame(list = selection.length ? selection : [...objects.filter((o) => o.visible), ...sketches]) {
  const box = new THREE.Box3();
  if (list.length) list.forEach((o) => box.expandByObject(o));
  else box.set(new THREE.Vector3(-4, 0, -4), new THREE.Vector3(4, 2, 4));
  const sphere = box.getBoundingSphere(new THREE.Sphere());
  const dir = camera.position.clone().sub(orbit.target).normalize();
  const fov = THREE.MathUtils.degToRad(camera.fov);
  const dist = Math.max(4, (sphere.radius / Math.sin(fov / 2)) * 1.15);
  orbit.target.copy(sphere.center);
  camera.position.copy(sphere.center).addScaledVector(dir, dist);
}

function setView(name) {
  const dist = Math.max(camera.position.distanceTo(orbit.target), 6);
  camera.position.copy(orbit.target).addScaledVector(new THREE.Vector3(...VIEWS[name]).normalize(), dist);
  camera.lookAt(orbit.target);
}

/* ------------------------------------------------------------------ *
 * Picking with the mouse / touch
 * ------------------------------------------------------------------ */
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let down = null;

function setPointer(e) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
}

const activePointers = new Set();

renderer.domElement.addEventListener('pointerdown', (e) => {
  activePointers.add(e.pointerId);
  if (draw.active) {
    drawPointerDown(e);
    return;
  }
  down = { x: e.clientX, y: e.clientY, onGizmo: transform.axis !== null };
});

renderer.domElement.addEventListener('pointermove', (e) => {
  if (draw.active) drawPointerMove(e);
});

renderer.domElement.addEventListener('pointercancel', (e) => {
  activePointers.delete(e.pointerId);
  draw.stroke = null;
  down = null;
});

renderer.domElement.addEventListener('pointerup', (e) => {
  activePointers.delete(e.pointerId);
  if (draw.active) {
    drawPointerUp(e);
    return;
  }
  if (!down) return;
  const d = down;
  down = null;
  if (d.onGizmo || Math.hypot(e.clientX - d.x, e.clientY - d.y) > 6) return;

  setPointer(e);
  const hit = raycaster.intersectObjects(objects.filter((o) => o.visible), false)[0];
  const sketchHit = raycaster.intersectObjects(sketches.map((g) => g.fill), false)[0];
  if (sketchHit && (!hit || sketchHit.distance <= hit.distance + 0.05)) {
    selectSketch(sketchHit.object.userData.sketch);
    return;
  }
  deselectSketch();
  if (pull.on) {
    if (hit) {
      setSelection([hit.object]);
      pickPullFace(hit);
    } else {
      setSelection([]);
    }
    return;
  }
  const additive = e.shiftKey || e.ctrlKey || e.metaKey || multiMode;

  if (!hit) {
    if (!additive) setSelection([]);
    return;
  }
  const obj = hit.object;
  if (additive) {
    setSelection(selection.includes(obj) ? selection.filter((m) => m !== obj) : [...selection, obj]);
  } else {
    setSelection([obj]);
  }
});

/* ------------------------------------------------------------------ *
 * Push / Pull (like Fusion 360's Press Pull)
 *  - tap a flat face, drag the arrow: only that face moves, so the object
 *    gets thicker or thinner on that side (holes and other details keep
 *    their size)
 *  - on a curved surface it stretches the object from that side instead
 * ------------------------------------------------------------------ */
const pull = { on: false, mesh: null, face: null, drag: null };

const PULL_COLOR = 0xffc93c;
const pullArrow = new THREE.Group();
{
  const mat = new THREE.MeshBasicMaterial({ color: PULL_COLOR, depthTest: false, transparent: true });
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1, 12), mat);
  shaft.position.y = 0.5;
  const head = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.38, 20), mat);
  head.position.y = 1.15;
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 12), mat);
  // A fat invisible grab area, so the arrow is easy to catch with a finger.
  const grab = new THREE.Mesh(
    new THREE.CylinderGeometry(0.42, 0.42, 1.8, 12),
    new THREE.MeshBasicMaterial({ visible: false }),
  );
  grab.position.y = 0.75;
  grab.name = 'grab';
  pullArrow.add(shaft, head, ball, grab);
  pullArrow.traverse((o) => (o.renderOrder = 20));
  pullArrow.visible = false;
  scene.add(pullArrow);
}
const pullHighlight = new THREE.Mesh(
  new THREE.BufferGeometry(),
  new THREE.MeshBasicMaterial({
    color: PULL_COLOR, transparent: true, opacity: 0.45, depthWrite: false,
    polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2, side: THREE.DoubleSide,
  }),
);
pullHighlight.renderOrder = 5;

// Positions with the object's scale applied (= what the geometry becomes once baked).
function scaledPositions(mesh) {
  const src = mesh.geometry.attributes.position.array;
  const out = new Float32Array(src.length);
  const { x, y, z } = mesh.scale;
  for (let i = 0; i < src.length; i += 3) {
    out[i] = src[i] * x;
    out[i + 1] = src[i + 1] * y;
    out[i + 2] = src[i + 2] * z;
  }
  return out;
}

function triangleIndices(geometry) {
  if (geometry.index) return geometry.index.array;
  const n = geometry.attributes.position.count;
  const idx = new Uint32Array(n);
  for (let i = 0; i < n; i++) idx[i] = i;
  return idx;
}

const _a = new THREE.Vector3();
const _b = new THREE.Vector3();
const _c = new THREE.Vector3();
function triArea(P, i, j, k) {
  _a.fromArray(P, i * 3);
  _b.fromArray(P, j * 3).sub(_a);
  _c.fromArray(P, k * 3).sub(_a);
  return _b.cross(_c).length() / 2;
}

// Find every vertex on the plane n·p = d. Returns null if that flat area is
// too small to be a real face (e.g. one facet of a sphere).
function planeFace(mesh, n, d) {
  const P = scaledPositions(mesh);
  const tris = triangleIndices(mesh.geometry);
  const count = P.length / 3;
  mesh.geometry.computeBoundingSphere();
  const eps = 1e-4 * (mesh.geometry.boundingSphere.radius * Math.max(...mesh.scale.toArray()) + 1);
  const onPlane = new Uint8Array(count);
  const h = new Float32Array(count); // height of each point along the face direction
  for (let i = 0; i < count; i++) {
    h[i] = n.x * P[i * 3] + n.y * P[i * 3 + 1] + n.z * P[i * 3 + 2];
    if (Math.abs(h[i] - d) < eps) onPlane[i] = 1;
  }
  // The "anchor" is the nearest real wall behind the face: the highest point
  // (below the face) on a surface that is not parallel to the push direction.
  // Everything between the anchor and the face is stretched evenly, so faces
  // that run along the push direction never fold over.
  let anchor = -Infinity;
  let faceArea = 0;
  let totalArea = 0;
  const faceTris = [];
  const centroid = new THREE.Vector3();
  const tn = new THREE.Vector3();
  for (let t = 0; t < tris.length; t += 3) {
    const [i, j, k] = [tris[t], tris[t + 1], tris[t + 2]];
    const area = triArea(P, i, j, k);
    totalArea += area;
    if (area > 1e-12) {
      tn.copy(_b).normalize(); // triArea left this triangle's cross product in _b
      if (Math.abs(tn.dot(n)) > 0.01) {
        for (const v of [i, j, k]) if (h[v] < d - eps && h[v] > anchor) anchor = h[v];
      }
    }
    if (onPlane[i] && onPlane[j] && onPlane[k]) {
      faceArea += area;
      faceTris.push(i, j, k);
      for (const v of [i, j, k]) centroid.add(_a.fromArray(P, v * 3).multiplyScalar(area / 3));
    }
  }
  if (!faceTris.length || faceArea / totalArea < 0.025 || anchor === -Infinity) return null;
  centroid.divideScalar(faceArea);
  const verts = [];
  for (let i = 0; i < count; i++) if (h[i] > anchor + eps) verts.push(i);
  const heights = Float32Array.from(verts, (v) => h[v] - anchor);
  return { kind: 'plane', n: n.clone(), d, anchor, verts: Uint32Array.from(verts), heights, faceTris, centroid };
}

function pickPullFace(hit) {
  const mesh = hit.object;
  clearPullFace();
  const P = scaledPositions(mesh);
  const { a, b, c } = hit.face;
  const A = new THREE.Vector3().fromArray(P, a * 3);
  const n = new THREE.Vector3().fromArray(P, b * 3).sub(A)
    .cross(new THREE.Vector3().fromArray(P, c * 3).sub(A)).normalize();
  let face = planeFace(mesh, n, n.dot(A));
  if (!face) {
    // Curved surface: stretch along the object's own axis closest to the surface direction.
    const ln = hit.face.normal;
    const ax = [Math.abs(ln.x), Math.abs(ln.y), Math.abs(ln.z)];
    const axis = ax.indexOf(Math.max(...ax));
    face = { kind: 'stretch', axis, sign: Math.sign(ln.getComponent(axis)) || 1 };
  }
  pull.mesh = mesh;
  pull.face = face;
  placePullArrow();
  $('pullHelp').textContent = face.kind === 'plane'
    ? 'Drag the yellow arrow (or type a distance) to push or pull this face.'
    : 'Curved surface: dragging the arrow stretches the object from this side.';
}

function clearPullFace() {
  pull.mesh = null;
  pull.face = null;
  pull.drag = null;
  pullArrow.visible = false;
  pullHighlight.removeFromParent();
  if ($('pullHelp')) $('pullHelp').textContent = 'Tap a face of any object, then drag the yellow arrow to make it thicker or thinner.';
}

// World-space start point and direction of the arrow for the current face.
function pullAxis() {
  const { mesh, face } = pull;
  if (face.kind === 'sketch') return pullAxisFor(face.sketch);
  mesh.updateMatrixWorld();
  if (face.kind === 'plane') {
    const origin = face.centroid.clone().applyQuaternion(mesh.quaternion).add(mesh.position);
    return { origin, dir: face.n.clone().applyQuaternion(mesh.quaternion).normalize() };
  }
  mesh.geometry.computeBoundingBox();
  const bb = mesh.geometry.boundingBox;
  const local = bb.getCenter(new THREE.Vector3());
  local.setComponent(face.axis, face.sign > 0 ? bb.max.getComponent(face.axis) : bb.min.getComponent(face.axis));
  const dirLocal = new THREE.Vector3().setComponent(face.axis, face.sign);
  return {
    origin: mesh.localToWorld(local),
    dir: dirLocal.applyQuaternion(mesh.quaternion).normalize(),
  };
}

function pullAxisFor(sketch) {
  const d = sketch.userData;
  const plane = planeFromData(d.plane);
  const c = sketchCenter(d);
  return { origin: fromUV(plane, c.x, c.y), dir: plane.n.clone() };
}

function placePullArrow() {
  const { origin, dir } = pullAxis();
  pullArrow.position.copy(origin);
  pullArrow.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
  pullArrow.visible = true;
  const face = pull.face;
  if (face.kind === 'plane' && pull.mesh) {
    // Highlight the face (child of the mesh, so it uses the mesh's own coordinates).
    const src = pull.mesh.geometry.attributes.position.array;
    const pts = new Float32Array(face.faceTris.length * 3);
    face.faceTris.forEach((v, i) => pts.set(src.subarray(v * 3, v * 3 + 3), i * 3));
    pullHighlight.geometry.dispose();
    pullHighlight.geometry = new THREE.BufferGeometry();
    pullHighlight.geometry.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    pull.mesh.add(pullHighlight);
  } else {
    pullHighlight.removeFromParent();
  }
}

// Bake scale into the geometry so face moves happen in real units.
function makePullable(mesh) {
  const s = mesh.scale;
  if (mesh.userData.type === 'custom' && s.x === 1 && s.y === 1 && s.z === 1) return;
  const g = mesh.geometry.clone();
  g.applyMatrix4(new THREE.Matrix4().makeScale(s.x, s.y, s.z));
  for (const key of Object.keys(g.attributes)) {
    if (key !== 'position' && key !== 'normal') g.deleteAttribute(key);
  }
  if (ownsGeometry(mesh)) mesh.geometry.dispose();
  mesh.geometry = g;
  mesh.scale.set(1, 1, 1);
  mesh.userData.type = 'custom';
  mesh.userData.text = undefined;
}

function beginPull() {
  const { mesh, face } = pull;
  if (face.kind === 'sketch') {
    pull.drag = { dist: 0, axis: pullAxis() };
  } else if (face.kind === 'plane') {
    makePullable(mesh);
    if (pullHighlight.parent !== mesh) mesh.add(pullHighlight);
    pull.drag = { orig: mesh.geometry.attributes.position.array.slice(), dist: 0, axis: pullAxis() };
  } else {
    pull.drag = {
      size: getSize(mesh),
      pos: mesh.position.clone(),
      dist: 0,
      axis: pullAxis(),
    };
  }
}

function applyPull(dist) {
  const { mesh, face, drag } = pull;
  if (snapOn) dist = Math.round(dist / unit().fine) * unit().fine;
  if (face.kind === 'sketch') {
    previewSketchSolid(face.sketch.userData, dist);
  } else if (face.kind === 'plane') {
    const depth = face.d - face.anchor;
    drag.limited = dist < MIN_SIZE - depth;
    dist = Math.max(dist, MIN_SIZE - depth);
    const stretch = dist / depth;
    const pos = mesh.geometry.attributes.position;
    const arr = pos.array;
    arr.set(drag.orig);
    face.verts.forEach((v, i) => {
      const move = face.heights[i] * stretch;
      arr[v * 3] += face.n.x * move;
      arr[v * 3 + 1] += face.n.y * move;
      arr[v * 3 + 2] += face.n.z * move;
    });
    pos.needsUpdate = true;
    mesh.geometry.computeBoundingBox();
    mesh.geometry.computeBoundingSphere();
    const hp = pullHighlight.geometry.attributes.position;
    if (hp) {
      face.faceTris.forEach((v, i) => hp.array.set(arr.subarray(v * 3, v * 3 + 3), i * 3));
      hp.needsUpdate = true;
    }
  } else {
    const size = drag.size.clone();
    const start = size.getComponent(face.axis);
    const next = Math.max(MIN_SIZE, start + dist);
    dist = next - start;
    size.setComponent(face.axis, next);
    setSize(mesh, size);
    mesh.position.copy(drag.pos).addScaledVector(drag.axis.dir, dist / 2);
  }
  drag.dist = dist;
  pullArrow.position.copy(drag.axis.origin).addScaledVector(drag.axis.dir, dist);
  $('pullDist').value = fmtLen(dist);
  refreshPanel();
}

function endPull() {
  const { mesh, face, drag } = pull;
  pull.drag = null;
  if (!drag) return;
  if (face.kind === 'sketch') {
    sketchPreview.visible = false;
    $('pullDist').value = '0';
    const g = face.sketch;
    extrudeSketch(g, drag.dist);
    if (sketches.includes(g) && selectedSketch === g) placePullArrow(); // nothing happened: arrow back
    return;
  }
  if (face.kind === 'plane') {
    const g = mesh.geometry;
    // Re-centre the geometry on the object's origin.
    g.computeBoundingBox();
    const c = g.boundingBox.getCenter(new THREE.Vector3());
    g.translate(-c.x, -c.y, -c.z);
    mesh.position.add(c.clone().applyQuaternion(mesh.quaternion));
    g.computeBoundingBox();
    mesh.userData.base = g.boundingBox.getSize(new THREE.Vector3());
    mesh.userData.geomData = geometryToData(g);
    face.d = face.d + drag.dist - face.n.dot(c);
    pull.face = planeFace(mesh, face.n, face.d) || null;
  }
  $('pullDist').value = '0';
  if (Math.abs(drag.dist) > 1e-6) {
    commit();
    toast(drag.limited
      ? `Pushed ${withUnit(Math.abs(drag.dist))}. It stops before the next wall or hole.`
      : `${drag.dist > 0 ? 'Pulled' : 'Pushed'} ${withUnit(Math.abs(drag.dist))}.`);
  }
  if (pull.face) placePullArrow();
  else clearPullFace();
  refreshPanel();
}

// Closest point on the arrow's line to the pointer ray, as a distance along the arrow.
function pullParam(e, axis) {
  setPointer(e);
  const { origin: O, direction: d } = raycaster.ray;
  const u = axis.dir;
  const w0 = O.clone().sub(axis.origin);
  const b = d.dot(u);
  const denom = 1 - b * b;
  if (denom < 1e-4) return null; // looking straight down the arrow
  return (w0.dot(u) - b * w0.dot(d)) / denom;
}

// Capture-phase listeners on the viewport run before the camera controls, so
// grabbing the arrow never spins the view.
viewport.addEventListener('pointerdown', (e) => {
  if (!pull.face || e.button !== 0) return;
  setPointer(e);
  if (!raycaster.intersectObject(pullArrow, true).length) return;
  e.stopPropagation();
  beginPull();
  const t0 = pullParam(e, pull.drag.axis);
  if (t0 === null) {
    pull.drag = null;
    return;
  }
  pull.drag.t0 = t0;
  pull.drag.pointerId = e.pointerId;
  viewport.setPointerCapture(e.pointerId);
}, { capture: true });

viewport.addEventListener('pointermove', (e) => {
  if (!pull.drag || e.pointerId !== pull.drag.pointerId) return;
  e.stopPropagation();
  const t = pullParam(e, pull.drag.axis);
  if (t !== null) applyPull(t - pull.drag.t0);
}, { capture: true });

for (const type of ['pointerup', 'pointercancel']) {
  viewport.addEventListener(type, (e) => {
    if (!pull.drag || e.pointerId !== pull.drag.pointerId) return;
    e.stopPropagation();
    activePointers.delete(e.pointerId);
    endPull();
  }, { capture: true });
}

function pullByTyping(value) {
  if (!pull.face || !Number.isFinite(value) || value === 0) return;
  beginPull();
  const keepSnap = snapOn;
  snapOn = false; // typed numbers are exact
  applyPull(value);
  snapOn = keepSnap;
  endPull();
}

/* ------------------------------------------------------------------ *
 * Sketching (Shapr3D-style "sketch, then pull")
 *  - Rectangle / Circle / Line sketches go on the ground or on any face
 *    of a part. While drawing, live measurements follow the pointer.
 *  - Tap a sketch and drag its arrow: pull out to add material, push in
 *    to cut a pocket or hole into the part it was drawn on.
 *  - Spin: draw half a side profile (front view) -> round solid.
 * ------------------------------------------------------------------ */

// A sketch plane: origin o, normal n and in-plane axes u, v (u × v = n).
function makePlane(o, n) {
  n = n.clone().normalize();
  const u = Math.abs(n.y) < 0.9
    ? new THREE.Vector3(0, 1, 0).cross(n).normalize()
    : new THREE.Vector3(1, 0, 0).addScaledVector(n, -n.x).normalize();
  const v = n.clone().cross(u).normalize();
  return { o: o.clone(), n, u, v };
}
const planeToData = (p) => ({ o: p.o.toArray().map((x) => round(x, 1e5)), n: p.n.toArray(), u: p.u.toArray() });
function planeFromData(d) {
  const n = new THREE.Vector3().fromArray(d.n);
  const u = new THREE.Vector3().fromArray(d.u);
  return { o: new THREE.Vector3().fromArray(d.o), n, u, v: n.clone().cross(u).normalize() };
}
const planeMatrix = (p) => new THREE.Matrix4().makeBasis(p.u, p.v, p.n).setPosition(p.o);
const fromUV = (p, x, y, lift = 0) => p.o.clone().addScaledVector(p.u, x).addScaledVector(p.v, y).addScaledVector(p.n, lift);
function rayToUV(p) {
  const hit = raycaster.ray.intersectPlane(new THREE.Plane(p.n, -p.n.dot(p.o)), new THREE.Vector3());
  if (!hit) return null;
  hit.sub(p.o);
  return new THREE.Vector2(hit.dot(p.u), hit.dot(p.v));
}
const snapUV = (q) => {
  if (!snapOn) return q;
  const f = unit().fine;
  return new THREE.Vector2(Math.round(q.x / f) * f, Math.round(q.y / f) * f);
};

function sketchShape(d) {
  if (d.kind === 'rect') {
    const { x, y, w, h } = d.rect;
    return new THREE.Shape([
      new THREE.Vector2(x, y), new THREE.Vector2(x + w, y), new THREE.Vector2(x + w, y + h), new THREE.Vector2(x, y + h),
    ]);
  }
  if (d.kind === 'circle') return new THREE.Shape().absarc(d.circle.cx, d.circle.cy, d.circle.r, 0, Math.PI * 2, false);
  return new THREE.Shape(d.points.map(([x, y]) => new THREE.Vector2(x, y)));
}
function sketchCenter(d) {
  if (d.kind === 'rect') return new THREE.Vector2(d.rect.x + d.rect.w / 2, d.rect.y + d.rect.h / 2);
  if (d.kind === 'circle') return new THREE.Vector2(d.circle.cx, d.circle.cy);
  const c = new THREE.Vector2();
  d.points.forEach(([x, y]) => c.add(new THREE.Vector2(x, y)));
  return c.divideScalar(d.points.length);
}

const sketches = [];
const sketchRoot = new THREE.Group();
scene.add(sketchRoot);
const sketchMat = (opacity) => new THREE.MeshBasicMaterial({
  color: 0x4f9dff, transparent: true, opacity, depthWrite: false, side: THREE.DoubleSide,
  polygonOffset: true, polygonOffsetFactor: -4, polygonOffsetUnits: -4,
});
const SKETCH_FILL = sketchMat(0.25);
const SKETCH_FILL_SELECTED = sketchMat(0.55);
const SKETCH_LINE = new THREE.LineBasicMaterial({ color: 0x9cc8ff });
let selectedSketch = null;

function addSketch(data) {
  data = { ...data, id: data.id || crypto.randomUUID() };
  const plane = planeFromData(data.plane);
  const shape = sketchShape(data);
  const g = new THREE.Group();
  g.matrixAutoUpdate = false;
  g.matrix.copy(planeMatrix(plane)).multiply(new THREE.Matrix4().makeTranslation(0, 0, 0.004));
  const fill = new THREE.Mesh(new THREE.ShapeGeometry(shape, 48), SKETCH_FILL);
  fill.renderOrder = 6;
  fill.userData.sketch = g;
  const line = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(shape.getPoints(48)), SKETCH_LINE);
  line.renderOrder = 7;
  g.add(fill, line);
  g.userData = data;
  g.fill = fill;
  sketchRoot.add(g);
  g.updateMatrixWorld(true);
  sketches.push(g);
  return g;
}

function removeSketch(g) {
  if (selectedSketch === g) deselectSketch();
  g.traverse((o) => o.geometry && o.geometry.dispose());
  sketchRoot.remove(g);
  sketches.splice(sketches.indexOf(g), 1);
}

const sketchData = (g) => JSON.parse(JSON.stringify(g.userData));

function selectSketch(g) {
  if (selection.length) setSelection([]);
  deselectSketch();
  selectedSketch = g;
  g.fill.material = SKETCH_FILL_SELECTED;
  pull.mesh = null;
  pull.face = { kind: 'sketch', sketch: g };
  placePullArrow();
  const d = g.userData;
  $('sketchKind').textContent = { rect: 'Rectangle', circle: 'Circle', poly: 'Shape' }[d.kind];
  $('sketchRect').hidden = d.kind !== 'rect';
  $('sketchCircle').hidden = d.kind !== 'circle';
  if (d.kind === 'rect') {
    $('skW').value = fmtLen(Math.abs(d.rect.w));
    $('skH').value = fmtLen(Math.abs(d.rect.h));
  } else if (d.kind === 'circle') {
    $('skD').value = fmtLen(d.circle.r * 2);
  }
  $('skExtrude').value = '';
  $('sketchbar').hidden = false;
}

function deselectSketch() {
  if (!selectedSketch) return;
  selectedSketch.fill.material = SKETCH_FILL;
  selectedSketch = null;
  if (pull.face && pull.face.kind === 'sketch') clearPullFace();
  $('sketchbar').hidden = true;
}

// Change the size of the selected rectangle / circle by typing.
function resizeSketch() {
  const g = selectedSketch;
  if (!g) return;
  const d = sketchData(g);
  if (d.kind === 'rect') {
    const w = fromDisp(parseFloat($('skW').value));
    const h = fromDisp(parseFloat($('skH').value));
    if (!(w > 0) || !(h > 0)) return selectSketch(g);
    d.rect.w = Math.sign(d.rect.w || 1) * w;
    d.rect.h = Math.sign(d.rect.h || 1) * h;
  } else if (d.kind === 'circle') {
    const dia = fromDisp(parseFloat($('skD').value));
    if (!(dia > 0)) return selectSketch(g);
    d.circle.r = dia / 2;
  }
  const i = sketches.indexOf(g);
  removeSketch(g);
  const next = addSketch(d);
  sketches.splice(sketches.indexOf(next), 1);
  sketches.splice(i, 0, next);
  selectSketch(next);
  commit();
}

function deleteSelectedSketch() {
  if (!selectedSketch) return;
  removeSketch(selectedSketch);
  commit();
}

// The solid you get by pulling a sketch by `dist` (negative = into the part).
// `overlap` reaches slightly past the sketch plane so booleans join/cut cleanly.
function sketchSolid(d, dist, overlap) {
  const g = new THREE.ExtrudeGeometry(sketchShape(d), {
    depth: Math.abs(dist) + overlap, bevelEnabled: false, curveSegments: 48,
  });
  g.translate(0, 0, dist > 0 ? -overlap : dist);
  g.applyMatrix4(planeMatrix(planeFromData(d.plane)));
  return g;
}

function brushFrom(geometryWorld) {
  for (const key of Object.keys(geometryWorld.attributes)) {
    if (key !== 'position' && key !== 'normal') geometryWorld.deleteAttribute(key);
  }
  geometryWorld.clearGroups();
  const b = new Brush(geometryWorld);
  b.updateMatrixWorld();
  return b;
}

function booleanWith(mesh, toolWorld, op) {
  mesh.updateMatrixWorld();
  const evaluator = new Evaluator();
  evaluator.attributes = ['position', 'normal'];
  evaluator.useGroups = false;
  const a = brushFrom(mesh.geometry.clone().applyMatrix4(mesh.matrixWorld));
  return evaluator.evaluate(a, brushFrom(toolWorld), op).geometry;
}

function replaceGeometry(mesh, geometryWorld) {
  geometryWorld.computeBoundingBox();
  const center = geometryWorld.boundingBox.getCenter(new THREE.Vector3());
  geometryWorld.translate(-center.x, -center.y, -center.z);
  const next = toCustom(mesh, geometryWorld, center);
  const i = objects.indexOf(mesh);
  removeObject(mesh);
  objects.splice(i, 0, next);
  world.add(next);
  return next;
}

const sketchPreview = new THREE.Mesh(
  new THREE.BufferGeometry(),
  new THREE.MeshStandardMaterial({ color: 0x5fbf77, transparent: true, opacity: 0.6, depthWrite: false }),
);
sketchPreview.visible = false;
scene.add(sketchPreview);

function previewSketchSolid(d, dist) {
  sketchPreview.geometry.dispose();
  if (Math.abs(dist) < 1e-6) {
    sketchPreview.visible = false;
    return;
  }
  sketchPreview.geometry = sketchSolid(d, dist, 0);
  sketchPreview.material.color.set(dist > 0 ? 0x5fbf77 : 0xff6b5e);
  sketchPreview.visible = true;
}

function extrudeSketch(g, dist) {
  if (Math.abs(dist) < 1e-6) return;
  const d = sketchData(g);
  const host = objects.find((o) => o.userData.id === d.hostId && o.visible);
  if (dist < 0 && !host) {
    toast('Pull outward to make a solid. Pushing in cuts only when the sketch is drawn on a part.');
    return;
  }
  if (!host) {
    removeSketch(g);
    addGeometryObject(sketchSolid(d, dist, 0), 'Body');
    toast(`Pulled up ${withUnit(dist)}.`);
    return;
  }
  let result;
  try {
    result = booleanWith(host, sketchSolid(d, dist, 0.02), dist > 0 ? ADDITION : SUBTRACTION);
  } catch (err) {
    console.error(err);
  }
  if (!result || !result.attributes.position || result.attributes.position.count === 0) {
    toast(result ? 'That would remove the whole part.' : 'Could not do that. Try a slightly different size.');
    return;
  }
  removeSketch(g);
  const next = replaceGeometry(host, result);
  setSelection([next]);
  commit();
  toast(dist > 0 ? `Added ${withUnit(dist)} to "${next.name}".` : `Cut ${withUnit(-dist)} into "${next.name}".`);
}

/* ---------- drawing sketches ---------- */
const draw = {
  active: false,
  kind: null, // 'rect' | 'circle' | 'line' | 'spin'
  plane: null, // sketch plane (rect/circle/line)
  hostId: null,
  spinPlane: new THREE.Plane(new THREE.Vector3(0, 0, 1), 0),
  points: [], // line: Vector2 (plane coords); spin: Vector3 (world)
  anchor: null, // rect corner / circle centre
  anchorJustSet: false,
  cursor: null,
  stroke: null,
  preview: new THREE.Group(),
  savedView: null,
};
scene.add(draw.preview);

const previewLine = new THREE.Line(new THREE.BufferGeometry(), new THREE.LineBasicMaterial({ color: 0xffd166 }));
const mirrorLine = new THREE.Line(
  new THREE.BufferGeometry(),
  new THREE.LineDashedMaterial({ color: 0xffd166, dashSize: 0.2, gapSize: 0.15, transparent: true, opacity: 0.5 }),
);
const previewDots = new THREE.Points(
  new THREE.BufferGeometry(),
  new THREE.PointsMaterial({ color: 0xffffff, size: 9, sizeAttenuation: false }),
);
const spinAxis = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(0, 30, 0)]),
  new THREE.LineDashedMaterial({ color: 0x6bdc7c, dashSize: 0.3, gapSize: 0.2 }),
);
spinAxis.computeLineDistances();
for (const o of [previewLine, mirrorLine, previewDots, spinAxis]) {
  o.renderOrder = 10;
  o.material.depthTest = false;
  o.frustumCulled = false;
}
const cursorDot = new THREE.Points(
  new THREE.BufferGeometry().setFromPoints([new THREE.Vector3()]),
  new THREE.PointsMaterial({ color: 0xffd166, size: 13, sizeAttenuation: false, depthTest: false }),
);
cursorDot.renderOrder = 11;
cursorDot.frustumCulled = false;
let sketchGrid = null;
draw.preview.add(previewLine, mirrorLine, previewDots, spinAxis, cursorDot);
draw.preview.visible = false;

const PICK_SURFACE = 'Step 1: tap where you want to draw: the ground, or any face of a part.';
const DRAW_INFO = {
  rect: ['Rectangle', 'Step 2: drag from corner to corner, or tap two corners.'],
  circle: ['Circle', 'Step 2: drag from the centre outward, or tap the centre, then the edge.'],
  line: ['Line', 'Step 2: tap to place corners, or drag to draw freely. Tap the first point or Finish to close it.'],
  spin: ['Spin shape', 'Draw the right half of the side outline. It spins around the green line to make round objects like cups and vases.'],
};

function startDraw(kind) {
  if (draw.active) cancelDraw();
  if (pull.on) setMode('translate');
  deselectSketch();
  setSelection([]);
  Object.assign(draw, {
    active: true, kind, plane: null, hostId: null, points: [], anchor: null, cursor: null, stroke: null,
  });
  draw.savedView = { pos: camera.position.clone(), target: orbit.target.clone() };
  if (kind === 'spin') {
    // Look straight at the side profile.
    const c = unit().cell;
    animateCamera(new THREE.Vector3(2 * c, 3 * c, 16 * c), new THREE.Vector3(2 * c, 3 * c, 0));
  }
  orbit.enableRotate = false;
  transform.enabled = false;
  spinAxis.visible = kind === 'spin';
  mirrorLine.visible = kind === 'spin';
  draw.preview.visible = true;
  updateDrawPreview();
  document.body.classList.add('drawing');
  document.body.classList.remove('show-inspector');
  $('drawTitle').textContent = DRAW_INFO[kind][0];
  $('drawHelp').textContent = kind === 'spin' ? DRAW_INFO[kind][1] : PICK_SURFACE;
  $('drawSurface').hidden = true;
  const pointTool = kind === 'line' || kind === 'spin';
  $('drawUndo').hidden = !pointTool;
  $('drawFinish').hidden = !pointTool;
  $('drawbar').hidden = false;
  document.querySelectorAll('[data-action^="draw-start"]').forEach((b) => {
    b.classList.toggle('active', b.dataset.action === `draw-start-${kind}`);
  });
}

function endDraw(restoreView) {
  draw.active = false;
  draw.stroke = null;
  draw.preview.visible = false;
  orbit.enableRotate = true;
  transform.enabled = true;
  $('dimLabel').hidden = true;
  document.body.classList.remove('drawing');
  $('drawbar').hidden = true;
  document.querySelectorAll('[data-action^="draw-start"]').forEach((b) => b.classList.remove('active'));
  removeSketchGrid();
  if (restoreView && draw.savedView) animateCamera(draw.savedView.pos, draw.savedView.target);
}

// A grid lying on the chosen surface, centred where you tapped.
function showSketchGrid(focus) {
  removeSketchGrid();
  const P = draw.plane;
  const c = unit().cell;
  const g = new THREE.GridHelper(24 * c, 24, 0xffd166, 0xffd166);
  g.material.transparent = true;
  g.material.opacity = 0.35;
  g.material.depthWrite = false;
  const q = rayToUVPoint(P, focus);
  const center = fromUV(P, Math.round(q.x / c) * c, Math.round(q.y / c) * c, 0.006 * c);
  g.matrixAutoUpdate = false;
  g.matrix.makeBasis(P.u, P.n, P.u.clone().cross(P.n)).setPosition(center);
  g.renderOrder = 4;
  sketchGrid = g;
  scene.add(g);
}
function removeSketchGrid() {
  if (!sketchGrid) return;
  scene.remove(sketchGrid);
  sketchGrid.geometry.dispose();
  sketchGrid.material.dispose();
  sketchGrid = null;
}
const rayToUVPoint = (P, point) => {
  const d = point.clone().sub(P.o);
  return new THREE.Vector2(d.dot(P.u), d.dot(P.v));
};

// Turn the camera to look straight at the drawing surface.
function faceSurface(focus) {
  const n = draw.plane.n;
  const dist = THREE.MathUtils.clamp(camera.position.distanceTo(orbit.target), 8 * unit().cell, 40 * unit().cell);
  const dir = n.clone();
  if (Math.abs(n.y) > 0.99) dir.z += 0.001; // avoid a straight-down lookAt flip
  animateCamera(focus.clone().addScaledVector(dir.normalize(), dist), focus.clone());
}

// Pick a new surface without leaving the tool.
function changeSurface() {
  Object.assign(draw, { plane: null, hostId: null, points: [], anchor: null, cursor: null, stroke: null });
  removeSketchGrid();
  $('drawHelp').textContent = PICK_SURFACE;
  $('drawSurface').hidden = true;
  updateDrawPreview();
}

function cancelDraw() {
  endDraw(true);
}

// Pick the sketch plane from what is under the pointer: a face of a part, or the ground.
function choosePlane(e) {
  setPointer(e);
  const hit = raycaster.intersectObjects(objects.filter((o) => o.visible), false)[0];
  if (hit) {
    const n = hit.face.normal.clone().applyNormalMatrix(new THREE.Matrix3().getNormalMatrix(hit.object.matrixWorld)).normalize();
    draw.plane = makePlane(n.clone().multiplyScalar(n.dot(hit.point)), n);
    draw.hostId = hit.object.userData.id;
    draw.focus = hit.point.clone();
    $('drawHelp').textContent = `Drawing on "${hit.object.name}". ${DRAW_INFO[draw.kind][1]}`;
  } else {
    const g = raycaster.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), new THREE.Vector3());
    if (!g) return false;
    draw.plane = makePlane(new THREE.Vector3(), new THREE.Vector3(0, 1, 0));
    draw.hostId = null;
    draw.focus = g;
    $('drawHelp').textContent = `Drawing on the ground. ${DRAW_INFO[draw.kind][1]}`;
  }
  $('drawSurface').hidden = false;
  showSketchGrid(draw.focus);
  faceSurface(draw.focus);
  return true;
}

function pointerUV(e, snap) {
  setPointer(e);
  const q = rayToUV(draw.plane);
  return q && snap ? snapUV(q) : q;
}

function spinPoint(e, snap) {
  setPointer(e);
  const hit = raycaster.ray.intersectPlane(draw.spinPlane, new THREE.Vector3());
  if (!hit) return null;
  if (snap && snapOn) {
    const f = unit().fine;
    hit.x = Math.round(hit.x / f) * f;
    hit.y = Math.round(hit.y / f) * f;
  }
  hit.z = 0;
  return hit;
}

function drawPointerDown(e) {
  if (e.button !== 0 || activePointers.size > 1) {
    // A second finger means pan / zoom: undo whatever this stroke added.
    if (draw.stroke) {
      draw.points.length = draw.stroke.startCount;
      if (draw.anchorJustSet) draw.anchor = null;
    }
    draw.stroke = null;
    updateDrawPreview();
    return;
  }
  if (draw.kind !== 'spin' && !draw.plane) {
    // First tap only chooses the surface; drawing starts once the camera faces it.
    choosePlane(e);
    draw.stroke = null;
    return;
  }
  draw.anchorJustSet = false;
  if ((draw.kind === 'rect' || draw.kind === 'circle') && !draw.anchor) {
    draw.anchor = pointerUV(e, true);
    draw.anchorJustSet = !!draw.anchor;
  }
  draw.stroke = { x: e.clientX, y: e.clientY, moved: false, startCount: draw.points.length };
}

function drawPointerMove(e) {
  const st = draw.stroke;
  if (st && !st.moved && Math.hypot(e.clientX - st.x, e.clientY - st.y) >= 6) st.moved = true;
  if (draw.kind === 'spin') {
    if (st && st.moved) addFreehand(spinPoint(e, false));
    return;
  }
  if (!draw.plane) return;
  if (draw.kind === 'line' && st && st.moved) {
    addFreehand(pointerUV(e, false));
    return;
  }
  draw.cursor = pointerUV(e, true);
  updateDrawPreview(e);
}

function addFreehand(p) {
  if (!p) return;
  const last = draw.points[draw.points.length - 1];
  if (!last || last.distanceTo(p) > unit().cell * 0.25) {
    draw.points.push(p);
    updateDrawPreview();
  }
}

function drawPointerUp(e) {
  const st = draw.stroke;
  draw.stroke = null;
  if (!st) return;
  const kind = draw.kind;

  if (kind === 'rect' || kind === 'circle') {
    if (!draw.anchor) return;
    if (!st.moved && draw.anchorJustSet) return; // first tap: wait for the second
    const end = pointerUV(e, true);
    if (end) finishShapeSketch(end);
    return;
  }

  const pts = draw.points;
  if (st.moved) {
    // Freehand stroke: drawing back onto the start closes the outline.
    if (kind === 'line' && pts.length > 8 && pts[0].distanceTo(pts[pts.length - 1]) < 0.6) finishDraw();
    return;
  }
  const p = kind === 'spin' ? spinPoint(e, true) : pointerUV(e, true);
  if (!p) return;
  const closeDist = Math.max(0.3, camera.position.distanceTo(orbit.target) * 0.025);
  if (kind === 'line' && pts.length >= 3 && p.distanceTo(pts[0]) < closeDist) {
    finishDraw();
    return;
  }
  const last = pts[pts.length - 1];
  if (last && last.distanceTo(p) < 0.01) return;
  pts.push(p);
  updateDrawPreview(e);
}

function shapeFromAnchor(end) {
  const a = draw.anchor;
  if (draw.kind === 'rect') return { kind: 'rect', rect: { x: a.x, y: a.y, w: end.x - a.x, h: end.y - a.y } };
  return { kind: 'circle', circle: { cx: a.x, cy: a.y, r: a.distanceTo(end) } };
}

function finishShapeSketch(end) {
  const d = shapeFromAnchor(end);
  const tiny = d.kind === 'rect' ? Math.abs(d.rect.w) < 0.05 || Math.abs(d.rect.h) < 0.05 : d.circle.r < 0.05;
  if (tiny) {
    draw.anchor = null;
    updateDrawPreview();
    toast('Too small. Drag a bit further.');
    return;
  }
  createSketch(d);
}

function createSketch(d) {
  const data = { ...d, plane: planeToData(draw.plane), hostId: draw.hostId };
  const saved = draw.savedView;
  endDraw(false);
  const g = addSketch(data);
  // Tilt back to an angled view so the sketch's arrow is easy to grab.
  const target = pullAxisFor(g).origin;
  let dir = saved ? saved.pos.clone().sub(saved.target).normalize() : new THREE.Vector3(...VIEWS.persp).normalize();
  if (Math.abs(dir.dot(planeFromData(data.plane).n)) > 0.85) dir = new THREE.Vector3(...VIEWS.persp).normalize();
  animateCamera(target.clone().addScaledVector(dir, camera.position.distanceTo(orbit.target)), target);
  selectSketch(g);
  commit();
  toast(data.hostId
    ? 'Drag the arrow: pull out to add, push in to cut.'
    : 'Drag the arrow up to turn it into a solid.');
}

function showDim(e, text) {
  const el = $('dimLabel');
  if (!e || !text) {
    el.hidden = true;
    return;
  }
  const r = viewport.getBoundingClientRect();
  el.textContent = text;
  el.style.left = `${e.clientX - r.left + 16}px`;
  el.style.top = `${e.clientY - r.top + 16}px`;
  el.hidden = false;
}

function updateDrawPreview(e) {
  const kind = draw.kind;
  let world = [];
  let closed = false;
  let dim = '';
  if (kind === 'spin') {
    world = draw.points;
  } else if (draw.plane) {
    const P = draw.plane;
    const toW = (q) => fromUV(P, q.x, q.y, 0.01);
    if ((kind === 'rect' || kind === 'circle') && draw.anchor) {
      const end = draw.cursor || draw.anchor;
      const d = shapeFromAnchor(end);
      world = sketchShape(d).getPoints(48).map(toW);
      closed = true;
      dim = kind === 'rect'
        ? `${fmtLen(Math.abs(d.rect.w))} × ${fmtLen(Math.abs(d.rect.h))} ${unit().label}`
        : `⌀ ${withUnit(d.circle.r * 2)}`;
      if (kind === 'circle') world.push(toW(draw.anchor), toW(end)); // radius line
    } else if (kind === 'line') {
      const pts = [...draw.points];
      if (draw.cursor && pts.length && !draw.stroke) {
        pts.push(draw.cursor);
        dim = withUnit(draw.cursor.distanceTo(draw.points[draw.points.length - 1]));
      }
      world = pts.map(toW);
      closed = draw.points.length > 2;
    }
  }
  const linePts = closed && world.length > 2 ? [...world, world[0]] : world;
  previewLine.geometry.dispose();
  previewLine.geometry = new THREE.BufferGeometry().setFromPoints(linePts.length ? linePts : [new THREE.Vector3()]);
  const dots = kind === 'spin' ? draw.points
    : draw.plane ? (kind === 'line' ? draw.points : draw.anchor ? [draw.anchor] : []).map((q) => fromUV(draw.plane, q.x, q.y, 0.01)) : [];
  previewDots.geometry.dispose();
  previewDots.geometry = new THREE.BufferGeometry().setFromPoints(dots);
  const cursorWorld = kind !== 'spin' && draw.plane && draw.cursor ? fromUV(draw.plane, draw.cursor.x, draw.cursor.y, 0.01) : null;
  cursorDot.visible = !!cursorWorld;
  if (cursorWorld) {
    cursorDot.geometry.attributes.position.setXYZ(0, cursorWorld.x, cursorWorld.y, cursorWorld.z);
    cursorDot.geometry.attributes.position.needsUpdate = true;
  }
  mirrorLine.geometry.dispose();
  mirrorLine.geometry = new THREE.BufferGeometry().setFromPoints(
    kind === 'spin' && draw.points.length ? draw.points.map((p) => new THREE.Vector3(-p.x, p.y, p.z)) : [new THREE.Vector3()],
  );
  mirrorLine.computeLineDistances();
  const need = kind === 'line' ? 3 : 2;
  $('drawFinish').disabled = draw.points.length < need;
  $('drawUndo').disabled = draw.points.length === 0;
  $('drawCount').textContent = draw.points.length ? `${draw.points.length} point${draw.points.length === 1 ? '' : 's'}` : '';
  showDim(e, dim);
}

function undoDrawPoint() {
  draw.points.pop();
  updateDrawPreview();
}

function finishDraw() {
  const pts = draw.points;
  if (draw.kind === 'line') {
    if (pts.length < 3) return;
    createSketch({ kind: 'poly', points: pts.map((q) => [round(q.x), round(q.y)]) });
    return;
  }
  if (draw.kind !== 'spin' || pts.length < 2) return;
  let geometry;
  try {
    const profile = pts.map((p) => new THREE.Vector2(Math.abs(p.x), p.y));
    // Close the solid at the axis, bottom and top.
    if (profile[0].x > 0.001) profile.unshift(new THREE.Vector2(0, profile[0].y));
    if (profile[profile.length - 1].x > 0.001) profile.push(new THREE.Vector2(0, profile[profile.length - 1].y));
    geometry = new THREE.LatheGeometry(profile, 64);
  } catch (err) {
    console.error(err);
  }
  if (!geometry || !geometry.attributes.position || geometry.attributes.position.count === 0) {
    toast('Could not make a shape from that drawing.');
    return;
  }
  endDraw(false);
  const mesh = addGeometryObject(geometry, 'Spun shape');
  setView('persp');
  frame([mesh]);
  toast('Done! Resize or recolor it on the right.');
}

// Dragging the gizmo: when moving, the other selected objects follow the primary one.
let dragStart = null;
transform.addEventListener('dragging-changed', (e) => {
  orbit.enabled = !e.value;
  if (e.value) {
    dragStart = {
      primary: primary().position.clone(),
      others: selection.map((m) => m.position.clone()),
    };
  } else {
    dragStart = null;
    commit();
  }
});

transform.addEventListener('objectChange', () => {
  const p = primary();
  if (!p) return;
  if (transform.mode === 'scale') {
    p.scale.set(Math.max(p.scale.x, 0.01), Math.max(p.scale.y, 0.01), Math.max(p.scale.z, 0.01));
  }
  if (transform.mode === 'translate' && dragStart && selection.length > 1) {
    const delta = p.position.clone().sub(dragStart.primary);
    selection.forEach((m, i) => {
      if (m !== p) m.position.copy(dragStart.others[i]).add(delta);
    });
  }
  refreshPanel();
});

/* ------------------------------------------------------------------ *
 * Import / export
 * ------------------------------------------------------------------ */
function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

function saveProject() {
  download(new Blob([JSON.stringify(serialize())], { type: 'application/json' }), 'my-design.json');
  toast('Design saved.');
}

function openProject(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!data || !Array.isArray(data.objects)) throw new Error('bad file');
      load(data);
      setSelection([]);
      commit();
      frame();
      toast(`Opened ${file.name}`);
    } catch {
      toast('That file is not a Shaper 3D design.');
    }
  };
  reader.readAsText(file);
}

function newProject() {
  if ((objects.length || sketches.length) && !confirm('Start a new design? (You can still undo this.)')) return;
  clearAll();
  setSelection([]);
  commit();
  orbit.target.set(0, 1, 0);
  camera.position.set(12, 10, 14);
}

async function exportModel(format) {
  const solids = objects.filter((o) => o.visible && !o.userData.hole);
  if (!solids.length) {
    toast('Nothing to export yet — add a solid shape first.');
    return;
  }
  const looseHoles = objects.some((o) => o.visible && o.userData.hole);

  // Build a clean export scene. Model units → millimetres for STL/OBJ, metres-ish for GLB.
  const root = new THREE.Group();
  const holder = new THREE.Group();
  root.add(holder);
  for (const m of solids) {
    const c = new THREE.Mesh(
      m.geometry,
      new THREE.MeshStandardMaterial({ color: m.userData.color, roughness: 0.45, metalness: 0.05 }),
    );
    c.name = m.name;
    c.position.copy(m.position);
    c.quaternion.copy(m.quaternion);
    c.scale.copy(m.scale);
    holder.add(c);
  }
  if (format !== 'glb') {
    holder.scale.setScalar(MM_PER_UNIT);
    if (format === 'stl') holder.rotation.x = Math.PI / 2; // Y-up → Z-up for slicers
  } else {
    holder.scale.setScalar(MM_PER_UNIT / 1000);
  }
  root.updateMatrixWorld(true);

  try {
    if (format === 'stl') {
      const data = new STLExporter().parse(root, { binary: true });
      download(new Blob([data], { type: 'model/stl' }), 'my-design.stl');
    } else if (format === 'obj') {
      download(new Blob([new OBJExporter().parse(root)], { type: 'text/plain' }), 'my-design.obj');
    } else {
      const data = await new GLTFExporter().parseAsync(root, { binary: true });
      download(new Blob([data], { type: 'model/gltf-binary' }), 'my-design.glb');
    }
    toast(looseHoles ? 'Exported. Note: holes only cut after you Combine them.' : 'Exported.');
  } catch (err) {
    console.error(err);
    toast('Export failed.');
  } finally {
    root.traverse((o) => o.material && o.material.dispose());
  }
}

/* ------------------------------------------------------------------ *
 * UI
 * ------------------------------------------------------------------ */
const $ = (id) => document.getElementById(id);
const AXES = ['x', 'y', 'z'];

// Build X/Y/Z number inputs.
for (const holderEl of document.querySelectorAll('.xyz')) {
  const prop = holderEl.dataset.prop;
  AXES.forEach((axis, i) => {
    const label = document.createElement('label');
    label.innerHTML = `<i class="${axis}">${axis.toUpperCase()}</i>`;
    const input = document.createElement('input');
    input.type = 'number';
    input.step = prop === 'rotation' ? '15' : '0.5';
    if (prop === 'size') input.min = String(MIN_SIZE);
    input.dataset.prop = prop;
    input.dataset.axis = String(i);
    input.addEventListener('change', onVecInput);
    input.addEventListener('keydown', (e) => e.key === 'Enter' && input.blur());
    label.appendChild(input);
    holderEl.appendChild(label);
  });
}

function onVecInput(e) {
  const input = e.target;
  const p = primary();
  const value = parseFloat(input.value);
  if (!p || !Number.isFinite(value)) {
    refreshPanel();
    return;
  }
  const axis = AXES[+input.dataset.axis];
  if (input.dataset.prop === 'position') {
    p.position[axis] = fromDisp(value);
  } else if (input.dataset.prop === 'rotation') {
    p.rotation[axis] = THREE.MathUtils.degToRad(value);
  } else {
    const size = getSize(p);
    const v = Math.max(MIN_SIZE, fromDisp(value));
    if ($('pLock').checked && size[axis] > 0) size.multiplyScalar(v / size[axis]);
    else size[axis] = v;
    setSize(p, size);
  }
  if (pull.mesh === p) clearPullFace(); // the face moved; pick it again
  refreshPanel();
  commit();
}

const swatches = $('swatches');
for (const color of PALETTE) {
  const b = document.createElement('button');
  b.className = 'swatch';
  b.style.background = color;
  b.title = color;
  b.addEventListener('click', () => {
    setColor(color, true);
    refreshPanel();
  });
  swatches.appendChild(b);
}

$('pColor').addEventListener('input', (e) => setColor(e.target.value, false));
$('pColor').addEventListener('change', (e) => setColor(e.target.value, true));
for (const id of ['skW', 'skH', 'skD']) {
  $(id).addEventListener('change', resizeSketch);
  $(id).addEventListener('keydown', (e) => e.key === 'Enter' && e.target.blur());
}
$('skExtrude').addEventListener('change', (e) => {
  const v = parseFloat(e.target.value);
  e.target.value = '';
  if (selectedSketch && Number.isFinite(v)) extrudeSketch(selectedSketch, fromDisp(v));
});
$('skExtrude').addEventListener('keydown', (e) => e.key === 'Enter' && e.target.blur());
$('pullDist').addEventListener('change', (e) => {
  pullByTyping(fromDisp(parseFloat(e.target.value)));
  e.target.value = '0';
});
$('pullDist').addEventListener('keydown', (e) => e.key === 'Enter' && e.target.blur());
$('pText').addEventListener('change', (e) => {
  const p = primary();
  if (p) setText(p, e.target.value);
  refreshUI();
});
$('pText').addEventListener('keydown', (e) => e.key === 'Enter' && e.target.blur());
$('pName').addEventListener('change', (e) => {
  const p = primary();
  if (!p) return;
  p.name = e.target.value.trim() || p.name;
  commit();
});

const fmt = (v) => String(Math.round(v * 100) / 100);

function refreshPanel() {
  const p = primary();
  $('propsEmpty').hidden = !!p;
  $('propsBody').hidden = !p;
  if (!p) return;
  const active = document.activeElement;
  const set = (el, v) => {
    if (el !== active) el.value = v;
  };

  const note = $('multiNote');
  note.hidden = selection.length < 2;
  note.textContent = `${selection.length} objects selected — numbers below are for "${p.name}". Color and Solid/Hole apply to all.`;

  set($('pName'), p.name);
  const isText = p.userData.type === 'text';
  $('textField').hidden = !isText;
  if (isText) set($('pText'), p.userData.text);
  set($('pColor'), p.userData.color);
  $('pColor').disabled = selection.every((m) => m.userData.hole);
  const allHoles = selection.every((m) => m.userData.hole);
  const anyHole = selection.some((m) => m.userData.hole);
  $('pSolid').classList.toggle('active', !anyHole);
  $('pHole').classList.toggle('active', allHoles);

  const size = getSize(p);
  const rot = [p.rotation.x, p.rotation.y, p.rotation.z].map((r) => THREE.MathUtils.radToDeg(r));
  document.querySelectorAll('.xyz input').forEach((input) => {
    const i = +input.dataset.axis;
    const prop = input.dataset.prop;
    const v = prop === 'size' ? size.getComponent(i) : prop === 'position' ? p.position.getComponent(i) : rot[i];
    set(input, prop === 'rotation' ? fmt(v) : fmtLen(v));
  });
}

function renderOutliner() {
  const list = $('outliner');
  list.replaceChildren();
  $('objCount').textContent = objects.length ? `(${objects.length})` : '';
  if (!objects.length) {
    const li = document.createElement('li');
    li.className = 'empty';
    li.textContent = 'No objects yet.';
    list.appendChild(li);
  }
  for (const o of objects) {
    const li = document.createElement('li');
    li.classList.toggle('selected', selection.includes(o));
    li.classList.toggle('hidden-obj', !o.visible);

    const dot = document.createElement('span');
    dot.className = 'dot' + (o.userData.hole ? ' hole' : '');
    if (!o.userData.hole) dot.style.background = o.userData.color;

    const name = document.createElement('button');
    name.className = 'name';
    name.textContent = o.name;
    name.addEventListener('click', (e) => {
      if (!o.visible) return;
      const additive = e.shiftKey || e.ctrlKey || e.metaKey || multiMode;
      if (additive) setSelection(selection.includes(o) ? selection.filter((m) => m !== o) : [...selection, o]);
      else setSelection([o]);
    });

    const eye = document.createElement('button');
    eye.className = 'eye';
    eye.title = o.visible ? 'Hide' : 'Show';
    eye.textContent = o.visible ? '👁' : '—';
    eye.addEventListener('click', () => toggleVisible(o));

    li.append(dot, name, eye);
    list.appendChild(li);
  }
}

function refreshUI() {
  refreshPanel();
  renderOutliner();
  document.querySelectorAll('[data-needs]').forEach((b) => {
    b.disabled = selection.length < +b.dataset.needs;
  });
  $('undoBtn').disabled = history.index <= 0;
  $('redoBtn').disabled = history.index >= history.stack.length - 1;
  $('hint').classList.toggle('gone', objects.length > 0 || sketches.length > 0);
}

let toastTimer;
function toast(msg) {
  const el = $('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

const actions = {
  new: newProject,
  open: () => $('fileInput').click(),
  save: saveProject,
  'export-stl': () => exportModel('stl'),
  'export-obj': () => exportModel('obj'),
  'export-glb': () => exportModel('glb'),
  undo,
  redo,
  frame: () => frame(),
  snap: () => {
    snapOn = !snapOn;
    applySnap();
    $('snapBtn').classList.toggle('active', snapOn);
    toast(snapOn ? 'Snap on' : 'Snap off — free movement');
  },
  multi: () => {
    multiMode = !multiMode;
    $('multiBtn').classList.toggle('active', multiMode);
    toast(multiMode ? 'Multi-select on: tap objects to add them' : 'Multi-select off');
  },
  duplicate: duplicateSelection,
  delete: deleteSelection,
  hole: toggleHole,
  'set-solid': () => setHole(false),
  'set-hole': () => setHole(true),
  combine: combineSelection,
  mirror: mirrorSelection,
  floor: dropToFloor,
  align: alignSelection,
  text: addText,
  'draw-start-rect': () => startDraw('rect'),
  'draw-start-circle': () => startDraw('circle'),
  'draw-start-line': () => startDraw('line'),
  'sketch-delete': deleteSelectedSketch,
  'draw-start-spin': () => startDraw('spin'),
  'draw-undo': undoDrawPoint,
  'draw-cancel': cancelDraw,
  'draw-finish': finishDraw,
  'draw-surface': changeSurface,
  'pull-done': () => setMode('translate'),
  help: () => ($('help').hidden = false),
  'help-close': () => ($('help').hidden = true),
  'toggle-inspector': () => document.body.classList.toggle('show-inspector'),
};

document.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn || btn.disabled) return;
  // Any other editing button ends an unfinished drawing.
  const keepsDrawing = btn.closest('#drawbar') || btn.dataset.view || /^(draw-|snap|help|toggle)/.test(btn.dataset.action || '');
  if (draw.active && !keepsDrawing) cancelDraw();
  if (btn.dataset.action && actions[btn.dataset.action]) {
    actions[btn.dataset.action]();
    btn.closest('details')?.removeAttribute('open');
  } else if (btn.dataset.shape) {
    addShape(btn.dataset.shape);
  } else if (btn.dataset.mode) {
    setMode(btn.dataset.mode);
  } else if (btn.dataset.view) {
    setView(btn.dataset.view);
  }
});

$('help').addEventListener('click', (e) => {
  if (e.target === $('help')) $('help').hidden = true;
});

$('fileInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) openProject(file);
  e.target.value = '';
});

window.addEventListener('keydown', (e) => {
  if (e.target.closest('input, textarea, select')) return;
  const k = e.key.toLowerCase();
  const mod = e.ctrlKey || e.metaKey;
  let handled = true;
  if (draw.active) {
    if (k === 'escape') cancelDraw();
    else if (k === 'enter') finishDraw();
    else if (k === 'backspace' || k === 'delete' || (mod && k === 'z')) undoDrawPoint();
    else handled = false;
    if (handled) e.preventDefault();
    return;
  }
  if (mod && k === 'z') (e.shiftKey ? redo : undo)();
  else if (mod && k === 'y') redo();
  else if (mod && k === 'd') duplicateSelection();
  else if (mod && k === 's') saveProject();
  else if (mod) handled = false;
  else if (k === 'w') setMode('translate');
  else if (k === 'q') setMode('pull');
  else if (k === 'escape' && selectedSketch) deselectSketch();
  else if ((k === 'delete' || k === 'backspace') && selectedSketch) deleteSelectedSketch();
  else if (k === 'escape' && pull.face) clearPullFace();
  else if (k === 'e') setMode('rotate');
  else if (k === 'r') setMode('scale');
  else if (k === 'h') toggleHole();
  else if (k === 'g') combineSelection();
  else if (k === 'f') frame();
  else if (k === 'delete' || k === 'backspace') deleteSelection();
  else if (k === 'escape') {
    setSelection([]);
    $('help').hidden = true;
  } else handled = false;
  if (handled) e.preventDefault();
});

/* ------------------------------------------------------------------ *
 * Start
 * ------------------------------------------------------------------ */
setUnits(unitKey, false);
$('unitSelect').addEventListener('change', (e) => setUnits(e.target.value));
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) load(JSON.parse(saved));
} catch {
  clearAll();
}
colorIndex = objects.length;
setSelection([]);
commit();
if (objects.length || sketches.length) frame();

// Handy for debugging from the console.
window.shaper = { scene, camera, objects, serialize, addShape, combineSelection, setSelection, draw, pull, pullArrow, sketches, signedVolume };
