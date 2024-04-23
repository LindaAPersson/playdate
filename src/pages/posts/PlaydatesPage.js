import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

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
    const [playdates, setPlaydates] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();
    const [query, setQuery] = useState("");

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };
    const handleClearDates = () => {
        setStartDate('');
        setEndDate('');
    };

    useEffect(() => {
        console.log("Selected start date:", startDate);
        console.log("Selected end date:", endDate);
        const fetchPlaydate = async () => {
            try {
                const queryParams = new URLSearchParams();
                queryParams.append('search', query);
                queryParams.append('filter', filter);
                const { data } = await axiosReq.get(`/playdate/?${filter}${queryParams}`);
                setPlaydates(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchPlaydate();
        }, 1000);

        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, pathname, startDate, endDate]);

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
            const { data } = await axiosReq.get(`/playdate/?${filter}${queryParams}`);
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
                    <Form.Control
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        type="text"
                        className="mr-sm-2"
                        placeholder="Search posts"
                    />

                </Form>
                <div className="d-flex align-items-center">
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
                    <button className={`${btnStyles.Button} ${btnStyles.Bright}`} onClick={handleFilterSubmit}>Filter</button>
                    <button className={`${btnStyles.Button} ${btnStyles.Bright}`} onClick={handleClearDates}>Clear Dates</button>
                </div>

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
                <p>Popular profiles for desktop</p>
            </Col>
        </Row>
    );
}

export default PlaydatesPage;