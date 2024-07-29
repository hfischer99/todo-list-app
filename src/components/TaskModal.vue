<template>
  <div class="modal">
    <div class="modal-back">
      <div class="modal-header">
        <span class="close-button" @click="$emit('close')">Cancel</span>
        <span @click="handleSaveTask">{{ task ? "SAVE" : "ADD" }}</span>
      </div>
      <div class="modal-body">
        <form @submit.prevent="handleSaveTask">
          <div class="input-group">
            <label for="title">Title</label>
            <input
              v-model="taskTitle"
              required
              type="text"
              id="title"
              placeholder="add a title ..."
            />
          </div>
          <div class="input-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              v-model="taskDescription"
              placeholder="add a description ..."
              required
            ></textarea>
          </div>
          <div class="tags">
            <span
              v-for="category in categories"
              :key="category.id"
              :class="[
                'tag',
                { selected: selectedCategoryIds.includes(category.id) },
              ]"
              :style="{ backgroundColor: category.color }"
              @click="toggleCategorySelection(category.id)"
            >
              {{ category.name }}
            </span>
          </div>
        </form>
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

interface Category {
  id: number;
  name: string;
  color: string;
}

export default defineComponent({
  props: {
    task: {
      type: Object as PropType<Task>,
      required: false,
    },
    categories: {
      type: Array as PropType<Category[]>,
      required: true,
    },
  },
  data() {
    return {
      taskTitle: this.task ? this.task.title : "",
      taskDescription: this.task ? this.task.description : "",
      taskCompleted: this.task ? this.task.completed : false,
      selectedCategoryIds: this.task
        ? this.categories
            .filter((category) => this.task!.colors.includes(category.color))
            .map((category) => category.id)
        : [],
    };
  },
  methods: {
    toggleCategorySelection(categoryId: number) {
      if (this.selectedCategoryIds.includes(categoryId)) {
        this.selectedCategoryIds = this.selectedCategoryIds.filter(
          (id) => id !== categoryId
        );
      } else {
        this.selectedCategoryIds.push(categoryId);
      }
    },
    handleSaveTask() {
      const selectedColors = this.categories
        .filter((category) => this.selectedCategoryIds.includes(category.id))
        .map((category) => category.color);

      const taskData: Task = {
        ...this.task!,
        title: this.taskTitle,
        description: this.taskDescription,
        completed: this.taskCompleted,
        colors: selectedColors,
      };
      this.$emit("save", taskData);
    },
  },
});
</script>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

.modal-back {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  height: auto;
  max-height: 80%;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  margin-bottom: 20px;
}

.modal-header span {
  cursor: pointer;
  color: #007bff;
}

.modal-body {
  display: flex;
  flex-direction: column;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 15px;
}

.tag {
  padding: 5px 10px;
  border-radius: 50px;
  color: white;
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s;
}

.tag.selected {
  border: 2px solid #000;
  color: #000;
  transform: scale(1.1);
}

@media (min-width: 768px) {
  .modal-back {
    width: 70%;
    max-width: 600px;
  }
}

@media (min-width: 1024px) {
  .modal-back {
    width: 50%;
    max-width: 700px;
  }
}

.close-button {
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: #000;
}
</style>
