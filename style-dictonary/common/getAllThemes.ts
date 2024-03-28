import { readdir } from "fs/promises";

const getAllThemes = async (basePath) => {
  const files = await readdir(`${basePath}/Semantics`);

  const themes = files.map(file => {
    const themeName = file.replace('.json', '');
    return {
      name: themeName,
    };
  });

  return themes;
};

export default getAllThemes;
