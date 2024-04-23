import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../../styles/PlaydatesCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import styles from "../../styles/CommentCreateEditForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";

function ReviewCreateForm(props) {
    const { playdate_post, setPlaydate_post, setReviews } = props;
    const [postData, setPostData] = useState({
        comment: "",
        attendance: "",
        bring_this: "",
        age_recommendation: "",
    });
    const { comment, attendance, bring_this, age_recommendation, } = postData;

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append("comment", comment);
        formData.append("attendance", attendance);
        formData.append("bring_this", bring_this);
        formData.append("age_recommendation", age_recommendation);
        try {
            const { data } = await axiosRes.post("/review/", {
                formData,
                playdate_post,
            });
            setReviews((prevReviews) => ({
                ...prevReviews,
                results: [data, ...prevReviews.results],
            }));
            setPlaydate_post((prevPlaydate_post) => ({
                results: [
                    {
                        ...prevPlaydate_post.results[0],

                    },
                ],
            }));
            setReviews("");
        } catch (err) {
            console.log(err);
        }
    };

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label htmlFor="comment">Review</Form.Label>
                <Form.Control
                    type="text"
                    id="comment"
                    name="comment"
                    value={comment}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
            {errors.comment?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label htmlFor="attendance">Attendance</Form.Label>
                <Form.Control
                    type="checkbox"
                    id="attendance"
                    name="attendance"
                    value={attendance}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.attendance?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label htmlFor="bring_this">Bring this:</Form.Label>
                <Form.Control
                    type="text"
                    id="bring_this"
                    name="bring_this"
                    value={bring_this}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
            {errors.bring_this?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label htmlFor="age_recommendation">Suitable age</Form.Label>
                <Form.Control
                    type="text"
                    id="age_recommendation"
                    name="age_recommendation"
                    value={age_recommendation}
                    onChange={handleChange}
                    rows={2}
                />
            </Form.Group>
            {errors.age_recommendation?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}
        </div>
    );


    return (
        <Form className="mt-2" onSubmit={handleSubmit}>
            <div className="d-md-none">{textFields}</div>
            <button
                className={`${styles.Button} btn d-block ml-auto`}
                disabled={!content.trim()}
                type="submit"
            >
                post
            </button>
            <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
        </Form>
    );
}

export default ReviewCreateForm;