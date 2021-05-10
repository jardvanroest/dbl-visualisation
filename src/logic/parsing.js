export function parseFile(file) {
  return new Promise((resolve, reject) => {
    const reader = readFile(file);

    reader.onload = () => {
      const text = reader.result;
      const arrayOfObjects = parseString(text);
      resolve(arrayOfObjects);
    };

    reader.onerror = () => reject(reader.error);
  });
}

function readFile(file) {
  const reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  return reader;
}

export function parseString(text) {
  const lines = splitIntoLines(text);
  const columnNames = splitIntoItems(lines[0]);

  const array = [];

  lines.slice(1).forEach((line) => {
    const object = convertLineToObject(line, columnNames);
    array.push(object);
  });

  return array;
}

function splitIntoLines(text) {
  const lines = text.split("\n");
  lines.pop(); // split causes last item to be an empty string
  return lines;
}

function convertLineToObject(line, columnNames) {
  const items = splitIntoItems(line);
  const object = {};

  items.forEach((item, i) => {
    object[columnNames[i]] = item;
  });

  return object;
}

function splitIntoItems(line) {
  return line.split(",").map((item) => item.trim());
}
