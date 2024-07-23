<template>
  <div :class="{ completed: task.completed }">
    <input
      type="checkbox"
      v-model="task.completed"
      @change="toggleCompletion"
    />
    <span>{{ task.title }}</span>
    <button @click="editTask">Edit</button>
    <button @click="removeTask">Delete</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<{ title: string; completed: boolean }>,
      required: true,
    },
  },
  methods: {
    toggleCompletion() {
      this.$emit("toggle-completion", this.task);
    },
    editTask() {
      this.$emit("edit-task", this.task);
    },
    removeTask() {
      this.$emit("remove-task", this.task);
    },
  },
});
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
