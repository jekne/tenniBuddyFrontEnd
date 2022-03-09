import { CardGroup, Card } from "react-bootstrap";

export default function MatchesCard(props) {
  return (
    <div>
      <CardGroup>
        <Card>
          <Card.Img variant="top" src={props.imageUrl} />
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>HERE WILL BE THE PLAYER 1</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Victories: {props.winnerId}</small>
          </Card.Footer>
        </Card>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>{props.name}</Card.Title>
            <Card.Text>HERE WILL BE THE PLAYER 2</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">Victories: </small>
          </Card.Footer>
        </Card>
      </CardGroup>
      <h3>MATCH LOCATION: {props.location}</h3>
    </div>
  );
}
