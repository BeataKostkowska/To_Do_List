import { MdInfoOutline } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import styles from "./Task.module.css";
import { useState } from "react";

function Task({ task }) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={styles.task_box}>
      <div className={styles.task_basic}>
        <p>{task.taskName}</p>
        <div className={styles.buttons_box}>
          <MdInfoOutline
            className={`${styles.icon} ${styles.icon_info}`}
            onClick={() => setShowDetails(!showDetails)}
          />
          <MdEditNote className={`${styles.icon} ${styles.icon_edit}`} />
          <MdDeleteOutline className={`${styles.icon} ${styles.icon_delete}`} />
        </div>
      </div>
      <div
        className={styles.task_details}
        style={{ display: showDetails ? "block" : "none" }}
      >
        <p>Priority: {task.priority}</p>
        <p>Deadline: {task.deadline} </p>
        <p>Created: {task.createdAt} </p>
        <p>Tags: {task.tags} </p>
        <p>Notes: {task.notes} </p>
      </div>
      <div className={styles.input_container}>
        <input
          type="range"
          defaultValue="0"
          min="0"
          max="100"
          step="5"
          // value={task.progress}
          className={styles.progress_input}
        />
      </div>
    </div>
  );
}

export default Task;
