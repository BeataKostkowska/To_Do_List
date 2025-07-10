import { MdInfoOutline } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import styles from "./Task.module.css";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useFormStore } from "../store";
import { Tooltip } from "react-tooltip";
import TaskDetails from "./TaskDetails";

function Task({ task }) {
  const [showDetails, setShowDetails] = useState(false);
  const [showValue, setShowValue] = useState(false);
  const [localProgress, setLocalProgress] = useState(task.progress);

  const openEditForm = useFormStore((state) => state.openEditForm);
  const queryClient = useQueryClient();

  const progressMutation = useMutation({
    mutationFn: (updatedData) => {
      return axios.patch(
        // `http://localhost:3000/api/tasks/${task._id}`,
        `${import.meta.env.VITE_API_URL}/api/tasks/${task._id}`,
        updatedData
      );
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const handleProgressChange = (e) => {
    const newProgress = parseInt(e.target.value);
    setLocalProgress(newProgress);

    // Debounce the API call
    const timeoutId = setTimeout(() => {
      progressMutation.mutate({
        progress: newProgress,
        completed: newProgress === 100 ? true : false,
      });
    }, 500);

    return () => clearTimeout(timeoutId);
  };

  const deleteMutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:3000/api/tasks/${id}`);
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate(task._id);
  };

  return (
    <div
      className={`${styles.task_box} ${task.completed ? styles.completed : ""}`}
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

      <TaskDetails task={task} showDetails={showDetails} />

      <div className={styles.input_container}>
        <div
          className={styles.range_wrapper}
          style={{ "--value": `${localProgress}%` }}
        >
          <input
            type="range"
            min="0"
            max="100"
            step="5"
            value={localProgress}
            className={styles.progress_input}
            onChange={handleProgressChange}
            onMouseEnter={() => setShowValue(true)}
            onMouseLeave={() => setShowValue(false)}
          />
          {showValue && (
            <output className={styles.value_indicator}>{localProgress}%</output>
          )}
        </div>
      </div>
    </div>
  );
}

export default Task;
