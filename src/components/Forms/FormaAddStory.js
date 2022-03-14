import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNewStory } from "../../store/stories/actions";
import { selectToken } from "../../store/user/selectors";
import { showMessageWithTimeout } from "../../store/appState/actions";
import { selectUser } from "../../store/user/selectors";

export default function FormAddStory() {
  const [content, set_Content] = useState("");

  const [formHidden, set_FormHidden] = useState(true);

  const token = useSelector(selectToken);

  const playerWhoLeaveMessage = useSelector(selectUser);
  console.log("player who leave the message", playerWhoLeaveMessage.id);
  const id = playerWhoLeaveMessage.id;

  const dispatch = useDispatch();

  // const creatStory = useSelector(selectUserSpace);
  // console.log("this is my create Story", creatStory);

  const handleSubmmit = () => {
    // event.preventDefault();

    dispatch(createNewStory({ content, token, id }));
    // dispatch(
    //   showMessageWithTimeout("success", false, "Story posted on your space!")
    // );
  };

  return (
    <div>
      {/* <h1> THIS FORM SHOULD APPEAR ONLY IF YOU ARE LOGGED IN</h1> */}
      {/* <button
        onClick={() => {
          set_FormHidden(!formHidden);
        }}
      >
        POST A COOL STORY BRO
      </button> */}
      <div>
        {" "}
        {/* {!formHidden ? ( */}
        <div>
          <div>
            <Form>
              <ul>
                <li>
                  {" "}
                  <label>LEAVE A MESSAGE TO:</label>
                  <input
                    value={content}
                    onChange={(event) => set_Content(event.target.value)}
                  />
                </li>

                <div>
                  {" "}
                  <button onClick={handleSubmmit}>SAVE YOUR STORY</button>
                </div>
              </ul>
            </Form>
          </div>
        </div>
        {/* ) : (
          ""
        )} */}
      </div>
    </div>
  );
}
