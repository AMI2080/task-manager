import { TaskStatus, type Task } from "@/types";
import { createStore } from "vuex";
import storageService from "@/services/storage.service";

export interface State {
  tasks: Task[];
}

const updateStorage = function (tasks: Task[]): void {
  storageService.store("tasks", tasks);
};

const getStorage = function (): Task[] {
  const tasks = storageService.getData("tasks") ?? [];
  tasks.forEach((task) => {
    if (task.deadline) {
      task.deadline = new Date(task.deadline);
    }
  });
  return tasks as Task[];
};

export default createStore<State>({
  state: {
    tasks: getStorage() as Task[],
  },
  getters: {
    tasksList(state: State): Task[] {
      return [...state.tasks];
    },
  },
  mutations: {
    createTask(state: State, task: Task): void {
      task = { ...task };
      task.id =
        state.tasks.length === 0
          ? 1
          : Math.max(...state.tasks.map((x) => x.id)) + 1;
      state.tasks.unshift(task);
      updateStorage(state.tasks);
    },
    updateTaskStatus(
      state: State,
      payload: { task: Task; status: TaskStatus }
    ): void {
      const task = { ...payload.task };
      state.tasks = state.tasks.map((x) => {
        if (x.id === task.id) {
          x.status = payload.status;
        }
        return x;
      });
			updateStorage(state.tasks);
    },
    updateTask(state: State, task: Task): void {
      task = { ...task };
      state.tasks = state.tasks.map((x) => {
        if (x.id === task.id) {
          return task;
        } else {
          return x;
        }
      });
			updateStorage(state.tasks);
    },
    deleteTask(state: State, taskId: number): void {
      let index: number;
      state.tasks.forEach((x, i) => {
        if (x.id === taskId) {
          index = i;
        }
      });
      state.tasks.splice(index, 1);
			updateStorage(state.tasks);
    },
  },
  actions: {
    createTask(context, task: Task): void {
      context.commit("createTask", task);
    },
    updateTaskStatus(
      context,
      payload: { task: Task; status: TaskStatus }
    ): void {
      context.commit("updateTaskStatus", payload);
    },
    updateTask(context, task: Task): void {
      context.commit("updateTask", task);
    },
    deleteTask(context, task: Task): void {
      context.commit("deleteTask", task);
    },
  },
});
