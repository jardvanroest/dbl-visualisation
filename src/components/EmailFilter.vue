<template>
  <div v-for="person in persons" :key="person.id" class="selectable-email">
    <input type="checkbox" name="checkbox-item" v-model="person.isSelected" />
    <label class="email-adress" for="checkbox-item">{{
      person.emailAddress
    }}</label>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["persons"]),
  },
};
</script>

<style>
label {
  margin-left: 5px;
}

.selectable-email {
  margin-bottom: 3px;
}
</style>
