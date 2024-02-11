import * as fs from 'fs';
import { AnyTokenSet } from '@tokens-studio/types';

const filterColors = (data: any): any => {
  if (data && typeof data === 'object') { //data est-il un object
    if (data.type === 'color') {
      // si le type est color = objet vide
      return {};
    } else {
      // applique la fonction de manière récursive, permet de traiter chaque niveau de l'objet
      const result: any = {};
      for (const key in data) {
        result[key] = filterColors(data[key]);
      }
      return result;
    }
  } else {
    // si data n'est pas un objet, renvoie la valeur de data
    return data;
  }
}

const variablesFolderPath = 'variables';
if (!fs.existsSync(variablesFolderPath)) {
  fs.mkdirSync(variablesFolderPath);
}

const stylesFolderPath = 'styles';
if (!fs.existsSync(stylesFolderPath)) {
  fs.mkdirSync(stylesFolderPath);
}

// Lit token.json et le parse en un objet JS
const tokenFilePath = 'tokens.json';
const tokenData: AnyTokenSet = JSON.parse(fs.readFileSync(tokenFilePath, 'utf-8'));

// Appel de la fonction 
const filteredTokenData = filterColors(tokenData);


// Écrit le nouvel objet filtré variables.json
const variablesFilePath = 'variables/tokens.json';
fs.writeFileSync(variablesFilePath, JSON.stringify(filteredTokenData, null, 2));

// Copier le fichier token.json dans styles/token.json
fs.copyFileSync(tokenFilePath, variablesFilePath);

console.log('Script executed successfully!');
