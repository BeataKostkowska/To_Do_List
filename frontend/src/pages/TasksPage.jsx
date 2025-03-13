// 
import TaskForm from "../components/TaskForm";
import TasksList from "../components/TasksList";
// import { MdAddTask } from "react-icons/md";
import styles from "./TasksPage.module.css";
import { useState } from "react";

function TasksPage() {
  const [taskFormOpen, setTaskFormOpen] = useState(false);


  return (
    <div className={styles.task_page}>
      {taskFormOpen ? (
        <TaskForm />
      ) : (
        <>
          <h1 className={styles.header_todo_list}>To-Do List:</h1>
          <TasksList />
        </>
      )}
      <div className={styles.btn_add_task_container}>
        <button
          className={styles.btn_add_task}
          onClick={() => setTaskFormOpen(!taskFormOpen)}
        >
          {/* <MdAddTask size="24" color="#a7e0c2" />  */}
          Add task
        </button>
      </div>
    </div>
  );
}

export default TasksPage;
