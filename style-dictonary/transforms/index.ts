import StyleDictionary from "style-dictionary";

const semanticColorsAttributes = () => {
  StyleDictionary.registerTransform({
    name: "attribute/semantic/colors",
    type: "attribute",
    matcher: (token) => token.type === "color",
    transformer: (token) => {
      const attrNames = ["type", "semantic", "state"];
      const originalAttrs = token.attributes || {};
      const generatedAttrs = {};

      for (let i = 0; i < token.path.length && i < attrNames.length; i++) {
        generatedAttrs[attrNames[i]] = token.path[i];
      }

      return Object.assign(generatedAttrs, originalAttrs);
    },
  });
};

export default semanticColorsAttributes;
