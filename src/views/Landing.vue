<template>
  <div class="home">
    <div class="centered-container">
      <h1 class="title">MailVis</h1>
      <p class="introduction">
        A tool to analyze e-mail traffic. You can import your own dataset or
        view an example.
      </p>
      <ImportDataSetBtn />
      <ViewExampleDataSetBtn />
    </div>
  </div>
</template>

<script>
import ImportDataSetBtn from "@/components/ImportDataSetBtn.vue";
import ViewExampleDataSetBtn from "@/components/ViewExampleDataSetBtn.vue";

export default {
  name: "Landing",
  components: {
    ImportDataSetBtn,
    ViewExampleDataSetBtn,
  },
};
</script>

<style scoped lang="scss">
.centered-container {
  width: 17.5rem;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
}

.title {
  font-family: "Roboto", sans-serif;
  font-size: 3rem;
  margin-bottom: 1rem;
  letter-spacing: 0.05em;
}

.introduction {
  color: rgb(95, 95, 95);
  margin: 1rem 0 1.25rem 0;
}
</style>
