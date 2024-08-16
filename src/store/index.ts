import { TaskPriority, TaskStatus, type Task } from "@/types";
import { createStore } from "vuex";

export interface State {
  tasks: Task[];
}

export default createStore<State>({
  state: {
    tasks: [] as Task[],
  },
  getters: {
    tasksList(state: State): Task[] {
      return [...state.tasks];
    },
  },
  mutations: {
    createTask(state: State, task: Task) {
      task = { ...task };
      task.id =
        state.tasks.length === 0
          ? 1
          : Math.max(...state.tasks.map((x) => x.id)) + 1;
      state.tasks.unshift(task);
    },
    updateTaskStatus(
      state: State,
      payload: { task: Task; status: TaskStatus }
    ) {
      const task = { ...payload.task };
      state.tasks = state.tasks.map((x) => {
        if (x.id === task.id) {
          x.status = payload.status;
        }
        return x;
      });
    },
    updateTask(state: State, task: Task) {
      task = { ...task };
      state.tasks = state.tasks.map((x) => {
        if (x.id === task.id) {
          return task;
        } else {
          return x;
        }
      });
    },
    deleteTask(state: State, taskId: number) {
      let index: number;
      state.tasks.forEach((x, i) => {
        if (x.id === taskId) {
          index = i;
        }
      });
      state.tasks.splice(index, 1);
    },
  },
  actions: {
    createTask(context, task: Task) {
      context.commit("createTask", task);
    },
    updateTaskStatus(context, payload: { task: Task; status: TaskStatus }) {
      context.commit("updateTaskStatus", payload);
    },
    updateTask(context, task: Task) {
      context.commit("updateTask", task);
    },
    deleteTask(context, task: Task) {
      context.commit("deleteTask", task);
    },
  },
});
