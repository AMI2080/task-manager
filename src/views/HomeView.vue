<script lang="ts">
import TaskList from "@/components/TaskList.vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "HomeView",
  components: { TaskList },
});
</script>

<template>
  <main>
    <h1>مدير المهام</h1>
    <task-list />
  </main>
</template>

<style lang="scss" scoped>
main {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: #fff;

  h1 {
    background-color: #00dffc;
    color: #343838;
    margin: 0;
    padding-block: 48px 72px;
    padding-inline: max(12px, calc((100% - 800px) / 2));
    text-align: center;
  }
}
</style>
