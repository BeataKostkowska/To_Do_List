import { create } from "zustand";

export const useFormStore = create((set) => ({
  showEditForm: false,
  taskData: {},
  openEditForm: (task) =>
    set((state) => ({ showEditForm: !state.showEditForm, taskData: task })),
  closeEditForm: () => set((state) => ({ showEditForm: !state.showEditForm })),
}));
