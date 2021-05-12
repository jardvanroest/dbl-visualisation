<template>
  <div class="container">
    <div>
      <SettingType text="Global">
        <Setting name="Filter e-mail">
          <EmailFilter />
        </Setting>
      </SettingType>
      <SettingType text="Vis1" />
      <SettingType text="Vis2" />
    </div>
    <Inspector />
  </div>
</template>

<script>
import Inspector from "@/components/Inspector.vue";
import SettingType from "@/components/SettingType.vue";
import Setting from "@/components/Setting.vue";
import EmailFilter from "@/components/EmailFilter.vue";

export default {
  name: "Settings",
  components: {
    Inspector,
    SettingType,
    Setting,
    EmailFilter,
  },
};
</script>
