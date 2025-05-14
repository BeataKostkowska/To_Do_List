import ModalTaskWindow from "./ModalTaskWindow";
import Button from "../components/Button";
import { useState } from "react";
import styles from "./TaskForm.module.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormStore } from "../store";

function TaskForm() {
  const closeAddTaskForm = useFormStore((state) => state.closeAddTaskForm);

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
    closeAddTaskForm();
  };

  return (
    <ModalTaskWindow header={"Create Task:"} onClickClose={closeAddTaskForm}>
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
        <Button onClick={() => setNewTask(emptyTask)}>Clear form</Button>
        <Button onClick={handleCreateTask}>Create task</Button>
      </div>
    </ModalTaskWindow>
  );
}

export default TaskForm;
