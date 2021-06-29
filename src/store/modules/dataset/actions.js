import axios from "axios";

import { Email, SendingPerson, ReceivingPerson } from "./dataStructures.js";

export default {
  changeInspectorData(context, newData) {
    context.commit("newInspectorData", newData);
  },
  changeSortedMatrixData(context, newData) {
    context.commit("newSortedMatrixData", newData);
  },
  changeMatrixData(context, newData) {
    context.commit("newMatrixData", newData);
  },
  saveData(context, { data: data, isDefault: isDefault }) {
    if (!isDefault) {
      // upload dataset if it is not default
      postDataToBackend(data, context);
    } else {
      context.commit("updateDatasetID", "default");
    }

    context.commit("removeCurrentDataset"); // there might already be a dataset loaded

    data.forEach((entry) => {
      const email = new Email(entry);
      const sendingPerson = new SendingPerson(entry);
      const receivingPerson = new ReceivingPerson(entry);

      context.commit("addPerson", sendingPerson);
      context.commit("addPerson", receivingPerson);
      context.commit("addEmail", email);
      context.commit("addJobtitle", sendingPerson.jobTitle);
      context.commit("addJobtitle", receivingPerson.jobTitle);
      context.commit("updateMinMaxDates", email.date);
    });
    context.commit("setFilteredDatesToMinMax");
  },
  setFilteredPersons(context, persons) {
    context.commit("setFilteredPersons", persons);
  },
  setFilteredJobTitles(context, jobTitles) {
    context.commit("setFilteredJobTitles", jobTitles);
  },
  setFilteredDates(context, payload) {
    context.commit("setFilteredDates", payload);
  },
};

function postDataToBackend(data, context) {
  axios({
    method: "post",
    url: "http://" + process.env.VUE_APP_SERVER_IP + ":5000/datasets",
    data: data,
  }).then(
    (response) => {
      context.commit("updateDatasetID", response.data);
    },
    (error) => {
      console.log(error);
    }
  );
}
