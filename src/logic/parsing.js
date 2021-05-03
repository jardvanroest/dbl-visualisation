export function parseFile(file) {
  return new Promise((resolve, reject) => {
    const reader = createFileReader(file);

    reader.onload = () => {
      const text = reader.result;
      const arrayOfObjects = convertToArrayOfObjects(text);
      resolve(arrayOfObjects);
    };

    reader.onerror = () => {
      const error = reader.error;
      reject(error);
    };
  });
}

function createFileReader(file) {
  const reader = new FileReader();
  reader.readAsText(file, "UTF-8");
  return reader;
}

function convertToArrayOfObjects(text) {
  let lines = splitIntoLines(text);
  let columnNames = getColumnNames(lines);

  let array = [];

  lines.slice(1).forEach((line) => {
    const object = convertLineToObject(line, columnNames);
    array.push(object);
  });

  return array;
}

function splitIntoLines(text) {
  return text.split("\n");
}

function getColumnNames(rows) {
  return rows[0].split(",");
}

function convertLineToObject(line, columnNames) {
  const entries = line.split(",");
  const object = {};

  entries.forEach((entry, i) => {
    object[columnNames[i]] = entry;
  });

  return object;
}
