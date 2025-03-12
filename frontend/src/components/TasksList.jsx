import Task from "./Task";
import styles from "./TasksList.module.css";

function TasksList() {
  const data = [
    { taskName: "laundry" },
    { taskName: "dishes" },
    { taskName: "shopping" },
    { taskName: "homework" },
    { taskName: "pay bills" },
  ];

  return (
    <div className={styles.tasks_list_container}>
      {data.map((task) => (
        <Task task={task} key={task.taskName} />
      ))}
    </div>
  );
}

export default TasksList;
