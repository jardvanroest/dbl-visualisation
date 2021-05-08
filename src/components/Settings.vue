<template>
  <div class="container">
    <div>
      <SettingType text="Global" />
      <SettingType text="Vis1" />
      <SettingType text="Vis2" />
    </div>
    <Inspector />
  </div>
</template>

<script>
import Inspector from "@/components/Inspector.vue";
import SettingType from "@/components/SettingType.vue";

export default {
  name: "Settings",
  components: {
    Inspector,
    SettingType,
  },
};
</script>
