// import { useState } from "react";
import styles from "./Form.module.css";
// import DatePicker from "react-datepicker";

function Form({ data, setData, children }) {
  const currentDate = () => {
    const currentDate = new Date().toISOString().slice(0, -8);
    console.log(`current: ${currentDate}`);
    return currentDate;
  };

  // const [startDate, setStartDate] = useState(new Date());

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
        value={data.deadline || ""}
        min={currentDate()}
        onChange={(e) => {
          console.log(e.target.value);
          setData({ ...data, deadline: e.target.value }); // ERROR IN EDIT TASK FORM -> after first change (sometimes):  A component is changing an uncontrolled input to be controlled
        }}
      />
      {/* <DatePicker
        // showIcon
        selected={new Date()}
        isClearable
        // placeholderText="Set deadline"
        shouldCloseOnSelect={true}
        // locale={navigator.language}
        locale="pl-PL"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="time"
        dateFormat="DD-MM-YYYY, HH:mm"
        onChange={(e) => {
          console.log(e.target.value);
          setData({ ...data, deadline: e.target.value });
        }}
      /> */}

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
