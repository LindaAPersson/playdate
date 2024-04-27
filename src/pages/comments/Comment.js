import React, { useState } from "react";
import Media from "react-bootstrap/Media";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser  } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import CommentEditForm from "./CommentEditForm";

const Comment = (props) => {
  const { user, created_at, content, id,
    setPlaydate_post,
    setComments } = props;

  // State to manage whether the edit form should be displayed
  const [showEditForm, setShowEditForm] = useState(false);

   // Accessing current user from context
  const currentUser = useCurrentUser();

  // Checking if the current user is the owner of the comment
  const is_user = currentUser?.username === user;

  // Function to handle comment deletion
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      // Updating playdate post's comments count
      setPlaydate_post((prevPlaydate_post) => ({
        results: [
          {
            ...prevPlaydate_post.results[0],
            comments_count: prevPlaydate_post.results[0].comments_count - 1,
          },
        ],
      }));

      // Updating comments list by removing the deleted comment
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