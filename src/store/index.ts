import { createStore } from "vuex";
import { defineStore } from "pinia";

export default createStore({
  state: {
    tasks: [],
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(task);
    },
    // Outras mutações para editar, marcar como concluída e remover tarefas
  },
  actions: {
    addTask({ commit }, task) {
      commit("addTask", task);
    },
    // Outras ações para editar, marcar como concluída e remover tarefas
  },
  getters: {
    getTasks(state) {
      return state.tasks;
    },
    // Outros getters para filtragem
  },
});

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
  }),
  actions: {
    addTask(task) {
      this.tasks.push(task);
    },
    // Outras ações para editar, marcar como concluída e remover tarefas
  },
  getters: {
    getTasks: (state) => state.tasks,
    // Outros getters para filtragem
  },
});
