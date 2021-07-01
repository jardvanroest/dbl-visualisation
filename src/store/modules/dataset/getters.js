import { getSampleVariance } from "../../../logic/componentsLogic";
import {
  passesDateFilter,
  passesJobTitleFilter,
  passesEmailFilter,
} from "./filtering";

export default {
  emails(state) {
    return state.emails;
  },
  filteredEmails(state, getters) {
    const filteredEmailAddresses = getters.filteredEmailAddresses;
    const filteredJobTitles = getters.filteredJobTitles;
    const filteredDates = getters.filteredDates;

    return getters.emails.filter((email) => {
      return (
        passesEmailFilter(email, filteredEmailAddresses) &&
        passesJobTitleFilter(email, filteredJobTitles) &&
        passesDateFilter(email, filteredDates)
      );
    });
  },
  filteredEmailAddresses(state) {
    return state.filteredPersons.map((person) => person.emailAddress);
  },
  filteredJobTitles(state) {
    return state.filteredJobTitles;
  },
  filteredDates(state) {
    return state.filteredDates;
  },
  persons(state) {
    return Object.values(state.persons);
  },
  numberOfPersons(state, getters) {
    return getters.persons.length;
  },
  thereAreAddressesSelectedInTheEmailFilter(state) {
    return state.filteredPersons.length > 0;
  },
  getInspectorData(state) {
    return state.inspectorData;
  },
  getSortedMatrixData(state) {
    return state.sortedMatrixData;
  },
  getMatrixDataForSorting(state) {
    return state.matrixData;
  },
  jobTitles(state) {
    return state.jobTitles;
  },
  getDatasetID(state) {
    return state.datasetID;
  },
  // this function is a workaround needed for Popup.vue
  getDatasetLink(state) {
    return (
      "http://" +
      process.env.VUE_APP_SERVER_IP +
      ":8080/download?id=" +
      state.datasetID
    );
  },
  minDate(state) {
    return state.minDate;
  },
  maxDate(state) {
    return state.maxDate;
  },
  maxEmailsDay(state) {
    return state.maxEmailsDay_Filtered;
  },
  meanSentiment(state) {
    return state.meanSentiment_Filtered;
  },
  sampleVarianceSentiment(state) {
    return state.sampleVarianceSentiment_Filtered;
  },
};
