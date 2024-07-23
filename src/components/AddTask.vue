<template>
  <form @submit.prevent="addTask">
    <input v-model="title" placeholder="New Task" />
    <button type="submit">Add</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useTaskStore } from "@/store/taskStore";

export default defineComponent({
  setup() {
    const taskStore = useTaskStore();
    const title = ref("");

    const addTask = () => {
      if (title.value) {
        taskStore.addTask({ title: title.value, completed: false });
        title.value = "";
      }
    };

    return { title, addTask };
  },
});
</script>
