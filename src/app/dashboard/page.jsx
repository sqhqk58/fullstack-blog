"use client";
import { Table, Button, Stack } from "react-bootstrap";
import useSWR from "swr";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
const Dashboard = () => {
  const session = useSession();
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [editData, setEditData] = useState({
    id: "",
    name: "",
    email: "",
    password: "",
  });
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error, isLoading, mutate } = useSWR("/api/users", fetcher);
  if (error) return <div>Error while loading data</div>;
  if (isLoading) return <div>Loading...</div>;
  if (session.status === "unauthenticated") router.push("/login");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = async () => {
    try {
      await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      mutate();
    } catch (error) {
      console.log("Error");
    }
    handleClose();
  };
  const handleEdit = async () => {
    try {
      await fetch(`/api/users/${editData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });
      mutate();
    } catch (error) {
      console.log("Error");
    }
    setShowEdit(false);
  };
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/users/${id}`, {
        method: "DELETE",
      });
      mutate();
    } catch (error) {
      console.log("Error");
    }
  };
  return (
    <div>
      <Button className="mb-2 mt-2" onClick={handleShow}>
        Add new user
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item._id}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <Stack direction="horizontal" gap={2}>
                  <Button
                    variant="success"
                    onClick={() => {
                      setEditData(item);
                      setShowEdit(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Remove
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                placeholder="Ex: Nguyen Van A"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                placeholder="name@example.com"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={editData.name}
                onChange={(e) =>
                  setEditData({ ...editData, name: e.target.value })
                }
                placeholder="Ex: Nguyen Van A"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
                placeholder="name@example.com"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password"
                value={editData.password}
                onChange={(e) =>
                  setEditData({ ...editData, password: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Dashboard;
