import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import styles from "../../styles/ReviewCreateEditForm.module.css";
import { axiosRes } from "../../api/axiosDefaults";
import appStyle from "../../App.module.css"

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
                setAttendance(checked ? true : false);
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
            
            setComment("");
            setAttendance(false);
            setBring_this("");
            setAge_recommendation("");
        } catch (err) {
            //console.log(err);
        }
    }

    return (
        <Form className="mt-2" onSubmit={handleSubmit}>
            <Form.Group >
            <Form.Label htmlFor="comment" className={appStyle.VisuallyHidden}>My review</Form.Label>
                <InputGroup >
                <Form.Control
                        className={styles.Form}
                        placeholder="My review..."
                        name="comment"
                        id="comment"
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
                        label="Did you attend the playdate?"
                        name="attendance"
                        id="attendance"
                        checked={attendance}
                        onChange={handleChange}
                    />
                </InputGroup>
            </Form.Group>
            <Form.Group>
            <Form.Label htmlFor="bring_this" className={appStyle.VisuallyHidden}>bring_this</Form.Label>
                <InputGroup>
                    <Form.Control
                        className={styles.Form}
                        placeholder="Bring this..."
                        name="bring_this"
                        id="bring_this"
                        type="text"
                        value={bring_this}
                        onChange={handleChange}
                    />
                </InputGroup>
            </Form.Group>
            <Form.Group>
            <Form.Label htmlFor="age_recommendation" className={appStyle.VisuallyHidden}>age_recommendation</Form.Label>
                <InputGroup>
                    <Form.Control
                        className={styles.Form}
                        placeholder="What age group would you recommend?"
                        name="age_recommendation"
                        id="age_recommendation"
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