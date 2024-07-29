import { mount } from '@vue/test-utils';
import Sidebar from '@/components/SideBar.vue';

describe('SideBar.vue', () => {
    it('renders categories', () => {
        const categories = [
            { id: 1, name: 'work', color: '#D4CFFF' },
            { id: 2, name: 'study', color: '#D1E5F7' },
        ];
        const wrapper = mount(Sidebar, {
            props: { categories, hideTasks: false }
        });
        expect(wrapper.findAll('.category').length).toBe(categories.length);
    });

    it('emits toggle-hide-tasks event', async () => {
        const wrapper = mount(Sidebar, {
            props: { categories: [], hideTasks: false }
        });
        await wrapper.find('input[type="checkbox"]').trigger('change');
        expect(wrapper.emitted('toggle-hide-tasks')).toBeTruthy();
    });
});
