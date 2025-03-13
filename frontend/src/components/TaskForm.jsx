import { useState } from "react";
import styles from "./TaskForm.module.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

function TaskForm() {
  const emptyTask = {
    taskName: "",
    deadline: "",
    priority: "",
    notes: "",
    tags: [],
  };
  const [newTask, setNewTask] = useState(emptyTask);

  const mutation = useMutation({
    mutationFn: (newTask) => {
      return axios.post("http://localhost:3000/api/tasks", newTask);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      console.log("Task created successfully ", data);
    },
  });

  const handleCreateTask = (e) => {
    e.preventDefault();
    mutation.mutate(newTask);
    console.log(newTask);
    setNewTask(emptyTask);
  };

  return (
    <div className={styles.task_form_page}>
      <h1>Create Task:</h1>

      <form className={styles.form_container}>
        <label htmlFor="taskName">Task description:</label>
        <input
          id="taskName"
          type="text"
          required={true}
          value={newTask.taskName}
          onChange={(e) => setNewTask({ ...newTask, taskName: e.target.value })}
        />

        <label htmlFor="deadline">Deadline:</label>
        <input
          id="deadline"
          type="date"
          value={newTask.deadline}
          onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
        />

        <label htmlFor="priority">Priority level:</label>
        <input
          id="priority"
          type="text"
          value={newTask.priority}
          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
        />

        <label htmlFor="notes">Additional notes:</label>
        <textarea
          id="notes"
          type="text"
          value={newTask.notes}
          onChange={(e) => setNewTask({ ...newTask, notes: e.target.value })}
        />

        <label htmlFor="tags">Tags:</label>
        <input
          id="tags"
          type="text"
          value={newTask.tags}
          onChange={(e) => setNewTask({ ...newTask, tags: e.target.value })}
        />
      </form>
      <div className={styles.form_buttons_container}>
        <button onClick={() => setNewTask(emptyTask)}>Clear form</button>
        <button onClick={handleCreateTask}>Create task</button>
      </div>
      {/* Change button from Add task -> Go back to Tasks List */}
    </div>
  );
}

export default TaskForm;
