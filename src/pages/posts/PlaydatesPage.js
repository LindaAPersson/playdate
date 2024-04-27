import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Playdate from "./Playdate";
import Asset from "../../components/Assets";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";
import styles from "../../styles/PlaydatesPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";


function PlaydatesPage({ message, filter = "" }) {
    // State for storing playdates data
    const [playdates, setPlaydates] = useState({ results: [] });
    // State to indicate if playdates have loaded
    const [hasLoaded, setHasLoaded] = useState(false);
    // Get current location
    const { pathname } = useLocation();
    // State for query search
    const [query, setQuery] = useState("");
    // State for start date and end date filter
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Handle start date change
    const handleStartDateChange = (date) => {
        setStartDate(date);
        setHasLoaded(false);
    };

    // Handle end date change
    const handleEndDateChange = (date) => {
        setEndDate(date);
        setHasLoaded(false);
    };

    // Handle clearing dates
    const handleClearDates = () => {
        setStartDate('');
        setEndDate('');
    };

    // Fetch playdates based on filter, query, and dates
    useEffect(() => {
        const fetchPlaydate = async () => {
            try {
                const queryParams = new URLSearchParams();
                queryParams.append('search', query);
                queryParams.append('filter', filter);
                const { data } = await axiosReq.get(`/playdate/?${filter}${queryParams}`);
                setPlaydates(data);
                setHasLoaded(true);
            } catch (err) {
                //console.log(err);
            }
        };
        // Fetch playdates after a delay to prevent rapid requests while typing
        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchPlaydate();
        }, 1000);
        // Clear timer on unmount
        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, pathname, startDate, endDate]);

    // Handle filter submit
    const handleFilterSubmit = async () => {
        try {
            const queryParams = new URLSearchParams();
            queryParams.append('search', query);
            queryParams.append('filter', filter);
            if (startDate) {
                queryParams.append('start_date', startDate);
            }
            if (endDate) {
                queryParams.append('end_date', endDate);
            }
            setHasLoaded(false);
            const { data } = await axiosReq.get(`/playdate/?${filter}&${queryParams}`);
            setPlaydates(data);
            setHasLoaded(true);
        } catch (err) {
            console.log(err);
        }

    };

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <i className={`fas fa-search ${styles.SearchIcon}`} />
                <Form
                    className={styles.SearchBar}
                    onSubmit={(event) => event.preventDefault()}   
                >
                    <Form.Label htmlFor='searchBar' className={appStyles.VisuallyHidden}>searchbar</Form.Label>
                    <Form.Control
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="text"
                        name="searchBar"
                        id="searchBar"
                        className="mr-sm-2"
                        placeholder="Search posts"
                    />

                </Form>
                <Col className="py-2 p-0 p-lg-2 d-flex align-items-centrum" lg={8}>
                <Form onSubmit={(event) => event.preventDefault()} >
                    <Form.Group className="mr-3">
                        <Form.Label htmlFor='startDate'>Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="startDate"
                            id="startDate"
                            value={startDate}
                            onChange={(e) => handleStartDateChange(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mr-3">
                        <Form.Label htmlFor='endDate'>End Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="endDate"
                            id="endDate"
                            value={endDate}
                            onChange={(e) => handleEndDateChange(e.target.value)}
                        />
                    </Form.Group>
                    <button className={`${btnStyles.Button} ${btnStyles.Filterbutton}`} onClick={handleFilterSubmit}>Filter</button>
                    <button className={`${btnStyles.Button} ${btnStyles.Filterbutton}`} onClick={handleClearDates}>Clear Dates</button>
                </Form>
                </Col>

                {hasLoaded ? (
                    <>
                        {playdates.results.length ? (
                            <InfiniteScroll
                                children={
                                    playdates.results.map((playdates) => (
                                        <Playdate key={playdates.id} {...playdates} setPlaydates={setPlaydates} />
                                    ))
                                }
                                dataLength={playdates.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!playdates.next}
                                next={() => fetchMoreData(playdates, setPlaydates)}
                            />
                        ) : (
                            <Container className={appStyles.Content}>
                                <Asset src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}

            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <Image className={styles.Image} src='https://res.cloudinary.com/dnjxdpdic/image/upload/v1713950941/calendar-8584340_1280_hzmvms.png' alt="image of calender"/>
            </Col>
        </Row >
    );
}

export default PlaydatesPage;