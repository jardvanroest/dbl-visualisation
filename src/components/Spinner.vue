<template>
  <div v-if="show" class="spinner-container" :style="{ '--offset': offset }">
    <div class="spinner no_highlight" />
  </div>
</template>

<script>
export default {
  name: "Spinner",
  props: ["offset", "show"],
};
</script>

<style scoped lang="scss">
.spinner-container {
  --offset: 0;
  position: absolute;
  display: flex;
  width: calc(100% - var(--offset));
  height: calc(100% - var(--offset));
  background-color: rgba(0, 0, 0, 0);

  justify-content: center;
}

.spinner {
  --ldr-size: 0.4em;
  --dimensions: calc(8 * var(--ldr-size));

  margin: auto;
  transform: translate(-50%, -50%);

  width: var(--dimensions);
  height: var(--dimensions);

  border: var(--ldr-size) solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: var(--ldr-size) solid var(--accent-color);

  -webkit-animation: spin 2s linear infinite; /* Safari */
  animation: spin 2s linear infinite;
}

/* Safari */
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
