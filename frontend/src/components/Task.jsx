import { MdInfoOutline } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import styles from "./Task.module.css";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useFormStore } from "../store";
import { Tooltip } from "react-tooltip";

function Task({ task }) {
  const [showDetails, setShowDetails] = useState(false);

  const openEditForm = useFormStore((state) => state.openEditForm);

  const queryClient = useQueryClient();

  const progressMutation = useMutation({
    mutationFn: (updatedData) => {
      return axios.patch(
        `http://localhost:3000/api/tasks/${task._id}`,
        updatedData
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
    const newProgress = parseInt(e.target.value);
    progressMutation.mutate({
      progress: newProgress,
      completed: newProgress === 100 ? true : false,
    });
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

  const prettyDate = (dateISO) => {
    const date = new Date(dateISO);
    const newDate = date.toLocaleString(navigator.language);
    return newDate.replace(", ", " at ");
  };

  return (
    <div
      className={`${styles.task_box}  ${
        task.completed ? styles.completed : ""
      }`}
    >
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
          <div className={styles.tooltip_container}>
            <MdInfoOutline
              className={`${styles.icon} ${styles.icon_info}`}
              onClick={() => setShowDetails(!showDetails)}
              data-tooltip-id="details"
              data-tooltip-delay-show={800}
            />
            <Tooltip
              id="details"
              place="bottom"
              content="Show details"
              className={styles.tooltip}
              border="2px solid var(--blue-color)"
            />
          </div>
          <div className={styles.tooltip_container}>
            <MdEditNote
              className={`${styles.icon} ${styles.icon_edit}`}
              onClick={() => openEditForm(task)}
              data-tooltip-id="edit"
              data-tooltip-delay-show={800}
            />
            <Tooltip
              id="edit"
              place="bottom"
              content="Edit task"
              className={styles.tooltip}
              border="2px solid var(--orange-color)"
            />
          </div>
          <div className={styles.tooltip_container}>
            <MdDeleteOutline
              className={`${styles.icon} ${styles.icon_delete}`}
              onClick={handleDelete}
              data-tooltip-id="delete"
              data-tooltip-delay-show={800}
            />
            <Tooltip
              id="delete"
              place="bottom"
              content="Delete task"
              className={styles.tooltip}
              border="2px solid var(--coral-color)"
            />
          </div>
        </div>
      </div>
      <table
        className={styles.task_details}
        style={{ display: showDetails ? "block" : "none" }}
      >
        {task.deadline && (
          <tr>
            <td>Deadline:</td> <td>{prettyDate(task.deadline)} </td>
          </tr>
        )}
        {task.priority && (
          <tr>
            <td>Priority:</td> <td>{task.priority}</td>
          </tr>
        )}
        {task.createdAt && (
          <tr>
            <td>Created:</td>
            <td> {prettyDate(task.createdAt)}</td>{" "}
          </tr>
        )}
        {task.tags.length > 0 && (
          <tr>
            <td>Tags:</td>
            <td> {task.tags} </td>
          </tr>
        )}
        {task.notes && (
          <tr>
            <td>Notes:</td> <td>{task.notes} </td>
          </tr>
        )}
      </table>
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
