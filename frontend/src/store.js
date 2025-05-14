import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useFormStore = create((set) => ({
  showEditForm: false,
  taskData: {},
  openEditForm: (task) =>
    set((state) => ({ showEditForm: !state.showEditForm, taskData: task })),
  closeEditForm: () => set((state) => ({ showEditForm: !state.showEditForm })),
  showAddTaskForm: false,
  openAddTaskForm: () =>
    set((state) => ({ showAddTaskForm: !state.showAddTaskForm })),
  closeAddTaskForm: () =>
    set((state) => ({ showAddTaskForm: !state.showAddTaskForm })),
}));

const usersDefaultSetting = window.matchMedia(
  "(prefers-color-scheme: light)"
).matches;

export const useThemeStore = create()(
  persist(
    (set) => ({
      lightMode: usersDefaultSetting,
      changeMode: () => set((state) => ({ lightMode: !state.lightMode })),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
