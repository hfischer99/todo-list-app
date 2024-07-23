// tests/unit/TaskItem.spec.ts
import { mount } from "@vue/test-utils";
import TaskItem from "@/components/TaskItem.vue";

describe("TaskItem.vue", () => {
  it("renders task title", () => {
    const task = { title: "Test Task", completed: false };
    const wrapper = mount(TaskItem, {
      props: { task },
    });
    expect(wrapper.text()).toContain("Test Task");
  });
});
