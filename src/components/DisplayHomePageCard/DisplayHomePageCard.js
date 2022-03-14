import { Card, ListGroupItem, ListGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectToken } from "../../store/user/selectors";

export default function DisplayHomePageCard(props) {
  const token = useSelector(selectToken);

  return (
    <div className="backgroundHomePage">
      <div className="displayHomePageCard">
        <Card style={{ width: "30rem" }}>
          <Card.Img variant="top" src={props.imageUrl} />
          <Card.Body>
            <Card.Title>BUDDY {props.name}</Card.Title>
            <Card.Text> {props.description}</Card.Text>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Level: {props.levelId}</ListGroupItem>
            <ListGroupItem>
              Favorite Location:
              {props.location}
            </ListGroupItem>
          </ListGroup>

          {!token ? (
            <Link to={`/login`}>
              {" "}
              <Button>LOG IN</Button>{" "}
            </Link>
          ) : (
            <Link to={`/details/${props.id}`}>
              {" "}
              <Button>CONNECT TO THE PLAYER</Button>{" "}
            </Link>
          )}
        </Card>
      </div>
    </div>
  );
}
