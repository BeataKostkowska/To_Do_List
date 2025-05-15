import styles from "./TaskDetails.module.css";

function TaskDetails({ task, showDetails }) {
  const prettyDate = (dateISO) => {
    const date = new Date(dateISO);
    const newDate = date.toLocaleString(navigator.language);
    return newDate.replace(", ", " at ");
  };

  return (
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
  );
}

export default TaskDetails;
