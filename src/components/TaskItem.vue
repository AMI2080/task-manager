<template>
  <v-list-item color="cyan" class="task-item" :class="{ done: task.isDone }">
    <template v-slot:prepend>
      <v-list-item-action start>
        <v-checkbox-btn
          v-model="task.isDone"
          :color="task.isDone ? 'success' : 'default'"
        />
      </v-list-item-action>
    </template>
    <v-list-item-title :class="{ 'line-through': task.isDone }">
      <v-icon
        :color="
          task.priority === Priority.HEIGH
            ? 'error'
            : task.priority === Priority.MEDIUM
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
import { Priority, type Task } from "@/types";
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
      Priority,
      showEditDialog: false as boolean,
      showDeleteDialog: false as boolean,
    };
  },
  methods: {
    editItem(): void {
      console.log("edit", this.task);
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
