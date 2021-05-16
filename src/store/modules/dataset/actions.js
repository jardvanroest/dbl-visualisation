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
      };

      const receivingPerson = {
        id: parseInt(entry.toId),
        emailAddress: entry.toEmail,
        jobTitle: entry.toJobTitle,
        sendEmails: [],
        receivedEmails: [],
      };

      context.commit("addPerson", sendingPerson);
      context.commit("addPerson", receivingPerson);
      context.commit("addEmail", email);
    });
  },
};
