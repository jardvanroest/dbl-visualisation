import axios from "axios";

import { Email, SendingPerson, ReceivingPerson } from "./dataStructures.js";

export default {
  changeInspectorData(context, newData) {
    context.commit("newInspectorData", newData);
  },

  saveData(context, { data: data, isDefault: isDefault }) {
    if (!isDefault) {
      // upload dataset if it is not default
      postDataToBackend(data, context);
    }

    context.commit("removeCurrentDataset"); // there might already be a dataset loaded

    data.forEach((entry) => {
      const email = new Email(entry);
      const sendingPerson = new SendingPerson(entry);
      const receivingPerson = new ReceivingPerson(entry);

      context.commit("addPerson", sendingPerson);
      context.commit("addPerson", receivingPerson);
      context.commit("addEmail", email);
    });
  },
  setFilteredPersons(context, persons) {
    context.commit("setFilteredPersons", persons);
  },
};

function postDataToBackend(data, context) {
  console.log("Sending POST request to backend...");
  axios({
    method: "post",
    url: "http://localhost:5000/datasets",
    data: data,
  }).then(
    (response) => {
      console.log("response.data: " + response.data);
      context.commit("updateDatasetID", response.data);
    },
    (error) => {
      console.log(error);
    }
  );
}
