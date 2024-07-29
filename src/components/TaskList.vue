<template>
  <div class="main-content">
    <div class="task" v-for="task in tasks" :key="task.id">
      <div class="task-details">
        <div class="task-title">
          {{ task.title }}
          <div class="actions">
            <div class="dropdown">
              <button class="dropdown-button">...</button>
              <div class="dropdown-content">
                <button @click="$emit('edit-task', task)">Edit</button>
                <button @click="$emit('remove-task', task.id)">Remove</button>
              </div>
            </div>
          </div>
        </div>
        <div class="task-description">{{ task.description }}</div>
      </div>
      <div class="task-bottom">
        <div
          v-for="color in task.colors"
          :key="color"
          class="color-dot"
          :style="{ backgroundColor: color }"
        ></div>
        <div class="box-checkbox">
          <input type="checkbox" v-model="task.completed" />
          <span>Done</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  colors: string[];
}

export default defineComponent({
  props: {
    tasks: {
      type: Array as PropType<Task[]>,
      required: true,
    },
  },
});
</script>

<style scoped>
.main-content {
  flex: 3;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.task {
  width: 100%;
  max-width: 30rem;
  min-height: 5.5rem;
  margin-bottom: 20px;
  background-color: #fff9de;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 100px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content button {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  width: 100%;
  border: none;
  background: none;
  text-align: left;
  cursor: pointer;
}

.dropdown-content button:hover {
  background-color: #f1f1f1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.task-bottom {
  padding: 0 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-bottom .box-checkbox {
  margin-right: 20px;
  align-self: flex-end;
  margin-left: auto;
}

.task-bottom .color-dot {
  margin-left: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.actions {
  margin-left: auto;
}

.task-title {
  padding: 20px;
  color: #43403a;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-description {
  color: #615f55;
  padding: 5px 20px 30px;
  font-size: 14px;
}

@media (min-width: 768px) {
  .task {
    max-width: 25rem;
  }
}

@media (min-width: 1024px) {
  .task {
    max-width: 30rem;
  }
}
</style>
