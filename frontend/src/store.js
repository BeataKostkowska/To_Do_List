import { create } from "zustand";

export const useFormStore = create((set) => ({
  showEditForm: false,
  taskData: {},
  openEditForm: (task) =>
    set((state) => ({ showEditForm: !state.showEditForm, taskData: task })),
  closeEditForm: () => set((state) => ({ showEditForm: !state.showEditForm })),
}));

const usersDefaultSetting = window.matchMedia(
  "(prefers-color-scheme: light)"
).matches;

export const useThemeStore = create((set) => ({
  lightMode: usersDefaultSetting,
  changeMode: () => set((state) => ({ lightMode: !state.lightMode })),
}));
