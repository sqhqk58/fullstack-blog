"use client";
import AppContext from "@/context/AppContext";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

const Blog = () => {
  const { setBreadcumbs } = useContext(AppContext);
  const router = useRouter();
  useEffect(() => {
    setBreadcumbs([
      {
        name: "Home",
        link: "/",
      },
      {
        name: "Blog",
        link: "/blog",
      },
    ]);
  }, []);
  return (
    <Row>
      <Col lg={3}>
        <Card style={{ width: "18rem" }}>
          <div className={styles.imgContainer}>
            <Image
              src="https://images.pexels.com/photos/28248795/pexels-photo-28248795/free-photo-of-elma-kurutma.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
              alt=""
              fill={true}
              className={styles.img}
            />
          </div>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card content.
            </Card.Text>
            <Button variant="primary" onClick={() => router.push(`/blog/21`)}>
              View Post
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default Blog;
