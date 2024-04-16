import React from "react";
import { Media } from "react-bootstrap";
import styles from "../../styles/Comment.module.css";

const Comment = (props) => {
  const { user, created_at, content } = props;

  return (
    <div>
      <hr />
      <Media>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{user}</span>
          <span className={styles.Date}>{created_at}</span>
          <p>{content}</p>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Comment;