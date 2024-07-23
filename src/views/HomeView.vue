<template>
  <div class="app">
    <div class="content">
      <!-- Sidebar -->
      <div class="sidebar">
        <h2>todo</h2>
        <div class="category" v-for="category in categories" :key="category.id">
          <div
            class="color-dot"
            :style="{ backgroundColor: category.color }"
          ></div>
          {{ category.name }}
        </div>
        <div class="hideTasks">
          <input type="checkbox" />
          <text class="textHideTasks">Hide Done Tasks </text>
        </div>
      </div>

      <!-- Main content -->
      <div class="main-content">
        <div class="task" v-for="task in tasks" :key="task.id">
          <input type="checkbox" v-model="task.completed" />
          <div class="task-details">
            <div class="task-title">{{ task.title }}</div>
            <div class="task-description">{{ task.description }}</div>
          </div>
        </div>
        <form @submit.prevent="addTask">
          <input v-model="newTaskTitle" placeholder="New Task" />
          <button class="add-button">+</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useTaskStore } from "@/store/taskStore";

export default {
  data() {
    return {
      categories: [
        { id: 1, name: "work", color: "#D4CFFF" },
        { id: 2, name: "study", color: "#D1E5F7" },
        { id: 3, name: "entertainment", color: "#FFCECD" },
        { id: 4, name: "family", color: "#DAF2D7" },
      ],
    };
  },

  setup() {
    const taskStore = useTaskStore();
    const newTaskTitle = ref("");

    const tasks = ref([
      {
        id: 1,
        title: "The first task title",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr.",
      },
      {
        id: 2,
        title: "The second task title",
        description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr,",
      },
      {
        id: 3,
        title: "The third task title",
        description: "Lorem Ipsum dolor sit amet, consetetur sadipscing elit,",
      },
    ]);

    const addTask = () => {
      if (newTaskTitle.value) {
        const newTask = {
          id: tasks.value.length + 1, // ou gerar um ID único de outra forma
          title: newTaskTitle.value,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam faucibus sit amet felis vel pharetra. Proin mollis tortor sit amet aliquam interdum. Phasellus vestibulum scelerisque dui, in mattis neque sagittis quis. Donec non eros tempus, ullamcorper erat in, volutpat eros.", // Adicione uma descrição se necessário
          completed: false,
        };
        tasks.value.push(newTask);
        taskStore.addTask(newTask);
        newTaskTitle.value = "";
      }
    };

    return { newTaskTitle, tasks, addTask };
  },
};
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

.sidebar {
  flex: 1;
  justify-items: left;
  padding-left: 20px;
}

.category {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.color-dot {
  width: 30px;
  height: 30px;
  margin-right: 10px;
  border-radius: 50%;
}

.hideTasks {
  padding: 20px 0px 20px 0px;
}

.textHideTasks {
  font-family: Arial, sans-serif;
  color: #bfbcb1;
  margin: 5px;
}

.main-content {
  flex: 3;
  padding: 20px;
}

.task {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.task-title {
  font-weight: bold;
}

.add-button {
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 24px;
  background-color: #33a6ff;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
}
</style>

<!-- <template>
  <div>
    <h1>Task Management</h1>
    <AddTask />
    <TaskList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AddTask from "@/components/AddTask.vue";
import TaskList from "@/components/TaskList.vue";

export default defineComponent({
  components: {
    AddTask,
    TaskList,
  },
});
</script> -->
