import { defineFlatConfig } from "html-validate";
import { recommended } from "html-validate/presets";

export default defineFlatConfig([
  {
    files: ["*.html"],
    ...recommended,
    rules: {
      "attr-case": "off",
      "void-style": "off",
      "element-permitted-content": "off",
      "no-autoplay": "off",
      "no-conditional-comment": "off",
      "no-inline-style": "off",
      "no-trailing-whitespace": "off",
      "no-implicit-button-type": "off",
      "prefer-native-element": [
        "error",
        {
          exclude: ["button"],
        },
      ],
    },
  },
  // Temporarily disable failing rules due to Expressive Code HTML violations
  // https://github.com/expressive-code/expressive-code/issues/423
  {
    files: ["design-outside-the-computer.html"],
    rules: {
      "no-implicit-button-type": "off",
      "text-content": "off",
    },
  },
]);
