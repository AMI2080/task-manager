<template>
  <div class="container">
    <div class="task-list mx-auto">
      <edit-task />
      <v-divider />
      <div v-if="tasks.length === 0" class="text-center">
        <emoji-broken-heart width="128" height="128" />
        <h2>لا يوجد مهام</h2>
        <p>أنشئ أول مهمة و ضاعف إنتاجيتك.</p>
      </div>
      <task-item v-for="task of tasks" :task="task" :key="task.id" />
    </div>
  </div>
</template>

<script lang="ts">
import { TaskStatus, type Task } from "@/types";
import { defineComponent } from "vue";
import TaskItem from "./TaskItem.vue";
import EditTask from "./EditTask.vue";
import EmojiBrokenHeart from "@/assets/icons/EmojiBrokenHeart.vue";

export default defineComponent({
  name: "TaskList",
  components: { TaskItem, EditTask, EmojiBrokenHeart },
  data() {
    return {
      tasks: [
        {
          id: 1,
          order: 1,
          priority: 1,
          title: "تأكيد حجز الجلسة",
          comment: "جلسة العلاج الطبيعي",
          deadline: new Date(),
          status: TaskStatus.DONE,
        },
        {
          id: 6,
          order: 1,
          priority: 2,
          title: "الإتصال بالمحاسب",
          deadline: new Date(),
          status: TaskStatus.TODO,
        },
        {
          id: 5,
          order: 1,
          priority: 3,
          title: "تسليم نماذج",
          deadline: new Date(),
          status: TaskStatus.IN_PROGRESS,
        },
      ] as Task[],
    };
  },
});
</script>

<style lang="scss">
.container {
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

  .task-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
    width: 100%;
    overflow-y: auto;
    padding: 10px;
    padding-inline-end: 5px;

    &::-webkit-scrollbar {
      width: 5px;
    }

    &::-webkit-scrollbar-track {
      background: #b3e5fc33;
      background: linear-gradient(
        to bottom,
        transparent,
        transparent 10px,
        #b3e5fc 10px,
        #b3e5fc calc(100% - 10px),
        transparent calc(100% - 10px),
        transparent
      );
    }

    &::-webkit-scrollbar-thumb {
      background: #b3e5fc55;
      background: linear-gradient(
        to bottom,
        transparent,
        transparent 10px,
        #4fc3f7 10px,
        #4fc3f7 calc(100% - 10px),
        transparent calc(100% - 10px),
        transparent
      );

      &:hover {
        background: #b3e5fc;
        background: linear-gradient(
          to bottom,
          transparent,
          transparent 10px,
          #039be5 10px,
          #039be5 calc(100% - 10px),
          transparent calc(100% - 10px),
          transparent
        );
      }
    }

    .v-btn {
      text-transform: unset;
    }
  }
}
</style>
