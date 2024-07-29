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

<script>
export default {
  props: {
    categories: Array,
    hideTasks: Boolean,
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
};
</script>

<style scoped>
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
  padding: 20px 0;
}

.textHideTasks {
  font-family: Arial, sans-serif;
  color: #bfbcb1;
  margin: 5px;
}
</style>
