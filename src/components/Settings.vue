<template>
  <div class="container">
    <div class="selected_setting_type">
      <SettingType text="Global" />
      <SettingType text="Vis1" class="unselected" />
      <SettingType text="Vis2" class="unselected" />
    </div>
    <ToolTips />
  </div>
</template>

<script>
import ToolTips from "@/components/ToolTips.vue";
import SettingType from "@/components/SettingType.vue";

export default {
  name: "Settings",
  components: {
    ToolTips,
    SettingType,
  },
};
</script>
