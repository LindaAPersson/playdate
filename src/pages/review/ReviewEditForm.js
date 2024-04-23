import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { axiosRes } from "../../api/axiosDefaults";
import styles from "../../styles/CommentCreateEditForm.module.css";

function ReviewEditForm(props) {
  const { id, user, created_at, playdate_post, comment, attendance, bring_this, age_recommendation,
    setShowEditForm,
    setReviews, ...initialValues } = props;

  const [formContent, setFormContent] = useState(
    {
      comment: initialValues.comment || "",
    attendance: initialValues.attendance || false,
    bring_this: initialValues.bring_this || "",
    age_recommendation: initialValues.age_recommendation || "",
    }

  );

  const handleChange = (event) => {

    setFormContent({
      ...formContent,
      [event.target.name]: event.target.value,
  });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosRes.put(`/review/${id}/`, {

      });
      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.map((review) => {
          return review.id === id
            ? {
              ...review,
              ...formContent,

              updated_at: "now",
            }
            : review;
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
          value={formContent.comment}
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
          checked={formContent.attendance}
          onChange={handleChange}
        />

      </Form.Group>
      <Form.Group>

        <Form.Control
          className={styles.Form}
          placeholder="bring this..."
          name="bring_this"
          type="text"
          value={formContent.bring_this}
          onChange={handleChange}
        />

      </Form.Group>
      <Form.Group>

        <Form.Control
          className={styles.Form}
          placeholder="suitable age..."
          name="age_recommendation"
          type="text"
          value={formContent.age_recommendation}
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