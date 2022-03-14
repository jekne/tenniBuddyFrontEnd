// import DetailsPlayerCard from "../../components/DetailsPlayerCard/DetailsPlayerCard";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowPlayerByID } from "../../store/user/actions";
import { createNewStory } from "../../store/stories/actions";
import { Form } from "react-bootstrap";
import { CardBody, CardSubtitle, Card, CardTitle, Input } from "reactstrap";
import { CardText } from "reactstrap";
import { fetchStories } from "../../store/stories/actions";
import { selectStoriesByPlayer } from "../../store/stories/selectors";
import { selectToken, selectUsersById } from "../../store/user/selectors";
import { useState } from "react";

export default function PlayerDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [content, set_Content] = useState("");
  const [formHidden, set_FormHidden] = useState(true);

  const token = useSelector(selectToken);

  const details = useSelector(selectUsersById);
  // console.log("details", details);

  const stories = useSelector(selectStoriesByPlayer);
  // console.log("stories", stories);

  const handleSubmmit = (event) => {
    event.preventDefault();

    dispatch(createNewStory({ content, token, id }));
    set_Content("");
  };

  useEffect(() => {
    if (id) {
      dispatch(ShowPlayerByID(id));
      dispatch(fetchStories(id));
    }
  }, [id]);

  return (
    <div className="playerDetails">
      {!details ? (
        "Loading ..."
      ) : (
        <div>
          <Card style={{ width: "50rem" }} className="playerDetailsBigCard">
            <CardBody>
              <CardTitle tag="h5">
                {" "}
                <strong>{details.name} BUDDY </strong>
              </CardTitle>
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                Level: {details.level?.levelRateFixed}{" "}
              </CardSubtitle>{" "}
              <CardSubtitle className="mb-2 text-muted" tag="h6">
                Description: {details.level?.description}
              </CardSubtitle>
            </CardBody>
            <img alt="Card image cap" src={details.imageUrl} width="50%" />
            <CardBody>
              <CardText>
                <strong>Favorite Location: {details.location?.city} </strong>
              </CardText>
              <CardText>
                {" "}
                <strong>Moto: {details.description} </strong>
              </CardText>
              <CardText>
                {" "}
                <strong>Gender: {details.gender ? "Man" : "Woman"} </strong>
              </CardText>
              <CardText>
                {" "}
                <strong>Age: {details.age} </strong>
              </CardText>
              <CardText>
                {" "}
                <strong>Contact me : </strong>
              </CardText>
              <CardText>
                {" "}
                <strong>Email: {details.email}</strong>
              </CardText>
              <CardText>
                {" "}
                <strong>Telephone: {details.telephone}</strong>
              </CardText>
            </CardBody>
          </Card>
          <div>
            <button
              className="btPlayerDetails"
              onClick={() => {
                set_FormHidden(!formHidden);
              }}
            >
              POST A MESSAGE TO {details.name} BUDDY
            </button>
            <div>
              {" "}
              {!formHidden ? (
                <div>
                  <Form>
                    <ul>
                      {" "}
                      <label>
                        <strong>WRITE YOUR MESSAGE HERE</strong>
                      </label>
                      <Input
                        value={content}
                        onChange={(event) => set_Content(event.target.value)}
                      />
                      <div>
                        {" "}
                        <button onClick={handleSubmmit}>
                          SAVE YOUR MESSAGE
                        </button>
                      </div>
                    </ul>
                  </Form>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      )}
      <div>
        {!stories ? (
          "Loading ..."
        ) : (
          <div>
            {stories?.map((story) => {
              return (
                <div key={story.id} className="storiesPlayerDetails">
                  <h5>
                    <h3>
                      {story?.content}
                      <img src={story?.imageUrl} alt="Avatar"></img>
                    </h3>
                    Message from: <b>{story.name}</b>
                  </h5>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
// location={matches.location?.city}
