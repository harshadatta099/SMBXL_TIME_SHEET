import React, { useEffect, useState } from "react";
import { Container, Table, Button, Modal, Form,Alert } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  editTaskByTimesheetId,
  deleteTimesheetByTimesheetId,
  fetchAllActivities,
  fetchAllProjects,
  getUserDataForWeek,
} from "../../services/API";

const EditDeleteData = () => {
  const userId = localStorage.getItem("userId");
  const today = new Date();
  const inputDate = today.toISOString().slice(0, 10);

  const [tasksData, setTasksData] = useState([]);
  const [projectNames, setProjectNames] = useState([]);
  const [activityNames, setActivityNames] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [relatedActivities, setRelatedActivities] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editedTask, setEditedTask] = useState({
    timeSheetId: null,
    task: "",
    hours: 0,
    createdDate: "",
    projectId: 0,
    userId: 0,
    activityId: 0,
  });

  const generateWeekDates = () => {
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay() + 1);
    const dates = [...Array(6)].map((_, i) => {
      const date = new Date(weekStart);
      date.setDate(weekStart.getDate() + i);
      return date;
    });
    return dates;
  };

  const calculateTotalHours = (date) => {
    return tasksData.reduce((sum, taskData) => {
      const taskCreatedDate = new Date(taskData.createdDate);
      return date.toDateString() === taskCreatedDate.toDateString()
        ? sum + parseFloat(taskData.hours)
        : sum;
    }, 0);
  };

  const formatDate = (date) => {
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      weekday: "long",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const handleEdit = (timesheet) => {
    setEditedTask(timesheet);
    setShowEditModal(true);
  };

  const handleDelete = (timesheetId) => {
    if (window.confirm("Are you sure you want to delete this timesheet entry?")) {
      deleteTimesheetByTimesheetId(timesheetId)
        .then(() => {
          setTasksData((prevData) => prevData.filter((taskData) => taskData.timeSheetId !== timesheetId));
        })
        .catch((error) => {
          console.error("Error deleting timesheet entry:", error);
        });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTask((prevEditedTask) => ({ ...prevEditedTask, [name]: value }));
  };

  const handleSaveEdit = () => {
    if (editedTask.timeSheetId) {
      editTaskByTimesheetId(editedTask.timeSheetId, editedTask)
        .then((editedTimesheet) => {
          setTasksData((prevData) =>
            prevData.map((taskData) =>
              taskData.timeSheetId === editedTimesheet.timeSheetId ? editedTimesheet : taskData
            )
          );
          setShowEditModal(false);
          getUserData();
        })
        .catch((error) => {
          console.error("Error editing timesheet entry:", error);
        });
    }
  };

  const handleProjectChange = (selectedProject) => {
    setSelectedProject(selectedProject);

    const filteredActivities = activityNames.filter(
      (activity) => activity.projectId === parseInt(selectedProject)
    );
    setRelatedActivities(filteredActivities);
  };

  const getUserData = () => {
    getUserDataForWeek(userId, inputDate)
      .then((data) => {
        setTasksData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchAllProjects()
      .then((projects) => {
        setProjectNames(projects);
        getUserData();
      })
      .catch((error) => {
        console.error("Error fetching project names:", error);
      });

    fetchAllActivities()
      .then((activities) => {
        setActivityNames(activities);
      })
      .catch((error) => {
        console.error("Error fetching activity names:", error);
      });
  }, [userId]);

  useEffect(() => {
    if (selectedProject) {
      const filteredActivities = activityNames.filter(
        (activity) => activity.projectId === parseInt(selectedProject)
      );
      setRelatedActivities(filteredActivities);
    } else {
      setRelatedActivities([]);
    }
  }, [selectedProject, activityNames]);

  const weekDates = generateWeekDates();

  return (
    <Container className="mt-5">
      {tasksData.length === 0 ? (
        <h3 className="text-center">No Data Found</h3>
      ) : (
        <Table bordered striped align="center" className="text-center">
          <thead>
            <tr>
              <th>Project Name</th>
              <th>Activity</th>
              <th>Task</th>
              {weekDates.map((date, index) => (
                <th key={index}>
                  {formatDate(date)}
                  {date.toDateString() === today.toDateString() && (
                    <span> (Today)</span>
                  )}
                </th>
              ))}
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {tasksData.map((taskData, index) => (
              <tr key={index}>
                <td>{taskData.projectName}</td>
                <td>{taskData.activityName}</td>
                <td>{taskData.task}</td>
                {weekDates.map((date, index) => (
                  <td key={index}>
                    {date.toDateString() === new Date(taskData.createdDate).toDateString() && (
                      <span>{taskData.hours}</span>
                    )}
                  </td>
                ))}
                <td>
                  <FontAwesomeIcon
                    icon={faEdit}
                    style={{ color: "#1E90FF", cursor: "pointer", marginRight: "10px", marginLeft: "2px" }}
                    onClick={() => handleEdit(taskData)}
                  />
                  <FontAwesomeIcon
                    icon={faTrash}
                    style={{ color: "#FF0000", cursor: "pointer" }}
                    onClick={() => handleDelete(taskData.timeSheetId)}
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan={3}>Total Hours</td>
              {weekDates.map((date, index) => (
                <td key={index}>{calculateTotalHours(date)}</td>
              ))}
              <td />
            </tr>
          </tbody>
        </Table>
      )}

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Timesheet Entry</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formTask">
              <Form.Label>Task</Form.Label>
              <Form.Control
                type="text"
                name="task"
                value={editedTask.task}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formHours">
              <Form.Label>Hours</Form.Label>
              <Form.Control
                type="number"
                name="hours"
                value={editedTask.hours}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group controlId="formProject">
              <Form.Label>Project</Form.Label>
              <Form.Control
                as="select"
                name="projectId"
                value={editedTask.projectId}
                onChange={(e) => {
                  handleProjectChange(e.target.value);
                  handleInputChange(e);
                }}
              >
                <option value="">Select a Project</option>
                {projectNames.map((project) => (
                  <option key={project.projectId} value={project.projectId}>
                    {project.projectName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formActivity">
              <Form.Label>Activity</Form.Label>
              <Form.Control
                as="select"
                name="activityId"
                value={editedTask.activityId}
                onChange={handleInputChange}
              >
                <option value="">Select an Activity</option>
                {relatedActivities.map((activity) => (
                  <option key={activity.activityId} value={activity.activityId}>
                    {activity.activityName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EditDeleteData;
