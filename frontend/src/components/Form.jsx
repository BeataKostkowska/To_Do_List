import styles from "./Form.module.css";

function Form({ data, setData, children }) {
  const currentDate = () => {
    const currentDate = new Date().toISOString().slice(0, -8);
    console.log(`current: ${currentDate}`);
    return currentDate;
  };

  const changeDateFormat = (dateISO) => {
    const date = new Date(dateISO);
    const formattedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60000
    )
      .toISOString()
      .slice(0, 16);
    console.log(formattedDate);
    return formattedDate;
  };

return (
    <form className={styles.form_container}>
      <label htmlFor="taskName">Task description:</label>
      <input
        id="taskName"
        type="text"
        required={true}
        value={data.taskName || ""}
        onChange={(e) => setData({ ...data, taskName: e.target.value })}
      />

      <label htmlFor="deadline">Deadline:</label>
      <input
        id="deadline"
        type="datetime-local"
        value={data.deadline ? changeDateFormat(data.deadline) : ""}
        min={currentDate()}
        onChange={(e) => {
          console.log(e.target.value);
          setData({ ...data, deadline: e.target.value }); 
        }}
      />

      <label htmlFor="priority">Priority level:</label>
      <input
        id="priority"
        type="text"
        value={data.priority || ""}
        onChange={(e) => setData({ ...data, priority: e.target.value })}
      />

      <label htmlFor="notes">Additional notes:</label>
      <textarea
        id="notes"
        type="text"
        value={data.notes || ""}
        onChange={(e) => setData({ ...data, notes: e.target.value })}
      />

      <label htmlFor="tags">Tags:</label>
      <input
        id="tags"
        type="text"
        value={data.tags || ""}
        onChange={(e) => setData({ ...data, tags: e.target.value })}
      />
      {children}
    </form>
  );
}

export default Form;
