<template>
  <div class="task-list mx-auto">
    <edit-task />
    <v-divider />
    <ul>
      <li v-for="task of tasks" :key="task.id">
        {{ task.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import type { Task } from "@/types";
import { defineComponent } from "vue";
import EditTask from "./EditTask.vue";

export default defineComponent({
  name: "TaskList",
  components: { EditTask },
  data() {
    return {
      tasks: [
        {
          id: 1,
          order: 1,
          priority: 1,
          title: "تأكيد حجز الجلسة",
          comment: "جلسة العلاج الطبيعي",
          isDone: true,
          deadline: new Date(),
        },
        {
          id: 6,
          order: 1,
          priority: 2,
          title: "الإتصال بالمحاسب",
          deadline: new Date(),
        },
        {
          id: 5,
          order: 1,
          priority: 3,
          title: "تسليم نماذج",
          deadline: new Date(),
        },
      ] as Task[],
    };
  },
});
</script>

<style lang="scss">
.task-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  margin-inline: auto;
  margin-top: -48px;
  margin-bottom: 24px;
  width: 100%;
  max-width: min(calc(100% - 24px), 800px);
  background-color: #fff;
  border-radius: 12px;
  padding: 8px;
  border: 2px solid #008c9e;
  overflow-y: auto;

  .v-btn {
    text-transform: unset;
  }
}
</style>
