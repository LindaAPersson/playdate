import React, { useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/PlaydatesCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { Image } from "react-bootstrap";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosReq } from "../../api/axiosDefaults";
import { useParams } from "react-router-dom/cjs/react-router-dom";
import { useEffect } from "react";

function PlaydatesEditForm() {
    const [errors, setErrors] = useState({});

    const [postData, setPostData] = useState({
        title: "",
        date: "",
        location: "",
        description: "",
        prize: "",
        parent_stay_required: "",
        image: "",
        time: "", 
        suitable_age: "",
    });
    const { title, date, location, description, prize, parent_stay_required, image, time, suitable_age, } = postData;
    const defaultImageUrl = 'https://res.cloudinary.com/dnjxdpdic/image/upload/v1712823894/media/images/default_posts_iajkjc.jpg'
    const imageInput = useRef(null);
    const history = useHistory();
    const { id } = useParams();
    const [selectedDefaultImage, setSelectedDefaultImage] = useState("");

    useEffect(() => {
      const handleMount = async () => {
        try {
          const { data } = await axiosReq.get(`/playdate/${id}/`);
          const { title, date, location, description, prize, parent_stay_required, image, time, suitable_age, is_organizer } = data;
  
          is_organizer ? setPostData({ title, date, location, description, prize, parent_stay_required, image, time, suitable_age }) : history.push("/");
        } catch (err) {
          console.log(err);
        }
      };
  
      handleMount();
    }, [history, id]);

    const handleChange = (event) => {
        setPostData({
            ...postData,
            [event.target.name]: event.target.value,
        });
    };

    const handleDefaultImageChange = (event) => {
        fetch(defaultImageUrl)
            .then((res) => res.blob())
            .then((myBlob) => {
                const myFile = new File([myBlob], 'default_image.jpg', { type: myBlob.type });
                setSelectedDefaultImage(myFile);
        })
        .catch((error) => {
            console.error('Error fetching default image:', error);
        });
    }

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setPostData({
                ...postData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const handleChangeCheckbox = (event) => {
        const { name, checked } = event.target;
        setPostData({
            ...postData,
            [name]: checked,
        });
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
   
        formData.append("title", title);
        formData.append("date", date);
        formData.append("time", time);
        formData.append("location", location);
        formData.append("description", description);
        formData.append("prize", prize);
        formData.append("suitable_age", suitable_age);
        formData.append("parent_stay_required", parent_stay_required);

        if (imageInput?.current?.files[0]) {
            formData.append("image", imageInput.current.files[0]);
          }

        try {
            await axiosReq.put(`/playdate/${id}`, formData);
            history.push(`/playdate/${id}`);
        } catch (err) {
            console.log(err);
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    const textFields = (
        <div className="text-center">
            <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.title?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="date">
                <Form.Label>Date</Form.Label>
                <Form.Control
                    type="date"
                    name="date"
                    value={date}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.date?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="time">
                <Form.Label>Time</Form.Label>
                <Form.Control
                    type="time"
                    name="time"
                    value={time}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.time?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}
            <Form.Group controlId='location'>
                <Form.Label>Location</Form.Label>
                <Form.Control
                    type="text"
                    name="location"
                    value={location}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.location?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={6}
                    name="description"
                    value={description}
                    onChange={handleChange}
                />
            </Form.Group>
            {errors.description?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="prize">
                <Form.Label>Price</Form.Label>
                <Form.Control
                    type="number"
                    name="prize"
                    value={prize}
                    onChange={handleChange}
                    placeholder="Enter prize amount"
                />
            </Form.Group>
            {errors.prize?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="suitable_age">
                <Form.Label>Suitable Age</Form.Label>
                <Form.Control
                    as="select"
                    name="suitable_age"
                    value={suitable_age}
                    onChange={handleChange}
                >
                    <option value="">Select Age</option>
                    <option value="all">All Ages</option>
                    <option value="infant">Infant (0-2 years)</option>
                    <option value="toddler">Toddler (2-5 years)</option>
                    <option value="child">Child (5-12 years)</option>
                    <option value="teenager">Teenager (13-18 years)</option>

                </Form.Control>
            </Form.Group>
            {errors.suitable_age?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}
            <Form.Group controlId="parent_stay_required">
                <Form.Label>Parent Stay Required</Form.Label>
                <Form.Control
                    type="checkbox"
                    name="parent_stay_required"
                    checked={parent_stay_required}
                    onChange={handleChangeCheckbox}
                />
            </Form.Group>
            {errors.parent_stay_required?.map((message, idx) => (
                <Alert key={idx} variant="warning">
                    {message}
                </Alert>
            ))}

            <Button
                className={`${btnStyles.Button} ${btnStyles.Blue}`}
                onClick={() => history.goBack()}
            >
                cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Blue}`} type="submit">
                Change
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            
                                    <figure>
                                        <Image className={appStyles.Image} src={image} rounded />
                                    </figure>
                                    <div>
                                        <Form.Label
                                            className={`${btnStyles.Button} ${btnStyles.Blue} btn`}
                                            htmlFor="image-upload"
                                        >
                                            Change the image
                                        </Form.Label>
                                    </div>
                                    <Form.Group className={`${styles.defultImg} text-left`}>
                                <Form.Label className="text-left">Select Default Image:</Form.Label>
                                
                                    <Form.Control
                                        type="checkbox"
                                        value={selectedDefaultImage}
                                        onChange={handleDefaultImageChange}
                                    >
                                    </Form.Control>
                                </Form.Group>

                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />
                        </Form.Group>
                        {errors?.image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
            </Row>
        </Form>
    );
}

export default PlaydatesEditForm;