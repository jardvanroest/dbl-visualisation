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
    passesLowerBound(date, filteredDates.from) &&
    passesUpperBound(date, filteredDates.to)
  );
}

function passesLowerBound(date, minDate) {
  if (!isValidDate(minDate)) return true;
  return date.getTime() >= minDate.getTime();
}

function passesUpperBound(date, maxDate) {
  if (!isValidDate(maxDate)) return true;
  return date.getTime() <= maxDate.getTime();
}

function isValidDate(date) {
  return date && !isNaN(date.getTime());
}

export { passesEmailFilter, passesJobTitleFilter, passesDateFilter };
