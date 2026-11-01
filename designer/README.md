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
| **Add shape** | Box, Sphere, Cylinder, Cone, Pyramid, Wedge, Ring, Dome |
| **Move / Rotate / Resize** | Drag the arrows on the selected object (`W` / `E` / `R`) or type exact numbers |
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

### Making a hole (example: a cup)

1. Add a **Cylinder** and make it 4 × 4 × 4.
2. Add another **Cylinder**, set it to **Hole**, make it 3 × 4 × 3 and raise it by 0.5.
3. Select both (Shift+click, or turn on **Multi-select** on a phone) and press **Combine**.

Mouse: left-drag orbit · right-drag pan · wheel zoom. Touch: one finger orbit · two fingers pan/zoom.
