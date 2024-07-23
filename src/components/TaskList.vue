<template>
  <div>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        <input
          type="checkbox"
          v-model="task.completed"
          @change="toggleCompletion(task)"
        />
        <span :class="{ completed: task.completed }">{{ task.title }}</span>
        <button @click="editTask(task)">Edit</button>
        <button @click="removeTask(task)">Delete</button>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTaskStore } from "@/store/taskStore";

export default defineComponent({
  setup() {
    const taskStore = useTaskStore();
    const tasks = taskStore.tasks;

    const toggleCompletion = (task: any) => {
      taskStore.toggleCompletion(task);
    };

    const editTask = (task: any) => {
      // lógica para editar a tarefa
    };

    const removeTask = (task: any) => {
      taskStore.removeTask(task);
    };

    return { tasks, toggleCompletion, editTask, removeTask };
  },
});
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
