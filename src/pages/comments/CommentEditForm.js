import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/CommentCreateEditForm.module.css";
import appStyle from "../../App.module.css"

function CommentEditForm(props) {
  // Destructuring props to extract necessary data
  const { id, content, setShowEditForm, setComments } = props;

  // State to manage the content of the form
  const [formContent, setFormContent] = useState(content);

  // Function to handle changes in the content of the form
  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  // Function to handle submission of the edited comment
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/comments/${id}/`, {
        content: formContent.trim(),
      });
      // Updating the comments list with the edited comment
      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
                ...comment,
                content: formContent.trim(),
                updated_at: "now",
              }
            : comment;
        }),
      }));
      // Closing the edit form after submission
      setShowEditForm(false);
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="pr-1">
      <Form.Label htmlFor="comments" className={appStyle.VisuallyHidden}>comments</Form.Label>
        <Form.Control
          className={styles.Form}
          as="textarea"
          id="comments"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />
      </Form.Group>
      <div className="text-right">
        <button
          className={styles.Button}
          onClick={() => setShowEditForm(false)}
          type="button"
        >
          cancel
        </button>
        <button
          className={styles.Button}
          disabled={!content.trim()}
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default CommentEditForm;