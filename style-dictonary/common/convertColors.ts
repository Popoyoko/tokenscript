import chroma from "chroma-js";

const toFlutter = (tokenValue) => {
  let newString = chroma(tokenValue).toString().replace("#", "");
  newString = newString.toUpperCase();
  if (newString.length === 8) {
    return `Color(0x${newString})`;
  } else {
    return `Color(0xFF${newString})`;
  }
};

const colorsMap = (colors) => {
  let mappedColors = "";
  colors.forEach((color) => {
    mappedColors = mappedColors + toFlutter(color) + ",";
  });
  return mappedColors.slice(0, -1);
};

const convertFlutterGradient = (tokenValue) => {
  const begin = "Alignment(-1,-1)";
  const end = "Alignment(1,1)";
  const colors = ["#eaf", "#ae55ea"];
  colorsMap(["#eaf", "#afe"]);
  return `Gradient.linear(begin: ${begin}, end: ${end}, colors: <Color> [${colorsMap(
    colors
  )}], tileMode: TileMode.clamp)`;
};

const convertColors = (platform: "web" | "app" = "web", tokenValue) => {
  if (tokenValue.startsWith("linear-gradient")) {
    if (platform === "app") {
      return `${convertFlutterGradient(
        tokenValue
      )} // Currently not fully supporting graident for app`;
    } else {
      return tokenValue;
    }
  } else if (tokenValue.toLowerCase() === "transparent") {
    if (platform === "app") {
      return `Color(0x00000000)`;
    } else {
      return tokenValue.toLowerCase();
    }
  } else {
    if (platform === "app") {
      return toFlutter(tokenValue);
    } else {
      return chroma(tokenValue).toString();
    }
  }
};

export default convertColors;
