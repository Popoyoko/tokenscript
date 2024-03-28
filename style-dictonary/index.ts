import StyleDictionary from "style-dictionary";
import { registerTransforms } from "@tokens-studio/sd-transforms";
import getAllThemes from "./common/getAllThemes";
import semanticColorsAttributes from "./transforms";
import initializeCustomFormats from "./formats";

registerTransforms(StyleDictionary);
initializeCustomFormats();
semanticColorsAttributes();

const buildTokens = async () => {
  const buildPath = "build";
  const basePath = "tokens";
  const themes = await getAllThemes(basePath);

  const baseConfig = (
    themeName: string,
    modeName: string | undefined = undefined
  ) => {
    const genericTokens = `${basePath}/*.json`;
    const brandings = `${basePath}/Branding/**.json`;
    const semantics = `${basePath}/Semantics/**.json`;
    const coreSemantics = `${basePath}/Semantics/ConnectPro/Core.json`;
    const fileName = (type: "color" | "size" | undefined) => {
      if (modeName) {
        if (type === "color") {
          return `Color${themeName}${modeName}`;
        } else if (type === "size") {
          return `Sizes${themeName}`;
        } else {
          return `${themeName}${modeName}`;
        }
      }
      return themeName;
    };
    return {
      source: [genericTokens, semantics, coreSemantics, brandings],
      platforms: {
        figma: {
          transforms: ["name/cti/pascal"],
          buildPath: `${buildPath}/Figma/`,
          files: [
            {
              destination: `${fileName("size")}.json`,
              format: "Figma/sizes/json",
            },
          ],
        },
        webColors: {
          transforms: ["name/cti/pascal", "attribute/semantic/colors"],
          buildPath: `${buildPath}/web/`,
          files: [
            {
              destination: `${fileName("color")}.ts`,
              format: "web/colors/mui",
            },
          ],
        },
        webSizes: {
          transforms: ["name/cti/pascal", "attribute/semantic/colors"],
          buildPath: `${buildPath}/web/`,
          files: [
            {
              destination: `${fileName("size")}.ts`,
              format: "web/sizes/mui",
            },
          ],
        },
        flutterColors: {
          transforms: ["name/cti/pascal", "attribute/semantic/colors"],
          buildPath: `${buildPath}/app/`,
          files: [
            {
              destination: `${fileName("color")}.dart`,
              format: "app/colors/material",
            },
          ],
        },
        flutterSizes: {
          transforms: ["name/cti/pascal", "attribute/semantic/colors"],
          buildPath: `${buildPath}/app/`,
          files: [
            {
              destination: `${fileName("size")}.dart`,
              format: "app/sizes/material",
            },
          ],
        },
      },
    };
  };

  const configs = themes.map(theme => baseConfig(theme.name));

  configs.forEach((config) => {
    const sd = StyleDictionary.extend(config);
    sd.cleanAllPlatforms();
    sd.buildAllPlatforms();
  });
};

export default buildTokens;
