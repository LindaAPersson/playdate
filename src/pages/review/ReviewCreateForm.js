import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../../styles/PlaydatesCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { axiosRes } from "../../api/axiosDefaults";

function ReviewCreateForm(props) {
    const { playdate_post, setPlaydate_post, setReviews } = props;
    const [comment, setComment] = useState("");
    const [attendance, setAttendance] = useState("");
    const [bring_this, setBring_this] = useState("");
    const [age_recommendation, setAge_recommendation] = useState("");

    const handleChange = (event) => {
        const { name, value, checked } = event.target;
        switch (name) {
            case "comment":
                setComment(value);
                break;
            case "attendance":
                setAttendance(checked);
                break;
            case "bring_this":
                setBring_this(value);
                break;
            case "age_recommendation":
                setAge_recommendation(value);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const { data } = await axiosRes.post("/review/", {
                comment,
                attendance,
                bring_this,
                age_recommendation,
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
            setComment("");
            setAttendance(false);
            setBring_this("");
            setAge_recommendation("");
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
                        placeholder="my review..."
                        name="comment"
                        as="textarea"
                        value={comment}
                        onChange={handleChange}
                        rows={2}
                    />
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <InputGroup>
                    <Form.Check
                        className={styles.Form}
                        type="checkbox"
                        label="Attendance"
                        name="attendance"
                        checked={attendance}
                        onChange={handleChange}
                    />
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <InputGroup>
                    <Form.Control
                        className={styles.Form}
                        placeholder="bring this..."
                        name="bring_this"
                        type="text"
                        value={bring_this}
                        onChange={handleChange}
                    />
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <InputGroup>
                    <Form.Control
                        className={styles.Form}
                        placeholder="suitable age..."
                        name="age_recommendation"
                        type="text"
                        value={age_recommendation}
                        onChange={handleChange}
                    />
                </InputGroup>
            </Form.Group>
            <button
                className={`${styles.Button} btn d-block ml-auto`}

                type="submit"
            >
                post
            </button>
        </Form>
    );
}

export default ReviewCreateForm;