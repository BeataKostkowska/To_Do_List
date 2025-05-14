import TaskForm from "../components/TaskForm";
import TasksList from "../components/TasksList";
import styles from "./TasksPage.module.css";
import TaskEditForm from "../components/TaskEditForm";
import { useFormStore } from "../store";
import LightDarkModeButton from "../components/LightDarkModeButton";
import Button from "../components/Button";

function TasksPage() {
  const showEditForm = useFormStore((state) => state.showEditForm);
  const showAddTaskForm = useFormStore((state) => state.showAddTaskForm);
  const openAddTaskForm = useFormStore((state) => state.openAddTaskForm);

  return (
    <div className={styles.task_page}>
      <div className={styles.settings_container}>
        <LightDarkModeButton />
      </div>
      <h1 className={styles.header_todo_list}>To-Do List:</h1>
      <TasksList />
      <div className={styles.btn_add_task_container}>
        <Button onClick={() => openAddTaskForm()}>Add Task</Button>
      </div>

      {showEditForm ? <TaskEditForm /> : ""}
      {showAddTaskForm ? <TaskForm /> : ""}
    </div>
  );
}

export default TasksPage;
