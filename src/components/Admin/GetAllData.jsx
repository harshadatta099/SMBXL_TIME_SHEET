import React, { useState, useEffect } from "react";
import { Table, Form, Container } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../Style.css";
import { BASE_URL } from "../../services/API";
const GetAllData = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${BASE_URL}/Admin/GetAllUsers`)
      .then((response) => {
        setUsersData(response.data);
        setFilteredUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this User?"))
      axios
        .delete(
          `${BASE_URL}/Admin/deleteUserByUserId?userid=${userId}`
        )
        .then((response) => {
          setUsersData((prevUsers) =>
            prevUsers.filter((user) => user.userId !== userId)
          );
          setFilteredUsers((prevFilteredUsers) =>
            prevFilteredUsers.filter((user) => user.userId !== userId)
          );
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
  };

  const handleSearchChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);

    const filtered = usersData.filter((user) =>
      user.username.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleUserRowClick = (userId) => {
    navigate(`/user-details?userId=${userId}`);
    setSelectedUserId(userId);
    console.log("selectedUserId", selectedUserId);
  };

  return (
    <Container>
      <Form className="my-3">
        <Form.Label>
          <div className="fs-5">USER DATA:</div>
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Search by username..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </Form>
      <Table striped bordered hover className="text-center">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr
              key={user.userId}
              
            >
              <td onClick={() => handleUserRowClick(user.userId)}>{user.userId}</td>
              <td onClick={() => handleUserRowClick(user.userId)}>{user.username}</td>
              <td onClick={() => handleUserRowClick(user.userId)}>{user.email}</td>
              <td onClick={() => handleUserRowClick(user.userId)}>{user.mobileno}</td>
              <td>
                <div>
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "#FF0000", cursor: "pointer" }}
                    onClick={() => handleDeleteUser(user.userId)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default GetAllData;
