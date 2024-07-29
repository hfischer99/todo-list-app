<template>
  <div class="sidebar">
    <h2>todo</h2>
    <div class="category" v-for="category in categories" :key="category.id">
      <div class="color-dot" :style="{ backgroundColor: category.color }"></div>
      {{ category.name }}
    </div>
    <div class="hideTasks">
      <input
        v-model="localHideTasks"
        type="checkbox"
        @change="toggleHideTasks"
      />
      <span class="textHideTasks">Hide Done Tasks</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Category {
  id: number;
  name: string;
  color: string;
}

export default defineComponent({
  props: {
    categories: {
      type: Array as () => Category[],
      required: true,
    },
    hideTasks: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      localHideTasks: this.hideTasks,
    };
  },
  methods: {
    toggleHideTasks() {
      this.$emit("toggle-hide-tasks");
    },
  },
});
</script>

<style scoped>
.sidebar {
  flex: 1;
  padding-left: 20px;
  display: flex;
  flex-direction: column;
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
  padding: 20px 0;
}

.textHideTasks {
  font-family: Arial, sans-serif;
  color: #bfbcb1;
  margin: 5px;
}

/* Responsividade */
@media (max-width: 768px) {
  .sidebar {
    padding-left: 10px;
  }

  .color-dot {
    width: 20px;
    height: 20px;
    margin-right: 5px;
  }

  .category {
    margin-bottom: 5px;
  }

  .hideTasks {
    padding: 10px 0;
  }
}

@media (max-width: 480px) {
  .sidebar {
    padding-left: 5px;
  }

  .color-dot {
    width: 15px;
    height: 15px;
    margin-right: 3px;
  }

  .category {
    margin-bottom: 3px;
  }

  .hideTasks {
    padding: 5px 0;
  }
}
</style>
