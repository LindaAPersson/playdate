import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Playdate from "./Playdate"
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Assets";
import { fetchMoreData } from "../../utils/utils";
import Comment from "../comments/Comment";
import Review from "../review/Review"
import ReviewCreateForm from "../review/ReviewCreateForm";
import styles from "../../styles/PlaydatesPage.module.css"
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'

function PlaydatePage() {
  const { id } = useParams();
  const [playdate, setPlaydate] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const [comments, setComments] = useState({ results: [] });
  const [reviews, setReviews] = useState({ results: [] });

  const hasTakenPlace = playdate.results.length > 0 && new Date(playdate.results[0].date) < new Date();

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: playdate }, { data: comments }, { data: reviews }] = await Promise.all([
          axiosReq.get(`/playdate/${id}`),
          axiosReq.get(`/comments/?playdate_post=${id}`),
          axiosReq.get(`/review/?playdate_post=${id}`)
        ]);
        setPlaydate({ results: [playdate] });
        setComments(comments);
        setReviews(reviews);
      } catch (err) {
        //console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">

      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <Playdate {...playdate.results[0]} setPlaydate={setPlaydate} PlaydatePage />
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Comments!
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>

                <Container className={appStyles.Content}> {currentUser ? (
                  <CommentCreateForm
                    user={currentUser.user}
                    playdate_post={id}
                    setPlaydate={setPlaydate}
                    setComments={setComments}
                  />
                ) : comments.results.length ? (
                  "Comments"
                ) : null}
                  {comments.results.length ? (
                    <InfiniteScroll
                      children={comments.results.map((comment) => (
                        <Comment
                          key={comment.id}
                          {...comment}
                          setPlaydate_post={setPlaydate}
                          setComments={setComments}
                        />
                      ))}
                      dataLength={comments.results.length}
                      loader={<Asset spinner />}
                      hasMore={!!comments.next}
                      next={() => fetchMoreData(comments, setComments)}
                    />

                  ) : currentUser ? (
                    <span>No comments yet, be the first to comment!</span>
                  ) : (
                    <span>No comments... yet</span>
                  )}
                </Container>

              </Card.Body>
            </Accordion.Collapse>
          </Card>
          {hasTakenPlace &&(
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Review!
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>

                <Container className={appStyles.Content}> {currentUser ? (
                  <ReviewCreateForm
                    user={currentUser.user}
                    playdate_post={id}
                    setPlaydate={setPlaydate}
                    setReviews={setReviews}
                  />
                ) : reviews.results.length ? (
                  "Reviews"
                ) : null}
                  {reviews.results.length ? (
                    <InfiniteScroll
                      children={reviews.results.map((review) => (
                        <Review
                          key={review.id}
                          {...review}
                          setPlaydate_post={setPlaydate}
                          setReviews={setReviews}
                        />
                      ))}
                      dataLength={reviews.results.length}
                      loader={<Asset spinner />}
                      hasMore={!!reviews.next}
                      next={() => fetchMoreData(reviews, setReviews)}
                    />

                  ) : currentUser ? (
                    <span>No reviews yet, be the first to leave one!</span>
                  ) : (
                    <span>No reviews... yet</span>
                  )}
                </Container>
              </Card.Body>
            </Accordion.Collapse>
          </Card> 
)}
        </Accordion>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        <Image className={styles.Image} src='https://res.cloudinary.com/dnjxdpdic/image/upload/v1713950941/calendar-8584340_1280_hzmvms.png' alt="image of calender"/>
      </Col>
    </Row>
  );
}

export default PlaydatePage;