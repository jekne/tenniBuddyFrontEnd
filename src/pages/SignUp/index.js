import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { signUp } from "../../store/user/actions";
import { selectToken } from "../../store/user/selectors";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import { Row, FormGroup } from "react-bootstrap";
import { Input, Label } from "reactstrap";
import { selectAlllocations } from "../../store/locations/selectors";
import { fetchAllLocations } from "../../store/locations/actions";

export default function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, set_Name] = useState("");
  const [description, set_Description] = useState("");
  const [email, set_Email] = useState("");
  const [password, set_Password] = useState("");
  const [age, set_Age] = useState("");
  const [gender, set_Gender] = useState(false);
  const [imageUrl, set_ImageUrl] = useState("");
  const [location, set_Location] = useState(null);
  const [telephone, set_Telephone] = useState("");

  const token = useSelector(selectToken);
  const locationsSelector = useSelector(selectAlllocations);

  useEffect(() => {
    if (token !== null) {
      navigate("/levels");
    }
  }, [token, navigate]);

  function submitForm(event) {
    event.preventDefault();

    dispatch(
      signUp(
        name,
        age,
        description,
        email,
        gender,
        imageUrl,
        location,
        telephone,
        password
      )
    );
  }
  useEffect(() => {
    dispatch(fetchAllLocations());
  }, [dispatch]);

  return (
    <Container>
      <Form as={Col} md={{ span: 6, offset: 3 }} className="mt-5">
        <h1 className="mt-5 mb-5">Signup</h1>
        <Form>
          <Row form>
            <FormGroup>
              <Label>
                <strong>Name</strong>
              </Label>
              <Input
                value={name}
                onChange={(event) => set_Name(event.target.value)}
              />
            </FormGroup>
            <Col md={6}>
              <FormGroup>
                <Label>
                  {" "}
                  <strong>Email </strong>
                </Label>
                <Input
                  type="email"
                  placeholder={email}
                  value={email}
                  onChange={(event) => set_Email(event.target.value)}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>
                  {" "}
                  <strong> Password </strong>
                </Label>
                <Input
                  type="password"
                  placeholder={password}
                  value={password}
                  onChange={(event) => set_Password(event.target.value)}
                />
              </FormGroup>
            </Col>
          </Row>

          <Row form>
            <FormGroup>
              <Label>
                {" "}
                <strong> Location </strong>
              </Label>
              <Input
                id="exampleSelect"
                name="select"
                type="select"
                value={location}
                onChange={(e) => {
                  set_Location(parseInt(e.target.value));
                }}
              >
                <option> LOCATION</option>
                {locationsSelector.map((locati) => (
                  <option key={locati.id} value={locati.id}>
                    {locati.city}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <Col md={6}>
              <FormGroup>
                <Label>
                  {" "}
                  <strong>Age </strong>
                </Label>
                <Input
                  type="number"
                  placeholder={age}
                  value={age}
                  onChange={(event) => set_Age(event.target.value)}
                />
              </FormGroup>
            </Col>
            <Col>
              <legend>
                {" "}
                <strong>Gender </strong>
              </legend>
              <FormGroup check>
                <Input
                  name="radio1"
                  type="radio"
                  placeholder={gender}
                  value={gender}
                  onChange={() => set_Gender(!gender)}
                />{" "}
                <Label check>Man</Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  name="radio1"
                  type="radio"
                  placeholder={gender}
                  value={gender}
                  onChange={() => set_Gender(gender)}
                />{" "}
                <Label check>Woman</Label>
              </FormGroup>
            </Col>

            <FormGroup row>
              <Label sm={2}>
                {" "}
                <strong>Description </strong>
              </Label>
              <Col sm={10}>
                <Input
                  type="textarea"
                  placeholder={description}
                  value={description}
                  onChange={(event) => set_Description(event.target.value)}
                />
              </Col>
            </FormGroup>
          </Row>
          <FormGroup>
            <Label>
              <strong>Telephone Number</strong>
            </Label>
            <Input
              type="text"
              placeholder="optional"
              value={telephone}
              onChange={(event) => set_Telephone(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <label>
              {" "}
              <strong>PICTURE PROFILE:</strong>
            </label>
            <input
              value={imageUrl}
              onChange={(event) => set_ImageUrl(event.target.value)}
            />

            <img src={imageUrl} width={300} alt="" />
          </FormGroup>
        </Form>

        <Form.Group className="mt-5">
          <Button variant="primary" type="submit" onClick={submitForm}>
            Sign up
          </Button>
        </Form.Group>
        <Link to="/login">Click here to log in</Link>
      </Form>
    </Container>
  );
}
