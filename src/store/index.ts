import { type Task } from "@/types";
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
  },
  actions: {
    createTask(context, task: Task) {
      context.commit("createTask", task);
    },
    updateTask(context, task: Task) {
      context.commit("updateTask", task);
    },
  },
});
