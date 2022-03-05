import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { useHistory } from "react-router-dom";

export default function ClubCards(props) {
  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.imageUrl} />
        <Card.Body>
          <Card.Title>{props.name}</Card.Title>
          <Card.Text>
            <strong>Adress: </strong>
            {props.adress}
          </Card.Text>
          <Card.Text>
            <strong> Zip Code: </strong>
            {props.zipCode}
          </Card.Text>
          <Card.Text>
            {" "}
            <strong>STARS: </strong>
            {props.rateClub}
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
          <Button
            variant="primary"
            onClick={(event) => (window.location.href = `${props.webSite}`)}
          >
            WEBSITE
          </Button>{" "}
        </Card.Body>
      </Card>
    </div>
  );
}
