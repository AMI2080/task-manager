<template>
  <v-list-item
    class="task-item"
    :class="{
      done: task.status === TaskStatus.DONE,
      'in-progress': task.status === TaskStatus.IN_PROGRESS,
    }"
  >
    <template v-slot:prepend>
      <v-list-item-action start>
        <v-checkbox-btn
          :color="task.status === TaskStatus.TODO ? 'default' : 'success'"
          v-model="task.status"
          :value="TaskStatus.DONE"
          @change="setIsDone()"
        />
      </v-list-item-action>
    </template>
    <v-list-item-title
      :class="{ 'line-through': task.status === TaskStatus.DONE }"
    >
      <v-icon
        :color="
          task.priority === TaskPriority.HEIGH
            ? 'error'
            : task.priority === TaskPriority.MEDIUM
            ? 'warning'
            : 'success'
        "
        icon="mdi-circle-medium"
      />
      {{ task.title }}
    </v-list-item-title>
    <v-list-item-subtitle class="ps-6">
      {{ task.comment }}
    </v-list-item-subtitle>
    <template v-slot:append>
      <v-list-item-action start>
        <v-btn
          icon="mdi-lead-pencil"
          variant="text"
          size="small"
          class="me-3"
          @click.stop.prevent="showEditDialog = true"
        />
        <v-btn
          icon="mdi-trash-can-outline"
          variant="text"
          size="small"
          color="error"
          @click.stop.prevent="showDeleteDialog = true"
        />
      </v-list-item-action>
    </template>
    <v-dialog
      v-model="showEditDialog"
      transition="dialog-top-transition"
      width="700"
    >
      <v-card>
        <v-card-text>
          <edit-task :task="task" />
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="showDeleteDialog"
      transition="dialog-top-transition"
      width="auto"
    >
      <v-card>
        <v-card-title>
          <v-icon color="error" icon="mdi-information-outline" />
          تحذير
        </v-card-title>
        <v-card-text>
          سيتم حذف المهمة و لن تستطيع إسترجاعها لاحقاً.
        </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn
            text="تراجع"
            variant="outlined"
            color="primary"
            @click="showDeleteDialog = false"
          />
          <v-btn
            text="تأكيد الحذف"
            variant="tonal"
            color="error"
            @click="deleteItem()"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-list-item>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import { TaskPriority, TaskStatus, type Task } from "@/types";
import EditTask from "./EditTask.vue";

export default defineComponent({
  name: "TaskItem",
  components: { EditTask },
  props: {
    task: {
      type: Object as PropType<Task>,
      required: true,
    },
  },
  data() {
    return {
      TaskPriority,
      TaskStatus,
      showEditDialog: false as boolean,
      showDeleteDialog: false as boolean,
    };
  },
  methods: {
    editItem(): void {
      console.log("edit", this.task);
    },
    setIsDone(): void {
      if (!this.task.status) {
        this.task.status = TaskStatus.TODO;
        console.log("set as todo");
      } else {
        console.log("set as done");
      }
    },
    deleteItem(): void {
      console.log("delete", this.task);
    },
  },
});
</script>

<style lang="scss" scoped>
.task-item {
  padding: 8px;
  border-radius: 8px !important;
  background-color: #cfd8dc;

  &.in-progress {
    background-color: #FFF9C4;
  }

  &.done {
    background-color: #c8e6c9;
  }

  .v-list-item-title {
    font-weight: 700;

    &.line-through {
      opacity: 0.4;
      text-decoration: line-through;
    }
  }
}
</style>
