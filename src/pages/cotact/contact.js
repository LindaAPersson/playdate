import React, { useState } from "react";
import axios from "axios";

import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Container from "react-bootstrap/Container";
import styles from "../../styles/SignInUpForm.module.css";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

function ContactForm() {

    const [contactData, setContactData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const { name, email, subject, message } = contactData;
    const [errors, setErrors] = useState({});
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("/contact/", contactData);
            history.push("/");
        } catch (err) {
            setErrors(err.response?.data);
        }
    };

    const handleChange = (event) => {
        setContactData({
            ...contactData,
            [event.target.name]: event.target.value,
        });
    };

    return (
        <Row className={styles.Row}>
            <Col className="my-auto p-0 p-md-2" md={6}>
                <Container className={`${appStyles.Content} p-4 `}>
                    <h1 className={styles.Header}>Contact</h1>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label htmlFor="name">Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.name?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}

                        <Form.Group>
                            <Form.Label htmlFor="email">Email</Form.Label>
                            <Form.Control
                                type="text"
                                name="email"
                                id="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.email?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Form.Group>
                            <Form.Label htmlFor="subject">Subject</Form.Label>
                            <Form.Control
                                type="text"
                                name="subject"
                                id="subject"
                                value={subject}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.subject?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Form.Group>
                            <Form.Label htmlFor="message">Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="message"
                                id="message"
                                value={message}
                                onChange={handleChange}
                                rows={6}
                            />
                        </Form.Group>
                        {errors.message?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Bright}`}
                            type="submit"
                        >
                            Send
                        </Button>
                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert key={idx} variant="warning" className="mt-3">
                                {message}
                            </Alert>
                        ))}
                    </Form>
                </Container>

            </Col>
            <Col
                md={6}
                className={`my-auto d-none d-md-block p-2 ${styles.SignInCol}`}
            >
                <Image
                    className={`${appStyles.FillerImage}`}
                    src='https://res.cloudinary.com/dnjxdpdic/image/upload/v1713771236/media/images/drawing-2009817_1280_x70ega.jpg'
                    alt="Spacer image of child drawing"
                />
            </Col>
        </Row>
    );
}

export default ContactForm;