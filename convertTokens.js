"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
function filterColors(data) {
    if (data && typeof data === 'object') {
        if (data.type === 'color') {
            // If the type is color, return an empty object
            return {};
        }
        else {
            // Recursively filter color types from nested objects
            var result = {};
            for (var key in data) {
                result[key] = filterColors(data[key]);
            }
            return result;
        }
    }
    else {
        // For non-object values, return the value as is
        return data;
    }
}
// Read the token.json file
var tokenFilePath = 'token.json';
var tokenData = JSON.parse(fs.readFileSync(tokenFilePath, 'utf-8'));
// Filter out color types
var filteredTokenData = filterColors(tokenData);
// Write the filtered data to variables.json
var variablesFilePath = 'variables.json';
fs.writeFileSync(variablesFilePath, JSON.stringify(filteredTokenData, null, 2));
console.log('Script executed successfully!');
