import Button from "../components/Button";
import { useState } from "react";
import styles from "./TaskEditForm.module.css";
import { useFormStore } from "../store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import ModalTaskWindow from "./ModalTaskWindow";
import Form from "./Form";

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
    <ModalTaskWindow onClickClose={closeEditForm} header={"Edit Task:"}>
      <Form data={editedData} setData={setEditedData}></Form>
      <div className={styles.form_buttons_container}>
        <Button
          onClick={() => {
            setEditedData(originalData); //IN EDIT TASK FORM ->  problem with Deadline & Notes: changing a controlled input to be uncontrolled OR SOMETIMES: react-dom_client.js?v=d9375227:1458 The specified value "2025-03-15T00:00:00.000Z" does not conform to the required format, "yyyy-MM-dd".
            console.log(taskData);
          }}
        >
          Undo changes
        </Button>
        <Button
          onClick={() => {
            editMutation.mutate(editedData);
            console.log("Edited data", editedData);
            closeEditForm();
          }}
        >
          Save
        </Button>
      </div>
    </ModalTaskWindow>
  );
}

export default TaskEditForm;
