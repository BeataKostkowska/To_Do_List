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

  const openEditForm = useFormStore((state) => state.openEditForm);

  const queryClient = useQueryClient();

  const getDeadlineStatus = (deadline) => {
    if (!deadline) return null;

    const now = new Date();
    const deadlineDate = new Date(deadline);
    const timeToDeadline = deadlineDate - now;
    const differenceInDays = Math.ceil(timeToDeadline / (1000 * 60 * 60 * 24));

    if (differenceInDays < 0)
      return { emoji: "🚨 ", tooltip: "Deadline passed" };
    if (differenceInDays <= 1)
      return { emoji: "⏰ ", tooltip: "Due today/tomorrow" };
    if (differenceInDays <= 3) return { emoji: "⏳ ", tooltip: "Due in 3 days" };
    return null;
  };

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

  const deadlineStatus = getDeadlineStatus(task.deadline);

  return (
    <div
      className={`${styles.task_box}  ${
        task.completed ? styles.completed : ""
      }`}
    >
      <div className={styles.task_basic}>
        <p>
          {deadlineStatus && (
            <span
              className={styles.deadline_emoji}
              data-tooltip-id={`deadline-${task._id}`}
              data-tooltip-delay-show={800}
            >
              {deadlineStatus.emoji}
            </span>
          )}
          {deadlineStatus && (
            <Tooltip
              id={`deadline-${task._id}`}
              place="bottom"
              content={deadlineStatus.tooltip}
              className={styles.tooltip}
              border="2px solid var(--coral-color)"
            />
          )}
          <span className={styles.taskname_text}>{task.taskName}</span>
          {task.priority === 5 ? (
            <span className={styles.exclamation}> !!!</span>
          ) : (
            ""
          )}
          {task.priority === 4 ? (
            <span className={styles.exclamation}> !</span>
          ) : (
            ""
          )}
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
