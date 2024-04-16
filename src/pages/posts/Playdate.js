import React from "react";
import styles from "../../styles/Post.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefaults";

const Playdate = (props) => {
    const { id, title, date, location, description, prize, parentStayRequired, image, organizer,
        comments_count,
        created_at,
        PlaydatePage,
    } = props;

    const currentUser = useCurrentUser();
    const is_organizer = currentUser?.username === organizer;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/playdate/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
          await axiosRes.delete(`/playdate/${id}/`);
          history.goBack();
        } catch (err) {
          console.log(err);
        }
    };

    return (
        <Card className={styles.Post}>

            <Link to={`/playdate/${id}`}>
                <Card.Img src={image} alt={title} />
            </Link>
            <Card.Body>
                
                

                {title && <Card.Title className="text-center">{title}</Card.Title>}
                {description && <Card.Text>Description: {description}</Card.Text>}
                {date && <Card.Text>Date: {date}</Card.Text>}
                {location && <Card.Text>Where: {location}</Card.Text>}
                {prize && <Card.Text>Prize: {prize} SEK</Card.Text>}
                {parentStayRequired && <Card.Text>Parent stay Required: {parentStayRequired}</Card.Text>}
                {organizer && <Card.Text>Organizer: {organizer}</Card.Text>}
                <span>Created at: {created_at}</span>
                {is_organizer && PlaydatePage && <MoreDropdown
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />}
                <div className={styles.PostBar}>
                    <Link to={`/playdate/${id}`}>
                        <i className="far fa-comments" />
                    </Link>
                    {comments_count}
                </div>
            </Card.Body>
        </Card>
    );
};

export default Playdate;