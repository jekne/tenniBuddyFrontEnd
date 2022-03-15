import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersWillBeUpdate, fetchAllPlayers } from "../../store/user/actions";
import { Form, Row, Col, FormGroup, Button } from "react-bootstrap";
import { Input, Label } from "reactstrap";
import { fetchAllLocations } from "../../store/locations/actions";
import {
  selectToken,
  selectUser,
  selectAllUsers,
} from "../../store/user/selectors";
import { selectAlllocations } from "../../store/locations/selectors";

export default function FormEditProfile() {
  const dispatch = useDispatch();
  const [name, set_Name] = useState("");
  const [description, set_Description] = useState("");
  const [email, set_Email] = useState("");
  const [password, set_Password] = useState("");
  const [age, set_Age] = useState("");
  const [gender, set_Gender] = useState(false);
  const [imageUrl, set_ImageUrl] = useState("");
  const [levelId, set_LevelId] = useState("");
  const [location, set_location] = useState(null);
  const [telephone, set_Telephone] = useState("");

  const players = useSelector(selectAllUsers);

  const user = useSelector(selectUser);

  const locationsSelector = useSelector(selectAlllocations);
  console.log("locations selector", locationsSelector);

  const token = useSelector(selectToken);

  const handleSubmit = () => {
    dispatch(
      usersWillBeUpdate({
        name,
        age,
        description,
        email,
        gender,
        imageUrl,
        levelId,
        location,
        telephone,
        password,
        token,
      })
    );
  };

  useEffect(() => {
    dispatch(fetchAllPlayers());
    dispatch(fetchAllLocations());
  }, []);
  return (
    <div>
      <Form className="test">
        <Row form>
          <FormGroup>
            <Label>
              <strong>Name</strong>
            </Label>
            <Input
              placeholder={user.name}
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
                placeholder={user.email}
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
                placeholder={user.password}
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
              <strong>FAVORITE LOCATION </strong>
            </Label>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              value={location}
              onChange={(e) => {
                set_location(parseInt(e.target.value));
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
                placeholder={user.age}
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
                placeholder={user.description}
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

        <Button
          style={{ marginTop: 30 }}
          onClick={handleSubmit}
          style={{ marginBottom: 90 }}
        >
          SUBMIT CHANGES
        </Button>
      </Form>
    </div>
  );
}
