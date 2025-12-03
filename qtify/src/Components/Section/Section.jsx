import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import styles from "./Section.module.css";

export default function Section({ title = "Top Albums", apiEndpoint = "https://qtify-backend.labs.crio.do/albums/top" }) {
  const [albums, setAlbums] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(`${title} Data:`, data);
        setAlbums(data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching ${title}:`, err);
        setError(`Failed to load ${title}`);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbums();
  }, [apiEndpoint, title]);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleNextClick = () => {
    setCarouselIndex((prevIndex) => 
      prevIndex + 2 < albums.length ? prevIndex + 2 : prevIndex
    );
  };

  const handlePrevClick = () => {
    setCarouselIndex((prevIndex) => (prevIndex - 2 >= 0 ? prevIndex - 2 : 0));
  };

  const visibleAlbums = isCollapsed ? [] : albums.slice(carouselIndex, carouselIndex + 6);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <button
          className={styles.collapseButton}
          onClick={toggleCollapse}
        >
          {isCollapsed ? "Show All" : "Collapse"}
        </button>
      </div>

      {loading && <p className={styles.loading}>Loading albums...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!isCollapsed && !loading && albums.length > 0 && (
        <div className={styles.carouselContainer}>
          <button
            className={styles.navButton}
            onClick={handlePrevClick}
            disabled={carouselIndex === 0}
          >
            &#60;
          </button>
          <div className={styles.grid}>
            {visibleAlbums.map((album) => (
              <Card
                key={album.id}
                image={album.image}
                title={album.title}
                follows={album.follows}
              />
            ))}
          </div>
          <button
            className={styles.navButton}
            onClick={handleNextClick}
            disabled={carouselIndex + 2 >= albums.length}
          >
            &#62;
          </button>
        </div>
      )}
    </section>
  );
}
