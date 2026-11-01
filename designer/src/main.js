import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { TransformControls } from 'three/addons/controls/TransformControls.js';
import { STLExporter } from 'three/addons/exporters/STLExporter.js';
import { OBJExporter } from 'three/addons/exporters/OBJExporter.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { Brush, Evaluator, ADDITION, SUBTRACTION } from 'three-bvh-csg';

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
};
// Shapes that look the same after a left/right mirror (when not rotated).
const X_SYMMETRIC = new Set(['box', 'sphere', 'cylinder', 'cone', 'pyramid', 'torus', 'dome']);

const PALETTE = ['#e8604c', '#f2a541', '#f4d35e', '#5fbf77', '#3fa7d6', '#6c63ff', '#c069c9', '#f0f0f0', '#8a8f98', '#2b2d33'];
const SNAP = { move: 0.5, rotate: THREE.MathUtils.degToRad(15), scale: 0.25 };
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

const ground = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), new THREE.ShadowMaterial({ opacity: 0.28 }));
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);

const grid = new THREE.GridHelper(40, 40, 0x4a515e, 0x30353f);
grid.position.y = 0.002;
scene.add(grid);
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

renderer.setAnimationLoop(() => {
  orbit.update();
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
  const geometry = custom ? geometryFromData(desc.geometry) : primitiveGeometry(desc.type);
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
    base: geometry.boundingBox.getSize(new THREE.Vector3()),
  };
  return mesh;
}

function addObject(mesh) {
  objects.push(mesh);
  world.add(mesh);
}

function removeObject(mesh) {
  if (transform.object === mesh) transform.detach();
  world.remove(mesh);
  objects.splice(objects.indexOf(mesh), 1);
  mesh.material.dispose();
  if (mesh.userData.type === 'custom') mesh.geometry.dispose();
}

function clearAll() {
  transform.detach();
  [...objects].forEach(removeObject);
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
  };
}

function serialize() {
  return { app: 'shaper3d', version: 1, objects: objects.map(describe) };
}

function load(data) {
  clearAll();
  for (const desc of data.objects) {
    if (desc.type !== 'custom' && !SHAPES[desc.type]) continue;
    addObject(createMesh(desc));
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
  for (const o of objects) {
    const sel = selection.includes(o);
    o.material.emissive.set(sel ? 0x2a5cff : 0x000000);
    o.material.emissiveIntensity = sel ? 0.22 : 0;
  }
  const p = primary();
  if (p && p.visible) transform.attach(p);
  else transform.detach();
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

function applySnap() {
  transform.setTranslationSnap(snapOn ? SNAP.move : null);
  transform.setRotationSnap(snapOn ? SNAP.rotate : null);
  transform.setScaleSnap(snapOn ? SNAP.scale : null);
}
applySnap();

function setMode(mode) {
  transform.setMode(mode);
  document.querySelectorAll('[data-mode]').forEach((b) => b.classList.toggle('active', b.dataset.mode === mode));
}

function addShape(type) {
  const shape = SHAPES[type];
  const t = orbit.target;
  const mesh = createMesh({
    type,
    name: uniqueName(shape.label),
    color: PALETTE[colorIndex++ % 7],
    hole: false,
    position: [Math.round(t.x), shape.size[1] / 2, Math.round(t.z)],
    rotation: [0, 0, 0],
    scale: shape.size,
  });
  addObject(mesh);
  setSelection([mesh]);
  setMode('translate');
  commit();
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

function frame(list = selection.length ? selection : objects.filter((o) => o.visible)) {
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

renderer.domElement.addEventListener('pointerdown', (e) => {
  down = { x: e.clientX, y: e.clientY, onGizmo: transform.axis !== null };
});

renderer.domElement.addEventListener('pointerup', (e) => {
  if (!down) return;
  const d = down;
  down = null;
  if (d.onGizmo || Math.hypot(e.clientX - d.x, e.clientY - d.y) > 6) return;

  const rect = renderer.domElement.getBoundingClientRect();
  pointer.set(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
  raycaster.setFromCamera(pointer, camera);
  const hit = raycaster.intersectObjects(objects.filter((o) => o.visible), false)[0];
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
  if (objects.length && !confirm('Start a new design? (You can still undo this.)')) return;
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
    p.position[axis] = value;
  } else if (input.dataset.prop === 'rotation') {
    p.rotation[axis] = THREE.MathUtils.degToRad(value);
  } else {
    const size = getSize(p);
    const v = Math.max(MIN_SIZE, value);
    if ($('pLock').checked && size[axis] > 0) size.multiplyScalar(v / size[axis]);
    else size[axis] = v;
    setSize(p, size);
  }
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
    set(input, fmt(v));
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
  $('hint').classList.toggle('gone', objects.length > 0);
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
  help: () => ($('help').hidden = false),
  'help-close': () => ($('help').hidden = true),
  'toggle-inspector': () => document.body.classList.toggle('show-inspector'),
};

document.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn || btn.disabled) return;
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
  if (mod && k === 'z') (e.shiftKey ? redo : undo)();
  else if (mod && k === 'y') redo();
  else if (mod && k === 'd') duplicateSelection();
  else if (mod && k === 's') saveProject();
  else if (mod) handled = false;
  else if (k === 'w') setMode('translate');
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
try {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) load(JSON.parse(saved));
} catch {
  clearAll();
}
colorIndex = objects.length;
setSelection([]);
commit();
if (objects.length) frame();

// Handy for debugging from the console.
window.shaper = { scene, objects, serialize, addShape, combineSelection, setSelection };
