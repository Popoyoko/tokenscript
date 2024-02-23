import StyleDictionary, { tokens } from "style-dictionary";
import { registerTransforms } from "@tokens-studio/sd-transforms";

registerTransforms(StyleDictionary);

const buildTokens = async () => {
  const buildPath = "build";
  const basePath = "tokens";
  const genericTokens = `${basePath}/*.json`;
  const brandings = `${basePath}/Branding/**.json`;
  const semantics = `${basePath}/Semantics/Popoyoko.json`;
  const config = {
    source: ["tokens/Tools.json", brandings],
    platforms: {
      js: {
        transformGroup: "js",
        buildPath: `${buildPath}/js/`,
        files: [
          {
            destination: "variables.js",
            format: "javascript/object",
          },
        ],
      },
    },
  };

  const sd = StyleDictionary.extend(config);
  sd.cleanAllPlatforms();
  sd.buildAllPlatforms();
};

export default buildTokens;