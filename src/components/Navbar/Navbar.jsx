"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Link from "next/link";
import { Breadcrumb } from "react-bootstrap";
import { useContext } from "react";
import AppContext from "@/context/AppContext";
import { useRouter } from "next/navigation";

function MainNav() {
  const { breadcrumbs } = useContext(AppContext);
  const router = useRouter();
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>
            <Link href="/" className="nav-link">
              Fullstack VN
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/about" className="nav-link">
                About us
              </Link>
              <Link href="/blog" className="nav-link">
                Blog
              </Link>
              <Link href="/dashboard" className="nav-link">
                Dashboard
              </Link>
              <Link href="/dashboard" className="nav-link">
                Log in
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        {breadcrumbs.length > 1 && (
          <Breadcrumb>
            {breadcrumbs.map((item, index) => (
              <Breadcrumb.Item
                key={index}
                onClick={() => router.push(`/${item.link}`)}
                active={index === breadcrumbs.length - 1}
              >
                {item.name}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        )}
      </Container>
    </div>
  );
}

export default MainNav;
