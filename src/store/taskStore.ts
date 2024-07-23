import { defineStore } from "pinia";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [] as Task[],
  }),
  actions: {
    addTask(task: Task) {
      this.tasks.push({ ...task, id: Date.now() });
    },
    toggleCompletion(task: Task) {
      const taskToUpdate = this.tasks.find((t) => t.id === task.id);
      if (taskToUpdate) {
        taskToUpdate.completed = !taskToUpdate.completed;
      }
    },
    removeTask(task: Task) {
      this.tasks = this.tasks.filter((t) => t.id !== task.id);
    },
    // Adicione outras ações conforme necessário
  },
});
