import React, { useState } from "react";
import { Media } from "react-bootstrap";
import styles from "../../styles/Review.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdown } from "../../components/MoreDropdown";
import ReviewEditForm from "./ReviewEditForm";
import { Card } from "react-bootstrap";

const Review = (props) => {
  const { id, user, created_at, comment, attendance, bring_this, age_recommendation,
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
    } catch (err) { }
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
              comment={comment}
              attendance={attendance}
              bring_this={bring_this}
              age_recommendation={age_recommendation}
              setReviews={setReviews}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <Card>
              {attendance !== null && (
                    <Card.Text><span className={styles.bold}>
                        Did you attend the playdate? </span>{attendance ? "Yes" : "No"}
                    </Card.Text>
                )}
              {comment && <Card.Text><span className={styles.bold}>Review: </span>{comment}</Card.Text>}
              {bring_this && <Card.Text><span className={styles.bold}>Do you recommend bringing anything? </span>{bring_this}</Card.Text>}
              {age_recommendation && <Card.Text><span className={styles.bold}>Recommended age group for this playdate? </span>{age_recommendation}</Card.Text>}
              
              </Card>
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