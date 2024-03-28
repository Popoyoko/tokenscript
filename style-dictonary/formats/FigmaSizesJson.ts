import StyleDictionary from "style-dictionary";

const FigmaSizes = () =>
  StyleDictionary.registerFormat({
    name: "Figma/sizes/json",
    formatter: ({ dictionary, file }) => {
      const encapsule = (tokens) => {
        return `${tokens}`;
      };

      const filteredTokens = () => {
        let result = {};

        const processToken = (token, obj) => {
          const key = token.path.shift();

          if (!obj[key]) {
            obj[key] = {};
          }

          if (token.path.length === 0) {
            obj[key] = token.value;
          } else {
            processToken(token, obj[key]);
          }
        };

        dictionary.allTokens
          .filter((token) => token.path[0] === "Sizes")
          .map((token) => {
            const tokenCopy = { ...token };
            tokenCopy.path.shift();
            return tokenCopy;
          })
          .forEach((token) => processToken(token, result));

        return JSON.stringify(result, null, 2);
      };

      return encapsule(filteredTokens());
    },
  });

export default FigmaSizes;
