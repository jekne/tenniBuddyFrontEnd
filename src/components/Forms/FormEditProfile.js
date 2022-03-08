import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { usersWillBeUpdate } from "../../store/user/actions";
import { Form, Row, Col, FormGroup, Button } from "react-bootstrap";
import { Input, Label } from "reactstrap";
import { selectToken, selectUser } from "../../store/user/selectors";

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
  const [location, set_location] = useState("");
  const [telephone, set_Telephone] = useState("");

  const user = useSelector(selectUser);
  // console.log("user", user);
  const token = useSelector(selectToken);
  // console.log("token", token);

  const handleSubmit = () => {
    console.log("name age description", name, age, description);
    dispatch(
      usersWillBeUpdate({
        name,
        age,
        description,
        email,
        gender,
        imageUrl,
        levelId,

        telephone,
        password,
        token,
      })
    );
    console.log("Ive been clicked");
  };

  return (
    <div>
      <h1>THE FORM TO BE EDIT</h1>
      <Form>
        <Row form>
          <FormGroup>
            <Label>Name</Label>
            <Input
              placeholder={user.name}
              value={name}
              onChange={(event) => set_Name(event.target.value)}
            />
          </FormGroup>
          <Col md={6}>
            <FormGroup>
              <Label>Email</Label>
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
              <Label>Password</Label>
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
          {/* <Col md={6}>
            <FormGroup>
              <Label>Location</Label>
              <Input
                type="text"
                placeholder={user.location}
                value={location}
                onChange={(event) => set_location(event.target.value)}
              />
            </FormGroup>
          </Col> */}
          <Col md={6}>
            <FormGroup>
              <Label>Age</Label>
              <Input
                type="number"
                placeholder={user.age}
                value={age}
                onChange={(event) => set_Age(event.target.value)}
              />
            </FormGroup>
          </Col>
          <Col>
            <legend>Gender</legend>
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
            <Label sm={2}>Description</Label>
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
          <Label>Telephone Number</Label>
          <Input
            type="text"
            placeholder="optional"
            value={telephone}
            onChange={(event) => set_Telephone(event.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <label>IMAGEURL:</label>
          <input
            value={imageUrl}
            onChange={(event) => set_ImageUrl(event.target.value)}
          />

          <img src={imageUrl} width={300} alt="" />
        </FormGroup>

        <Button onClick={handleSubmit}>Submit changes</Button>
      </Form>
    </div>
  );
}
