import React from "react";
import styles from "../../styles/Playdate.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { axiosRes } from "../../api/axiosDefaults";
import appStyles from "../../App.module.css";

const Playdate = (props) => {
    const { id, title, date, location, description, prize, parent_stay_required, image, organizer,
        comments_count,
        created_at,
        time, suitable_age,
    } = props;

    const currentUser = useCurrentUser();
    const is_organizer = currentUser?.username === organizer;
    const history = useHistory();

    // Function to handle navigation to the playdate edit page
    const handleEdit = () => {
        history.push(`/playdate/${id}/edit`);
    };

    // Function to handle deletion of a playdate
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/playdate/${id}/`);
            history.push('/');
        } catch (err) {
            //console.log(err);
        }
    };

    // Check if the playdate has already taken place
    const hasTakenPlace = new Date(date) < new Date();

    return (
        <Card className={styles.Post}>

            <Link to={`/playdate/${id}`}>
                <Card.Img className={appStyles.Image} src={image} alt={title} />
            </Link>
            <Card.Body>
                {title && <Card.Title className={`text-center ${styles.bold}`}>{title}</Card.Title>}
                {description && <Card.Text><span className={styles.bold}>Description: </span>{description}</Card.Text>}
                {date && <Card.Text><span className={styles.bold}>Date: </span>{date}</Card.Text>}
                {time && <Card.Text><span className={styles.bold}>Time: </span>{time}</Card.Text>}
                {location && <Card.Text><span className={styles.bold}>Where: </span>{location}</Card.Text>}
                {prize && <Card.Text><span className={styles.bold}>Price: </span>{prize} SEK</Card.Text>}
                {suitable_age && <Card.Text><span className={styles.bold}>Suitable age: </span>{suitable_age}</Card.Text>}
                {parent_stay_required !== null && (
                    <Card.Text><span className={styles.bold}>
                        Parent stay Required: </span>{parent_stay_required ? "Yes" : "No"}
                    </Card.Text>
                )}
                {organizer && <Card.Text><span className={styles.bold}>Organizer: </span>{organizer}</Card.Text>}
                <div className={`text-left ${styles.createdAt}`}>
                    Created at: {created_at}
                    {is_organizer && (
                        <MoreDropdown
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    )}
                </div>
                <div>
                    <Link to={`/playdate/${id}`}>
                        <i className="far fa-comments" />
                    </Link>
                    {comments_count}
                    <span >
                    {hasTakenPlace &&
                        <Link to={`/playdate/${id}`} >
                            <i className={`fa-solid fa-pen ${styles.PostBar}`}></i>
                        </Link>
                    }
                    </span>
                </div>
            </Card.Body>
        </Card>
    );
};

export default Playdate;