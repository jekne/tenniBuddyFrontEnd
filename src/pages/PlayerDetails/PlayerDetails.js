// import DetailsPlayerCard from "../../components/DetailsPlayerCard/DetailsPlayerCard";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowPlayerByID } from "../../store/user/actions";
import { selectUsersById } from "../../store/user/selectors";
import { CardBody, CardSubtitle, Card, CardTitle, CardLink } from "reactstrap";
import { CardText } from "reactstrap";

export default function PlayerDetails() {
  const { id } = useParams();
  console.log("this is my params", id);

  const dispatch = useDispatch();

  const details = useSelector(selectUsersById);
  console.log("details", details);

  useEffect(() => {
    dispatch(ShowPlayerByID(id));
  }, []);

  return (
    <div>
      {!details ? (
        "Loading ..."
      ) : (
        <div>
          <Card>
            <CardBody>
              <CardTitle tag="h5">{details.name} BUDDY</CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                Level: {details.level?.levelRateFixed}{" "}
              </CardSubtitle>{" "}
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                Description: {details.level?.description}
              </CardSubtitle>
            </CardBody>
            <img alt="Card image cap" src={details.imageUrl} width="50%" />
            <CardBody>
              <CardText>Favorite Location: {details.location?.city}</CardText>
              <CardText>Moto: {details.description}</CardText>
              <CardText>Gender: {details.gender ? "Man" : "Woman"}</CardText>
              <CardText>Age: {details.age}</CardText>
              <CardText>Contact me : </CardText>
              <CardText>Email: {details.email}</CardText>
              <CardText>Telephone: {details.telephone}</CardText>
            </CardBody>
          </Card>
        </div>
      )}
    </div>
  );
}
// location={matches.location?.city}
