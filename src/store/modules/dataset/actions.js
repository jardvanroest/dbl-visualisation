import { Email, SendingPerson, ReceivingPerson } from "./dataStructures.js";

export default {
  saveData(context, data) {
    context.commit("removeCurrentDataset"); // there might already be a dataset loaded, that needs to be cleared

    data.forEach((entry) => {
      const email = new Email(entry);
      const sendingPerson = new SendingPerson(entry);
      const receivingPerson = new ReceivingPerson(entry);

      context.commit("addPerson", sendingPerson);
      context.commit("addPerson", receivingPerson);
      context.commit("addEmail", email);
    });
  },
  setFilteredInPersons(context, persons) {
    context.commit("setFilteredInPersons", persons);
  },
};
