import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Card } from "react-bootstrap";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser  } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import ReviewEditForm from "./ReviewEditForm";

const Review = (props) => {
  const { id, user, created_at, playdate_post, comment, attendance, bring_this, age_recommendation,
    setPlaydate_post,
    setReviews } = props;

  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_user = currentUser?.username === user;

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/review/${id}/`);
      setPlaydate_post((prevPlaydate_post) => ({
        results: [
          {
            ...prevPlaydate_post.results[0],
          },
        ],
      }));

      setReviews((prevReviews) => ({
        ...prevReviews,
        results: prevReviews.results.filter((review) => review.id !== id),
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
            <ReviewEditForm 
            id={id}
            content={comment}
            setComments={setReviews}
            setShowEditForm={setShowEditForm}
            />
          ) : (
            <Card.Body>
                {attendance && <Card.Text><span className={styles.bold}>Attendance: </span>{attendance}</Card.Text>}
                {comment && <Card.Text><span className={styles.bold}>Comment: </span>{comment}</Card.Text>}
                {bring_this && <Card.Text><span className={styles.bold}>bring_this: </span>{bring_this}</Card.Text>}
                {age_recommendation && <Card.Text><span className={styles.bold}>age_recommendation: </span>{age_recommendation}</Card.Text>}
            </Card.Body>
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

export default Review;