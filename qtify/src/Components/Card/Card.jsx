import React from "react";
import { Chip } from "@mui/material";
import styles from "./Card.module.css";

export default function Card({ image, title, follows }) {
  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img src={image} alt={title} className={styles.image} />
        <Chip
          label={`${follows} Follows`}
          className={styles.chip}
          size="small"
        />
      </div>
      <div className={styles.bottomSection}>
        <p className={styles.title}>{title}</p>
      </div>
    </div>
  );
}
