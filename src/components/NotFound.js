import React from "react";
import NoResults from "../assets/no-results.png";
import Asset from "./Assets";
import styles from "../styles/NotFound.module.css";

// 404 page
const NotFound = () => {
  return (
    <div className={styles.Margin}>
      <Asset
        src={NoResults}
        message={`Sorry, the page you're looking for doesn't exist`}
      />
    </div>
  );
};

export default NotFound;