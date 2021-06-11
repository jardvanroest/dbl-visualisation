function passesEmailFilter(email, filteredEmailAddresses) {
  return (
    filteredEmailAddresses.includes(email.fromEmail) ||
    filteredEmailAddresses.includes(email.toEmail) ||
    filteredEmailAddresses.length === 0
  );
}

function passesJobTitleFilter(email, filteredJobTitles) {
  return (
    filteredJobTitles.includes(email.fromJobTitle) ||
    filteredJobTitles.includes(email.toJobTitle) ||
    filteredJobTitles.length === 0
  );
}

function passesDateFilter(email, filteredDates) {
  const date = email.date;

  return (
    (filteredDates.from === undefined ||
      date.getTime() >= filteredDates.from.getTime()) &&
    (filteredDates.to === undefined ||
      date.getTime() <= filteredDates.to.getTime())
  );
}

export { passesEmailFilter, passesJobTitleFilter, passesDateFilter };
