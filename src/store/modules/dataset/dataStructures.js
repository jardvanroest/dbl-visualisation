class Email {
  constructor(emailData) {
    this.date = Date.parse(emailData.date);
    this.fromId = parseInt(emailData.fromId);
    this.toId = parseInt(emailData.toId);
    this.messageType = emailData.messageType;
    this.sentiment = parseFloat(emailData.sentiment);
  }
}

class Person {
  constructor() {
    this.sendEmails = [];
    this.receivedEmails = [];
    this.isSelectedInEmailFilter = true;
  }
}

class SendingPerson extends Person {
  constructor(personData) {
    super();
    this.id = parseInt(personData.fromId);
    this.emailAddress = personData.fromEmail;
    this.jobTitle = personData.fromJobtitle;
  }
}

class ReceivingPerson extends Person {
  constructor(personData) {
    super();
    this.id = parseInt(personData.toId);
    this.emailAddress = personData.toEmail;
    this.jobTitle = personData.toJobtitle;
  }
}

export { Email, SendingPerson, ReceivingPerson };
