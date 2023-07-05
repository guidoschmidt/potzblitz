import "./styles.scss";
import { Potzblitz } from "@potzblitz/rdom";

const state = {};

const styles = getComputedStyle(document.body);
const variables = Array.from(styles).filter((k) => k.includes("potzblitz"));

variables.map((key) => {
  const value = styles.getPropertyValue(key);

  const isColorPattern = /rgba?/;
  const isColor = isColorPattern.test(value) || key.includes("color");
  if (isColor) {
    state[key] = value;
    state[`@${key}`] = {
      component: "colorpicker",
    };
  }

  const isPixelPattern = /px/;
  const isPixelSize = isPixelPattern.test(value);
  if (isPixelSize) {
    state[key] = parseInt(value);
    state[`@${key}`] = {
      unit: "px",
    };
  }
  const isNumeric = !isNaN(parseInt(value));
  if (isNumeric) {
    state[key] = parseInt(value);
  } else {
    state[key] = value;
  }
});

const potzblitz = new Potzblitz(state);
variables.map((key) => {
  potzblitz.onChange(key, () => {
    const value = potzblitz.state[key];
    const unit = potzblitz.state[`@${key}`]?.unit;
    console.group(key);
    console.log(key, value);
    console.groupEnd();
    if (unit !== undefined) {
      document.documentElement.style.setProperty(key, `${value}${unit}`);
    } else {
      document.documentElement.style.setProperty(key, value);
    }
  });
});
