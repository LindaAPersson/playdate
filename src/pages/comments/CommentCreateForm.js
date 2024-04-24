import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../../styles/CommentCreateEditForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";

function CommentCreateForm(props) {
  const { playdate_post, setPlaydate_post, setComments } = props;
  const [content, setContent] = useState("");

  const handleChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await axiosRes.post("/comments/", {
        content,
        playdate_post,
      });
      setComments((prevComments) => ({
        ...prevComments,
        results: [data, ...prevComments.results],
      }));
      setPlaydate_post((prevPlaydate_post) => ({
        results: [
          {
            ...prevPlaydate_post.results[0],
            comments_count: prevPlaydate_post.results[0].comments_count + 1,
            
          },
        ],
      }));
      setContent("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      <Form.Group>
        <InputGroup>
          <Form.Control
            className={styles.Form}
            placeholder="my comment..."
            as="textarea"
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