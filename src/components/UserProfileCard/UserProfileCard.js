import { Card, Button } from "react-bootstrap";

export default function UserProfileCard(props) {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.imageUrl} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            <strong>Age: </strong>
            {props.age}
          </Card.Text>
          <Card.Text>
            <strong> Gender: </strong>
            {props.gender}
          </Card.Text>
          <Card.Text>
            {" "}
            <strong>Location: </strong>
            {props.location}
          </Card.Text>
          <Card.Text>
            {" "}
            <strong>Telephone Number: </strong>
            {props.telephone}
          </Card.Text>
          <Card.Text>
            {" "}
            <strong>Email: </strong>
            {props.email}
          </Card.Text>
          <Card.Text>
            {" "}
            <strong>Level: </strong>
            {props.levelId}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
