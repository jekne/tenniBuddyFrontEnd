import { Card, ListGroupItem, ListGroup, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectToken } from "../../store/user/selectors";

export default function DisplayHomePageCard(props) {
  const token = useSelector(selectToken);

  return (
    <div>
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={props.imageUrl} />
        <Card.Body>
          <Card.Title>BUDDY {props.name}</Card.Title>
          <Card.Text>Hey lets Hit some Balls!.</Card.Text>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>Level: {props.levelId}</ListGroupItem>
          <ListGroupItem>
            Favorite Location:
            {props.location}
          </ListGroupItem>
          <ListGroupItem>I like to play around: </ListGroupItem>
        </ListGroup>

        {!token ? (
          <Link to={`/login`}>
            {" "}
            <Button>LOG IN</Button>{" "}
          </Link>
        ) : (
          <Link to={`/details/${props.id}`}>
            {" "}
            <Button
            // variant="primary"
            // onClick={(event) => (window.location.href = `${props.webSite}`)}
            >
              CONNECT TO THE PLAYER
            </Button>{" "}
          </Link>
        )}
      </Card>
    </div>
  );
}
