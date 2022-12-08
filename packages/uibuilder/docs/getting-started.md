# Knobs
### Generative UI for generative projects

Install knobs via `npm install knobs+sliders` or `yarn add knobs+sliders`.

In your index.html, add `knobs.js` and the stylsheet:
```html

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8"/>
    <title>Document</title>
    
    <script src="/node_modules/knobs/dist/knobs.js"></script>
    <link rel="stylesheet" src="/node_modules/knobs/dist/knobs.css"></link>
    <link rel="stylesheet" src="/node_modules/knobs/dist/themes/light.css"></link>
  </head>
  <body></body>
</html>
```

To create a new UI panel, just create a new instance of Knobs:
```js
const ui = new Knobs();
```

Now instead of using an imperative API to create and program all the needed UI
components, Knobs will be auto-generated from a settings object (which you might
already have in your project anyway).

Consider having a simple project which should render a generative triangle (we
are using p5.js here):

```
function setup() {
  createCanvas(500, 500);
}

function draw() {
  background(0);
  fill(255);
  triangle(0, 0, width, 0, width / 2, height);
}
```

Now when we want to add parameters, which could change the behavior or the
appearance of the triangle, we could use traditional imperative API,
e.g. something like:

```
ui.addSlider("size", 1).onchange((newValue) => {
    TRIANGLE_SCALE = newValue;
})
```

instead, Knobs uses a global settings object to auto-generate the UI based on
all parameters in that object:

```
const settings = {
    triangleSize: 1
}

ui.build("Triangle Settings", settings);
```
