import React, { useState } from "react";
import { Media } from "react-bootstrap";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser  } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import CommentEditForm from "./CommentEditForm";

const Comment = (props) => {
  const { user, created_at, content, id,
    setPlaydate_post,
    setComments } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_user = currentUser?.username === user;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setPlaydate_post((prevPlaydate_post) => ({
        results: [
          {
            ...prevPlaydate_post.results[0],
            comments_count: prevPlaydate_post.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {}
  };

  return (
    <div>
      <hr />
      <Media>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{user}</span>
          <span className={styles.Date}>{created_at}</span>
          {showEditForm ? (
            <CommentEditForm 
            id={id}
            content={content}
            setComments={setComments}
            setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_user && !showEditForm && (
          <MoreDropdown
            handleEdit={() => setShowEditForm(true)}
            handleDelete={handleDelete}
          />
        )}
      </Media>
    </div>
  );
};

export default Comment;