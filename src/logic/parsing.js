import { displayPartsToString } from "typescript";

export function readFile(file) { 
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");

    reader.onload = (evt) => {
        this.saveData(evt.target.result).catch((e) => {
          console.log(e);
        });
    };
    reader.onerror = (evt) => {
        console.error(evt);
    };
};

function validateFiles(type) {
    if (!this.acceptableFormats.includes(type)) {
        throw new Error('format not supported');
    }
}