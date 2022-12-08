##### :warning: Pre-Alpha Prototype
# Potzblitz
> Generative UI toolkit for generative projects

---

### Rationale

The idea of potzblitz is to use a more declarative approach for defining control
user interfaces (UI) for generative artworks and interactive systems. Instead of
copy-pasting imperative code over and over again, the UI should be automatically
built from the systems configuration.

Speaking in code, instead of doing this:

```jsx
const ui = new UI();
const button = ui.addButton("redraw");
button.onChange(() => sketch.draw());
ui.add(button);
```

potzblitz aim to provide a more declarative way. Any system might already have
some form of state or a bunch of variables which define a controlable parameter
space and a set functions to tweak and change the system:

```jsx
const settings = {
    seed: 12,
    backgroundColor: "#eebe82",
    particleCount: 2000,
    randomize: () => randomizeParameters(),
	download: () => downloadCanvas(),
}

new UI().build(settings);
```

Additionally I wanted to have a control library which would could easily
be adapted in style and functionality, as well as being able to work with a
bunch of different frameworks (React, Solid.js, small Javascript only projects etc.)

---

### Ideas

This section outlines some thoughts and ideas for this project

- Generalize components in a framework-independant structure? Generate source
  code for React, Solid.js and other frameworks from a generalize data
  structure? [Web Components API](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- Separate a UI builder from its set of components. Have a `Map<UiType,
  Component>` which gets fed into the UI Builder to be able to customize and ad
  in project-specific components easily
- SCSS Themeing
- Plugin API to be able to add in middleware like functionality (e.g. websocket
  connector for controlling remote systems)
- Track state for an undo/redo history

---
