import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../../styles/CommentCreateEditForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import appStyle from "../../App.module.css"

function CommentCreateForm(props) {
  const { playdate_post, setPlaydate_post, setComments } = props;

  // State to manage the content of the comment
  const [content, setContent] = useState("");

  // Function to handle changes in the comment input field
  const handleChange = (event) => {
    setContent(event.target.value);
  };

  // Function to handle submission of the comment
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        playdate_post,
      });

      // Updating comments list by adding the new comment at the beginning
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));

      // Updating playdate post's comments count
      setPlaydate_post((prevPlaydate_post) => ({
        results: [
          {
            ...prevPlaydate_post.results[0],
            comments_count: prevPlaydate_post.results[0].comments_count + 1,
            
          },
        ],
      }));
      // Clearing the comment input field after submission
      setContent("");
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
      <Form.Label htmlFor="comments" className={appStyle.VisuallyHidden}>comments</Form.Label>
        <InputGroup>
          <Form.Control
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
            id="comments"
            value={content}
            onChange={handleChange}
            rows={2}
          />
        </InputGroup>
      </Form.Group>
      <button
        className={`${styles.Button} btn d-block ml-auto`}
        disabled={!content.trim()}
        type="submit"
      >
        post
      </button>
    </Form>
  );
}

export default CommentCreateForm;