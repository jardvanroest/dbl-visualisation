function openFileSelector() {
  this.$refs.fileInput.click();
}

function importFile(event) {
  const file = event.target.files[0];
  if (!this.acceptableFormats.includes(file.type)) {
    throw "file not supported"; //throw err
  }
  this.isActive = true;

  const reader = new FileReader();
  reader.readAsText(file, "UTF-8");

  reader.onload = (evt) => {
    this.isActive = true;
    this.saveData(evt.target.result).catch((e) => {
      console.log(e);
    });
    this.isActive = false;
  };
  reader.onerror = (evt) => {
    console.error(evt);
    this.isActive = false;
  };
}

function saveData(data) {
  this.$store.state.tables.push(this.returnTable_JSON(data));
  this.percent = 0;
}

function returnTable_JSON(txt) {
  let arr_all = txt.split("\n");
  let keys = arr_all[0].split(","); //colums names
  keys.map((k) => k.trim()); //column names
  let objects = [];
  for (let i = 1; i < arr_all.length; i++) {
    let data = arr_all[i].split(",");
    let obj = {};
    for (let j = 0; j < data.length; j++) {
      obj[keys[j]] = data[j].trim();
    }
    objects.push(obj);
  }
  return objects;
}
