const StyleDictionaryPackage = require('style-dictionary');


function getStyleDictionaryConfig(brand, platform) {
    return {
        "source": [
            `tokens-dictionary/Branding/${brand}/*.json`,
            "tokens-dictionary/*.json",
            `tokens-dictionary/Semantics/${semantics}/*.json`
        ],
        "platforms": {
    
        }
    };
}