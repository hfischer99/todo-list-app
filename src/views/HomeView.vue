<template>
  <div class="app">
    <div class="content">
      <Sidebar
        :categories="categories"
        :hide-tasks="hideTasks"
        @toggle-hide-tasks="toggleHideTasks"
      />

      <TaskList
        :tasks="filteredTasks"
        @edit-task="openEditModal"
        @remove-task="removeTask"
      />

      <button class="add-button" @click="openModal">+</button>

      <TaskModal
        v-if="isModalOpen"
        :task="editingTask"
        :categories="categories"
        @close="closeModal"
        @save="saveTask"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, computed } from "vue";
import { useTaskStore } from "@/store/taskStore";
import Sidebar from "@/components/SideBar.vue";
import TaskList from "@/components/TaskList.vue";
import TaskModal from "@/components/TaskModal.vue";

export default defineComponent({
  components: {
    Sidebar,
    TaskList,
    TaskModal,
  },
  setup() {
    const taskStore = useTaskStore();
    const hideTasks = ref(false);
    const isModalOpen = ref(false);
    const editingTask = ref(null);

    const categories = ref([
      { id: 1, name: "work", color: "#D4CFFF" },
      { id: 2, name: "study", color: "#D1E5F7" },
      { id: 3, name: "entertainment", color: "#FFCECD" },
      { id: 4, name: "family", color: "#DAF2D7" },
    ]);

    const tasks = ref([
      {
        id: 1,
        title: "The first task title",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
        completed: false,
        colors: ["#DAF2D7", "#D4CFFF", "#FFCECD"],
      },
      {
        id: 2,
        title: "The second task title",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,",
        completed: true,
        colors: ["#DAF2D7", "#D4CFFF", "#FFCECD"],
      },
      {
        id: 3,
        title: "The third task title",
        description: "Lorem Ipsum dolor sit amet, consetetur sadipscing elit,",
        completed: false,
        colors: ["#DAF2D7", "#D4CFFF", "#FFCECD"],
      },
    ]);

    const openModal = () => {
      isModalOpen.value = true;
      editingTask.value = null;
    };

    const closeModal = () => {
      isModalOpen.value = false;
    };

    const saveTask = (task) => {
      if (editingTask.value) {
        const index = tasks.value.findIndex(
          (t) => t.id === editingTask.value.id
        );
        if (index !== -1) {
          tasks.value[index] = { ...tasks.value[index], ...task };
        }
      } else {
        task.id = tasks.value.length + 1;
        tasks.value.push(task);
      }
      taskStore.addTask(task);
      closeModal();
    };

    const openEditModal = (task) => {
      isModalOpen.value = true;
      editingTask.value = task;
    };

    const removeTask = (taskId) => {
      tasks.value = tasks.value.filter((task) => task.id !== taskId);
      taskStore.removeTask(taskId);
    };

    const filteredTasks = computed(() => {
      return tasks.value.filter((task) => !hideTasks.value || !task.completed);
    });

    const toggleHideTasks = () => {
      hideTasks.value = !hideTasks.value;
    };

    return {
      tasks,
      saveTask,
      filteredTasks,
      hideTasks,
      isModalOpen,
      openModal,
      closeModal,
      categories,
      openEditModal,
      removeTask,
      editingTask,
      toggleHideTasks,
    };
  },
});
</script>

<style scoped>
.app {
  align-items: center;
  display: flex;
  font-family: Arial, sans-serif;
  background-color: #fff;
}

.content {
  width: 100%;
  height: 100%;
  display: flex;
  margin: 2% 10% 2% 10%;
  border: 1px solid #000;
  border-radius: 20px;
}

.add-button {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 40px;
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
</style>
