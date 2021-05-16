export default {
  saveData(context, data) {
    data.forEach((entry) => {
      const email = {
        date: Date.parse(entry.date),
        fromId: parseInt(entry.fromId),
        toId: parseInt(entry.toId),
        messageType: entry.messageType,
        sentiment: parseFloat(entry.sentiment),
      };

      const sendingPerson = {
        id: parseInt(entry.fromId),
        emailAddress: entry.fromEmail,
        jobTitle: entry.fromJobtitle,
        sendEmails: [],
        receivedEmails: [],
        isSelectedInEmailFilter: false,
      };

      const receivingPerson = {
        id: parseInt(entry.toId),
        emailAddress: entry.toEmail,
        jobTitle: entry.toJobtitle,
        sendEmails: [],
        receivedEmails: [],
        isSelectedInEmailFilter: false,
      };

      context.commit("addPerson", sendingPerson);
      context.commit("addPerson", receivingPerson);
      context.commit("addEmail", email);
      context.commit("addSendEmailToPerson", { id: email.fromId, email });
      context.commit("addReceivedEmailToPerson", { id: email.toId, email });
    });
  },
  setFilteredInPersons(context, persons) {
    context.commit("setFilteredInPersons", persons);
  },
};
