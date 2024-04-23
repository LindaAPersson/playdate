import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/CommentCreateEditForm.module.css";

function ReviewEditForm(props) {
  const { id, user, created_at, playdate_post, comment, attendance, bring_this, age_recommendation,
    setShowEditForm,
    setReviews } = props;

  const [formContent, setFormContent] = useState(
    comment,
    attendance,
    bring_this,
    age_recommendation,

  );

  const handleChange = (event) => {
    setFormContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axiosRes.put(`/review/${id}/`, {
        comment: formContent.trim(),
        attendance: formContent.trim(),
        bring_this: formContent.trim(),
        age_recommendation: formContent.trim(),
      });
      setReviews((prevComments) => ({
        ...prevComments,
        results: prevComments.results.map((comment) => {
          return comment.id === id
            ? {
              ...comment,
              comment: formContent.trim(),
              attendance: formContent.trim(),
              bring_this: formContent.trim(),
              age_recommendation: formContent.trim(),
              updated_at: "now",
            }
            : comment;
        }),
      }));
      setShowEditForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>

        <Form.Control
          className={styles.Form}
          placeholder="my review..."
          name="comment"
          as="textarea"
          value={formContent}
          onChange={handleChange}
          rows={2}
        />

      </Form.Group>
      <Form.Group>

        <Form.Check
          className={styles.Form}
          type="checkbox"
          label="Attendance"
          name="attendance"
          checked={formContent}
          onChange={handleChange}
        />

      </Form.Group>
      <Form.Group>

        <Form.Control
          className={styles.Form}
          placeholder="bring this..."
          name="bring_this"
          type="text"
          value={formContent}
          onChange={handleChange}
        />

      </Form.Group>
      <Form.Group>

        <Form.Control
          className={styles.Form}
          placeholder="suitable age..."
          name="age_recommendation"
          type="text"
          value={formContent}
          onChange={handleChange}
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
          type="submit"
        >
          save
        </button>
      </div>
    </Form>
  );
}

export default ReviewEditForm;