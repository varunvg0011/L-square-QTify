import React, { useState, useEffect } from "react";
import Card from "../Card/Card";
import styles from "./Section.module.css";

export default function Section() {
  const [albums, setAlbums] = useState([]);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTopAlbums = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://qtify-backend.labs.crio.do/albums/top"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Top Albums Data:", data);
        setAlbums(data);
        setError(null);
      } catch (err) {
        console.error("Error fetching top albums:", err);
        setError("Failed to load albums");
      } finally {
        setLoading(false);
      }
    };

    fetchTopAlbums();
  }, []);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Top Albums</h2>
        <button
          className={styles.collapseButton}
          onClick={toggleCollapse}
        >
          {isCollapsed ? "Show" : "Collapse"}
        </button>
      </div>

      {loading && <p className={styles.loading}>Loading albums...</p>}
      {error && <p className={styles.error}>{error}</p>}

      {!isCollapsed && !loading && albums.length > 0 && (
        <div className={styles.grid}>
          {albums.map((album) => (
            <Card
              key={album.id}
              image={album.image}
              title={album.title}
              follows={album.follows}
            />
          ))}
        </div>
      )}
    </section>
  );
}
