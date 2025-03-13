import { useQuery } from "@tanstack/react-query";
import Task from "./Task";
import styles from "./TasksList.module.css";

function TasksList() {
  const { isPending, error, data } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await fetch("http://localhost:3000/api/tasks");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      console.log(`fetch data in TasksList: ${data}`);
      return data;
    },
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={styles.tasks_list_container}>
      {data.data.allTasks.map((task) => (
        <Task task={task} key={task._id} />
      ))}
    </div>
  );
}

export default TasksList;
