# Shaper 3D — a simple 3D model designer

A small, beginner-friendly 3D modelling app that runs in the browser (desktop or phone).
It only has the essential tools, but with them you can build almost any model by
combining basic shapes and cutting holes.

## Run it

```bash
cd designer
npm install
npm run dev        # open http://localhost:5174
```

`npm run build` creates a static site in `designer/dist/` that you can host anywhere.

## Tools

| Tool | What it does |
| --- | --- |
| **Add shape** | Box, Sphere, Cylinder, Cone, Pyramid, Wedge, Ring, Dome, Tube, Hexagon, Capsule, Star, Heart. With an object selected, the new shape is stacked on top of it |
| **Text** | 3D letters; edit the words in Properties |
| **Sketch: Rectangle / Circle / Line** | Draw on the ground **or on any face of a part**, with live measurements. Tap a sketch and drag its arrow: pull out to add material, push in to cut a pocket or hole (Shapr3D-style "sketch, then pull"). Sizes and depth can be typed exactly |
| **Spin shape** | Draw half of a side outline → it spins into a round object (cup, vase, bottle, chess piece) |
| **Align centers** | Lines up the centres of the selected objects with the last one picked |
| **Move / Rotate / Resize** | Drag the arrows on the selected object (`W` / `E` / `R`) or type exact numbers |
| **Push / Pull** | Like Fusion 360's Press Pull: tap a face, drag the yellow arrow (or type a distance) to make the object thicker or thinner from that side. Holes keep their size; pushing in stops before the next wall (`Q`) |
| **Snap to grid** | Moves in 0.5 steps, rotates in 15° steps, resizes in 0.25 steps |
| **Solid / Hole** | Turn any shape into a "hole" (`H`) |
| **Combine** | Glue the selected shapes into one object; holes are cut out (`G`) |
| **Mirror** | Flip the selection left/right |
| **Duplicate / Delete** | `Ctrl+D` / `Del` |
| **Drop to floor** | Sits the selection on the ground |
| **Color, name, hide/show** | In the right panel / object list |
| **Undo / Redo** | `Ctrl+Z` / `Ctrl+Y` (your design is also auto-saved in the browser) |
| **Views** | 3D, Top, Front, Side, Fit (`F`) |
| **Save / Open** | Save your design as `.json` and open it later |
| **Export** | STL (for 3D printing, 1 grid square = 10 mm), OBJ, GLB |

### Sketch, then pull (example: a block with a pocket)

1. Press **Rectangle** and drag on the ground from corner to corner. A label shows the size (e.g. `3 × 2`).
2. Drag the sketch's arrow up (or type `2` in **Extrude**) — it becomes a solid block.
3. Press **Circle**, tap the top of the block for the centre, then tap again for the edge.
4. Drag that arrow **down** (or type `-1`) to cut a pocket. Pull it **up** instead to add a boss.

**Spin shape** works the same way, but you draw in a side view: draw the right half of
the object's outline next to the green line, press **Finish**, and it spins into a round solid.

### Making a hole (example: a cup)

1. Add a **Cylinder** and make it 4 × 4 × 4.
2. Add another **Cylinder**, set it to **Hole**, make it 3 × 4 × 3 and raise it by 0.5.
3. Select both (Shift+click, or turn on **Multi-select** on a phone) and press **Combine**.

Mouse: left-drag orbit · right-drag pan · wheel zoom. Touch: one finger orbit · two fingers pan/zoom.
