import { createStore } from 'vuex';

// تعريف نوع الحالة (State)
export interface State {
  todos: Todo[];
}

export interface Todo {
  id: number;
  title: string;
  isDone: boolean;
}

// تعريف الحالة الأولية (initial state)
const state: State = {
  todos: []
};

// الطفرات (Mutations)
const mutations = {
  ADD_TODO(state: State, todo: Todo) {
    state.todos.push(todo);
  },
  REMOVE_TODO(state: State, todoId: number) {
    state.todos = state.todos.filter(todo => todo.id !== todoId);
  },
  TOGGLE_TODO_STATUS(state: State, todoId: number) {
    // const todo = state.todos.find(todo => todo.id === todoId);
    // if (todo) {
    //   todo.isDone = !todo.isDone;
    // }
  },
};

// الإجراءات (Actions)
const actions = {
  addTodo({ commit }, todo: Todo) {
    commit('ADD_TODO', todo);
  },
  removeTodo({ commit }, todoId: number) {
    commit('REMOVE_TODO', todoId);
  },
  toggleTodoStatus({ commit }, todoId: number) {
    commit('TOGGLE_TODO_STATUS', todoId);
  },
};

// المستخلصات (Getters)
const getters = {
  allTodos: (state: State) => state.todos,
  completedTodos: (state: State) => state.todos.filter(todo => todo.isDone),
  pendingTodos: (state: State) => state.todos.filter(todo => !todo.isDone),
};

// إنشاء المتجر
export const store = createStore<State>({
  state,
  mutations,
  actions,
  getters,
});
