// import DetailsPlayerCard from "../../components/DetailsPlayerCard/DetailsPlayerCard";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ShowPlayerByID } from "../../store/user/actions";
import { createNewStory } from "../../store/stories/actions";
import { Form } from "react-bootstrap";
import { CardBody, CardSubtitle, Card, CardTitle } from "reactstrap";
import { CardText } from "reactstrap";
import { fetchStories } from "../../store/stories/actions";
import { selectStoriesByPlayer } from "../../store/stories/selectors";
import {
  selectToken,
  selectUser,
  selectUsersById,
} from "../../store/user/selectors";
import { useState } from "react";
import FormAddStory from "../../components/Forms/FormaAddStory";

export default function PlayerDetails() {
  const { id } = useParams();
  console.log("this is my params", id);
  const dispatch = useDispatch();

  const [content, set_Content] = useState("");

  const [formHidden, set_FormHidden] = useState(true);

  const token = useSelector(selectToken);

  const playerWhoLeaveMessage = useSelector(selectUser);
  console.log("player who leave the message", playerWhoLeaveMessage.id);
  const playerGiveMessageid = playerWhoLeaveMessage.id;

  const details = useSelector(selectUsersById);
  // console.log("details", details);

  const stories = useSelector(selectStoriesByPlayer);
  console.log("stories", stories);

  const handleSubmmit = () => {
    // event.preventDefault();

    dispatch(createNewStory({ content, token, id }));
    // dispatch(
    //   showMessageWithTimeout("success", false, "Story posted on your space!")
    // );
  };

  useEffect(() => {
    if (id) {
      dispatch(ShowPlayerByID(id));
      dispatch(fetchStories(id));
    }
  }, [id]);

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
          <div>
            <button
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
                  <div>
                    <Form>
                      <ul>
                        {" "}
                        <label>Write here</label>
                        <input
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
            {stories.map((story) => {
              return (
                <h3 key={story.id} className="storiesPlayerDetails">
                  {story.content}
                  <img src={story.imageUrl} alt="Avatar"></img>
                </h3>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
// location={matches.location?.city}
