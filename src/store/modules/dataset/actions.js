export default {
  saveData(context, data) {
    data.forEach((entry) => {
      const email = {
        date: entry.date,
        fromId: entry.fromId,
        toId: entry.toId,
        messageType: entry.messageType,
        sentiment: entry.sentiment,
      };

      const sendingPerson = {
        id: entry.fromId,
        emailAddress: entry.fromEmail,
        jobTitle: entry.fromJobtitle,
      };

      const receivingPerson = {
        id: entry.toId,
        emailAddress: entry.toEmail,
        jobTitle: entry.toJobTitle,
      };

      context.commit("addEmail", email);
      context.commit("addPerson", sendingPerson);
      context.commit("addPerson", receivingPerson);
    });
  },
};
