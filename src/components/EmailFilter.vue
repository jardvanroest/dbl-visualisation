<template>
  <div v-for="person in persons" :key="person.id" class="selectable-email">
    <input type="checkbox" name="checkbox-item" v-model="person.checked" />
    <label class="email-adress" for="checkbox-item">{{ person.email }}</label>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";

export default {
  data() {
    return {
      persons: [
        {
          id: 1,
          email: "matthew.lenhart@enron.com",
          checked: true,
        },
        {
          id: 2,
          email: "danny.mccarty@enron.com",
          checked: false,
        },
        {
          id: 3,
          email: "chris.germany@enron.com",
          checked: false,
        },
        {
          id: 4,
          email: "phillip.k.ellen@enron.com",
          checked: true,
        },
        {
          id: 5,
          email: "elizabeth.sager@enron.com",
          checked: false,
        },
      ],
    };
  },
  //   computed: {
  //     ...mapGetters["persons"],
  //   },
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
