import { Card, ListGroupItem, ListGroup, Button } from "react-bootstrap";

export default function DisplayHomePageCard(props) {
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
        <Card.Body>
          <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link>
        </Card.Body>
        <Button
          variant="primary"
          onClick={(event) => (window.location.href = `${props.webSite}`)}
        >
          WEBSITE
        </Button>{" "}
      </Card>
    </div>
  );
}
