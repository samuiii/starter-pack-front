import logo from "./resource/profile.jpg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Switch, Route, useLocation } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Image,
  Card,
  Form,
  Button,
  Table,
  Modal,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import Covid from "./covid";
import axios from "axios";
import { useEffect, useState } from "react";
let temp, success, edit;
function App() {
  let location = useLocation();
  const [proj, setProj] = useState([]);
  const [show, setShow] = useState(false);
  const [sh, setSh] = useState(false);
  const handleClose = () => {
    setShow(false);
    setProj([]);
  };
  useEffect(() => {
    if (proj.length === 0) {
      axios
        .get("http://localhost:8080/profile/projects")
        .then((res) => {
          setProj(res.data);
        })
        .catch((err) => {
          setProj([]);
        });
    }
  });
  async function editit(e, v) {
    await axios.put(
      "http://localhost:8080/profile/projects?projectId=" + v.id,
      {
        description: e.target[1].value,
        date: e.target[2].value,
        rating: e.target[3].value,
      }
    );
    setProj([]);
  }
  async function postit(e) {
    let check = true;
    await axios
      .post("http://localhost:8080/profile/projects", {
        name: e.target[0].value,
        description: e.target[1].value,
        date: e.target[2].value,
        rating: e.target[3].value,
      })
      .catch((err) => {
        check = false;
      });
    if (check) {
      success = <p className="text-success">Success</p>;
    } else {
      success = <p className="text-danger">Failed</p>;
    }
    temp = (
      <>
        <p className="lead">Project Name : {e.target[0].value}</p>
        <p className="lead">Project Description : {e.target[1].value}</p>
        <p className="lead">Project Date : {e.target[2].value}</p>
        <p className="lead">Project Rating : {e.target[3].value}</p>
      </>
    );
    setShow(true);
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand>
          {location.pathname === "/" ? "Profile" : "Covid"}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href={"/"}>Home</Nav.Link>
            <Nav.Link href={"/covid"}>Covid</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route exact path="/">
          <Container className={"mt-3"}>
            <Row>
              <Col md={5} lg={3}>
                <Image src={logo} roundedCircle fluid />
              </Col>
              <Col md={7} lg={9}>
                <Card>
                  <Card.Body>
                    <Card.Title style={{ textAlign: "center" }}>
                      <h1>SIRAWIT SUWANNAKIN</h1>
                    </Card.Title>
                    <Card.Text>
                      Education: king mongkut's university of technology north
                      bangkok
                    </Card.Text>
                    <Card.Text>Birthdate: 05/07/43</Card.Text>
                    <Card.Text>Favourite Thing: none</Card.Text>
                    <Card.Text>Programming Language: javascript</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <Container className={"mt-3"} fluid>
            <Row>
              <Col className={"offset-xl-2 col-xl-8 offset-xl-2"}>
                <Card>
                  <Card.Header style={{ textAlign: "center" }}>
                    <h1>PROJECT</h1>
                  </Card.Header>
                  <Card.Body>
                    <Container className={"mb-3"}>
                      <Row>
                        <Col className={"offset-8 col-2"}>
                          <DropdownButton
                            id="dropdown-basic-button"
                            title="Sort by Date"
                            variant="info"
                          >
                            <Dropdown.Item
                              onClick={async () => {
                                await axios
                                  .get(
                                    "http://localhost:8080/profile/projects?sort=date&type=asc"
                                  )
                                  .then((res) => {
                                    setProj(res.data);
                                  })
                                  .catch((err) => {
                                    setProj([]);
                                  });
                              }}
                            >
                              ascending
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={async () => {
                                await axios
                                  .get(
                                    "http://localhost:8080/profile/projects?sort=date&type=desc"
                                  )
                                  .then((res) => {
                                    setProj(res.data);
                                  })
                                  .catch((err) => {
                                    setProj([]);
                                  });
                              }}
                            >
                              descending
                            </Dropdown.Item>
                          </DropdownButton>
                        </Col>
                        <Col className={"col-2"}>
                          <DropdownButton
                            id="dropdown-basic-button"
                            title="Sort by Rating"
                            variant="info"
                          >
                            <Dropdown.Item
                              onClick={async () => {
                                await axios
                                  .get(
                                    "http://localhost:8080/profile/projects?sort=ratigs&type=asc"
                                  )
                                  .then((res) => {
                                    setProj(res.data);
                                  })
                                  .catch((err) => {
                                    setProj([]);
                                  });
                              }}
                            >
                              ascending
                            </Dropdown.Item>
                            <Dropdown.Item
                              onClick={async () => {
                                await axios
                                  .get(
                                    "http://localhost:8080/profile/projects?sort=ratigs&type=desc"
                                  )
                                  .then((res) => {
                                    setProj(res.data);
                                  })
                                  .catch((err) => {
                                    setProj([]);
                                  });
                              }}
                            >
                              descending
                            </Dropdown.Item>
                          </DropdownButton>
                        </Col>
                      </Row>
                    </Container>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Description</th>
                          <th>Date</th>
                          <th>Rating</th>
                          <th />
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {proj.length !== 0 &&
                          proj.map((v, i) => {
                            return (
                              <tr>
                                <td>{i + 1}</td>
                                <td>{v.name}</td>
                                <td>{v.description}</td>
                                <td>{v.date}</td>
                                <td>{v.rating}</td>
                                <td>
                                  <Button
                                    onClick={() => {
                                      edit = (
                                        <Form
                                          onSubmit={(e) => {
                                            e.preventDefault();
                                            editit(e, v);
                                            setSh(false);
                                          }}
                                        >
                                          <Form.Group
                                            as={Row}
                                            controlId="formProjectName"
                                          >
                                            <Form.Label column sm={2}>
                                              Project Name
                                            </Form.Label>
                                            <Col sm={10}>
                                              <Form.Control
                                                value={v.name}
                                                disabled
                                              />
                                            </Col>
                                          </Form.Group>
                                          <Form.Group
                                            as={Row}
                                            controlId="formProjectDescription"
                                          >
                                            <Form.Label column sm={2}>
                                              Project Description
                                            </Form.Label>
                                            <Col sm={10}>
                                              <Form.Control
                                                as="textarea"
                                                placeholder="input project description here"
                                                required
                                                defaultValue={v.description}
                                              />
                                            </Col>
                                          </Form.Group>
                                          <Form.Group
                                            as={Row}
                                            controlId="formProjectDate"
                                          >
                                            <Form.Label column sm={2}>
                                              Project Date
                                            </Form.Label>
                                            <Col sm={10}>
                                              <Form.Control
                                                type="date"
                                                required
                                                defaultValue={v.date}
                                              />
                                            </Col>
                                          </Form.Group>
                                          <Form.Group
                                            as={Row}
                                            controlId="formProjectRate"
                                          >
                                            <Form.Label column sm={2}>
                                              Project Rate
                                            </Form.Label>

                                            <Col sm={10}>
                                              <Form.Control
                                                as="select"
                                                custom
                                                defaultValue={v.rating}
                                              >
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                              </Form.Control>
                                            </Col>
                                          </Form.Group>
                                          <Button
                                            variant="primary"
                                            type="submit"
                                          >
                                            Submit
                                          </Button>
                                        </Form>
                                      );
                                      setSh(true);
                                    }}
                                  >
                                    EDIT
                                  </Button>
                                </td>
                                <td>
                                  <Button
                                    variant="danger"
                                    onClick={() => {
                                      console.log(v);
                                      axios
                                        .delete(
                                          " http://localhost:8080/profile/projects?projectId=" +
                                            v.id
                                        )
                                        .then((res) => {
                                          setProj([]);
                                        });
                                    }}
                                  >
                                    DELETE
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <Container className={"mt-3"} fluid>
            <Row>
              <Col className={"offset-xl-2 col-xl-8 offset-xl-2"}>
                <Card>
                  <Card.Header style={{ textAlign: "center" }}>
                    <h1>PROJECT INPUT</h1>
                  </Card.Header>
                  <Card.Body>
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        postit(e);
                      }}
                    >
                      <Form.Group as={Row} controlId="formProjectName">
                        <Form.Label column sm={2}>
                          Project Name
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            placeholder="input project name here"
                            required
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="formProjectDescription">
                        <Form.Label column sm={2}>
                          Project Description
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control
                            as="textarea"
                            placeholder="input project description here"
                            required
                          />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="formProjectDate">
                        <Form.Label column sm={2}>
                          Project Date
                        </Form.Label>
                        <Col sm={10}>
                          <Form.Control type="date" required />
                        </Col>
                      </Form.Group>
                      <Form.Group as={Row} controlId="formProjectRate">
                        <Form.Label column sm={2}>
                          Project Rate
                        </Form.Label>

                        <Col sm={10}>
                          <Form.Control as="select" custom>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Submit
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
          <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>{success}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{temp}</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal
            show={sh}
            onHide={() => {
              setSh(false);
            }}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit</Modal.Title>
            </Modal.Header>
            <Modal.Body>{edit}</Modal.Body>
          </Modal>
        </Route>
        <Route path="/covid">
          <Covid />
        </Route>
      </Switch>
    </>
  );
}

export default App;
