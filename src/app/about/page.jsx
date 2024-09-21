"use client";
import React, { useContext, useEffect } from "react";
import styles from "./page.module.css";
import AppContext from "@/context/AppContext";
const About = () => {
  const { breadcrumbs, setBreadcumbs } = useContext(AppContext);
  useEffect(() => {
    setBreadcumbs([
      {
        name: "Home",
        link: "/",
      },
      {
        name: "About us",
        link: "/about",
      },
    ]);
  }, []);
  return (
    <div className={styles.container}>
      <h1>This website using following technologies:</h1>
      <ul>
        <li>NEXTJS 14</li>
        <li>UI Using React Boostrap</li>
        <li>Database using MongoDB</li>
      </ul>
    </div>
  );
};

export default About;
