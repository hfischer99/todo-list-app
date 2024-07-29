import { mount } from '@vue/test-utils';
import HomeView from '@/views/HomeView.vue';
import Sidebar from '@/components/Sidebar.vue';
import TaskList from '@/components/TaskList.vue';
import TaskModal from '@/components/TaskModal.vue';

describe('HomeView.vue', () => {
    it('renders Sidebar, TaskList and TaskModal components', () => {
        const wrapper = mount(HomeView);
        expect(wrapper.findComponent(Sidebar).exists()).toBe(true);
        expect(wrapper.findComponent(TaskList).exists()).toBe(true);
        expect(wrapper.findComponent(TaskModal).exists()).toBe(true);
    });

    it('opens and closes modal', async () => {
        const wrapper = mount(HomeView);
        expect(wrapper.findComponent(TaskModal).exists()).toBe(false);
        await wrapper.find('.add-button').trigger('click');
        expect(wrapper.findComponent(TaskModal).exists()).toBe(true);
        await wrapper.findComponent(TaskModal).vm.$emit('close');
        expect(wrapper.findComponent(TaskModal).exists()).toBe(false);
    });

    it('adds a new task', async () => {
        const wrapper = mount(HomeView);
        await wrapper.find('.add-button').trigger('click');
        const taskModal = wrapper.findComponent(TaskModal);
        await taskModal.find('input').setValue('New Task');
        await taskModal.find('textarea').setValue('New Description');
        await taskModal.find('form').trigger('submit.prevent');
        expect(wrapper.vm.tasks.length).toBe(4); // Considering initial tasks are 3
    });
});
