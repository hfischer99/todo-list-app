import { mount } from '@vue/test-utils';
import TaskList from '@/components/TaskList.vue';

describe('TaskList.vue', () => {
    it('renders tasks', () => {
        const tasks = [
            { id: 1, title: 'Task 1', description: 'Description 1', completed: false, colors: ['#D4CFFF'] },
            { id: 2, title: 'Task 2', description: 'Description 2', completed: true, colors: ['#D1E5F7'] },
        ];
        const wrapper = mount(TaskList, {
            props: { tasks }
        });
        expect(wrapper.findAll('.task').length).toBe(tasks.length);
    });

    it('emits edit-task event', async () => {
        const tasks = [{ id: 1, title: 'Task 1', description: 'Description 1', completed: false, colors: ['#D4CFFF'] }];
        const wrapper = mount(TaskList, {
            props: { tasks }
        });
        await wrapper.find('.dropdown-button').trigger('click');
        await wrapper.find('.dropdown-content button:first-child').trigger('click');
        expect(wrapper.emitted('edit-task')).toBeTruthy();
    });

    it('emits remove-task event', async () => {
        const tasks = [{ id: 1, title: 'Task 1', description: 'Description 1', completed: false, colors: ['#D4CFFF'] }];
        const wrapper = mount(TaskList, {
            props: { tasks }
        });
        await wrapper.find('.dropdown-button').trigger('click');
        await wrapper.find('.dropdown-content button:last-child').trigger('click');
        expect(wrapper.emitted('remove-task')).toBeTruthy();
    });
});
