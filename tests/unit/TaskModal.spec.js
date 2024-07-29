import { mount } from '@vue/test-utils';
import TaskModal from '@/components/TaskModal.vue';

describe('TaskModal.vue', () => {
    it('renders new task form', () => {
        const wrapper = mount(TaskModal, {
            props: { categories: [], task: null }
        });
        expect(wrapper.find('h2').text()).toBe('New Task');
    });

    it('renders edit task form', () => {
        const task = { title: 'Task 1', description: 'Description 1', completed: false, colors: ['#D4CFFF'] };
        const wrapper = mount(TaskModal, {
            props: { categories: [], task }
        });
        expect(wrapper.find('h2').text()).toBe('Edit Task');
    });

    it('emits save event on form submit', async () => {
        const wrapper = mount(TaskModal, {
            props: { categories: [], task: null }
        });
        await wrapper.find('form').trigger('submit.prevent');
        expect(wrapper.emitted('save')).toBeTruthy();
    });

    it('emits close event on close button click', async () => {
        const wrapper = mount(TaskModal, {
            props: { categories: [], task: null }
        });
        await wrapper.find('.close-button').trigger('click');
        expect(wrapper.emitted('close')).toBeTruthy();
    });
});
