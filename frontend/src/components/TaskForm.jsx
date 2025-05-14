import ModalTaskWindow from "./ModalTaskWindow";
import Button from "../components/Button";
import { useState } from "react";
import styles from "./TaskForm.module.css";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormStore } from "../store";
import Form from "./Form";

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
      <Form data={newTask} setData={setNewTask}>
        <div className={styles.form_buttons_container}>
          <Button onClick={() => setNewTask(emptyTask)}>Clear form</Button>
          <Button onClick={handleCreateTask}>Create task</Button>
        </div>
      </Form>
    </ModalTaskWindow>
  );
}

export default TaskForm;
