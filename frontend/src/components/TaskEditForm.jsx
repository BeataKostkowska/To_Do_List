import { useState } from "react";
import styles from "./TaskEditForm.module.css";
import { useFormStore } from "../store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function TaskEditForm() {
  const taskData = useFormStore((state) => state.taskData);
  const closeEditForm = useFormStore((state) => state.closeEditForm);

  const originalData = taskData;
  const [editedData, setEditedData] = useState(originalData);

  const queryClient = useQueryClient();
  const editMutation = useMutation({
    mutationFn: (editedData) => {
      return axios.patch(
        `http://localhost:3000/api/tasks/${taskData._id}`,
        editedData
      );
    },
    onError: (error) => {
      console.error(error);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(["tasks"]);
      console.log("Task edited successfully ", data);
    },
  });

  return (
    <div className={styles.page_container}>
      <div className={styles.form_container}>
        <button className={styles.close_button} onClick={closeEditForm}>
          X
        </button>
        <h2>Edit Task:</h2>

        <form>
          <label htmlFor="taskName">Task description:</label>
          <input
            id="taskName"
            type="text"
            required={true}
            value={editedData.taskName}
            onChange={(e) =>
              setEditedData({ ...editedData, taskName: e.target.value })
            }
          />

          <label htmlFor="deadline">Deadline:</label>
          <input
            id="deadline"
            type="date"
            value={editedData.deadline}
            onChange={(e) => {
              console.log(e.target.value);
              setEditedData({ ...editedData, deadline: e.target.value }); // ERROR after first change (sometimes):  A component is changing an uncontrolled input to be controlled
            }}
          />

          <label htmlFor="priority">Priority level:</label>
          <input
            id="priority"
            type="text"
            value={editedData.priority}
            onChange={(e) =>
              setEditedData({ ...editedData, priority: e.target.value })
            }
          />

          <label htmlFor="notes">Additional notes:</label>
          <textarea
            id="notes"
            type="text"
            value={editedData.notes}
            onChange={(e) =>
              setEditedData({ ...editedData, notes: e.target.value })
            }
          />

          <label htmlFor="tags">Tags:</label>
          <input
            id="tags"
            type="text"
            value={editedData.tags}
            onChange={(e) =>
              setEditedData({ ...editedData, tags: e.target.value })
            }
          />
        </form>

        <div className={styles.form_buttons_container}>
          <button
            className={styles.edit_form_buttons}
            onClick={() => {
              setEditedData(originalData); // problem with Deadline & Notes: changing a controlled input to be uncontrolled OR SOMETIMES: react-dom_client.js?v=d9375227:1458 The specified value "2025-03-15T00:00:00.000Z" does not conform to the required format, "yyyy-MM-dd".
              console.log(taskData);
            }}
          >
            Undo changes
          </button>
          <button
            className={styles.edit_form_buttons}
            onClick={() => {
              editMutation.mutate(editedData);
              console.log("Edited data", editedData);
              closeEditForm();
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskEditForm;
