import { themes } from "@storybook/theming";

const preview = {
  parameters: {
    darkMode: { current: "dark" },
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
