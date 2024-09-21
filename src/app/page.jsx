"use client";
import styles from "./page.module.css";
import { Button } from "react-bootstrap";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AppContext from "@/context/AppContext";
import React, { useContext, useEffect } from "react";
export default function Home() {
  const router = useRouter();
  const { setBreadcumbs } = useContext(AppContext);
  useEffect(() => {
    setBreadcumbs([
      {
        name: "Home",
        link: "/",
      },
    ]);
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.section_1}>
        <h1>Sample Blog with NEXT JS</h1>
        <p>This is sample blog using NEXTJS</p>
        <div className={styles.btnGroup}>
          <Button onClick={() => router.push("/about")}>About</Button>
          <Button variant="light">See blogs</Button>
        </div>
      </div>
      <div className={styles.section_2}>
        <Image
          className={styles.img}
          alt="hero"
          src="https://images.pexels.com/photos/8664793/pexels-photo-8664793.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          fill={true}
        />
      </div>
    </div>
  );
}
