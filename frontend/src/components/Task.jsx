import { MdInfoOutline } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import styles from "./Task.module.css";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useFormStore } from "../store";

function Task({ task }) {
  const [showDetails, setShowDetails] = useState(false);

  const openEditForm = useFormStore((state) => state.openEditForm);

  const queryClient = useQueryClient();

  const progressMutation = useMutation({
    mutationFn: (progress) => {
      return axios.patch(
        `http://localhost:3000/api/tasks/${task._id}`,
        progress
      );
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["tasks"]);
      console.log("Task progress updated successfully ", data);
    },
  });
  const handleProgressChange = (e) => {
    const newProgress = e.target.value;
    progressMutation.mutate({ progress: newProgress });
    console.log(task.progress);
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:3000/api/tasks/${id}`);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      console.log("Task deleted successfully ", data);
      queryClient.invalidateQueries(["tasks"]);
    },
  });
  const handleDelete = () => {
    console.log(`Delete that task`);
    deleteMutation.mutate(task._id);
  };

  return (
    <div className={styles.task_box}>
      <div className={styles.task_basic}>
        <p>
          {task.priority === 5 ? (
            <span className={styles.exclamation}>!!!</span>
          ) : (
            ""
          )}
          {task.priority === 4 ? (
            <span className={styles.exclamation}>!</span>
          ) : (
            ""
          )}
          <span className={styles.taskname_text}>{task.taskName}</span>
        </p>
        <div className={styles.buttons_box}>
          <MdInfoOutline
            className={`${styles.icon} ${styles.icon_info}`}
            onClick={() => setShowDetails(!showDetails)}
          />
          <MdEditNote
            className={`${styles.icon} ${styles.icon_edit}`}
            onClick={() => openEditForm(task)}
          />
          <MdDeleteOutline
            className={`${styles.icon} ${styles.icon_delete}`}
            onClick={handleDelete}
          />
        </div>
      </div>
      <div
        className={styles.task_details}
        style={{ display: showDetails ? "block" : "none" }}
      >
        <p>Deadline: {task.deadline} </p>
        <p>Priority: {task.priority}</p>
        <p>Created: {task.createdAt} </p>
        <p>Tags: {task.tags} </p>
        <p>Notes: {task.notes} </p>
      </div>
      <div className={styles.input_container}>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={task.progress}
          className={styles.progress_input}
          onChange={handleProgressChange}
        />
      </div>
    </div>
  );
}

export default Task;
