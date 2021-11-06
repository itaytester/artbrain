function textCheck(text) {
  let newText = text;
  let temp = newText.toLowerCase();
  if (temp.includes("sale")) {
    newText = newText.concat("!");
  }
  temp = newText.toLowerCase();
  if (temp.includes("new")) {
    newText = "~~".concat(newText);
  }
  temp = newText.toLowerCase();
  if (temp.includes("limited edition")) {
    const start = temp.indexOf("limited edition");
    const firstHalf = newText.substring(0, start);
    const lastHalf = newText.substring(start + 15, newText.length);
    newText = `${firstHalf}LIMITED EDITION${lastHalf}`;
  }
  return newText;
}

module.exports = textCheck;
