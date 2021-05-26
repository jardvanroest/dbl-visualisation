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
  saveData(context, data) {
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
