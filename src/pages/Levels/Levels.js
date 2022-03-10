import { useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLevels } from "../../store/user/actions";
import { SelectAllLevels, selectUser } from "../../store/user/selectors";
import { levelPlayerByID } from "../../store/players/actions";
import { Button } from "react-bootstrap";

export default function Levels() {
  const dispatch = useDispatch();
  const userLogged = useSelector(selectUser);

  const id = userLogged?.id;
  console.log("userLogged", id);

  const [check, set_Check] = useState("");
  // console.log("what it is Check", check);
  const levels = useSelector(SelectAllLevels);
  // console.log("Levels", levels);

  const handleSubmit = () => {
    dispatch(levelPlayerByID(id, check));
    console.log("id check", id, check);
  };

  useEffect(() => {
    dispatch(fetchAllLevels());
    // dispatch(levelPlayerByID(id));
  }, [dispatch]);
  return (
    <div>
      <h1> Levels displayed</h1>
      {!levels ? (
        "Loading..."
      ) : (
        <div>
          {levels.map((x) => {
            return (
              <div key={x.id}>
                <InputGroup className="mb-3">
                  <InputGroup.Checkbox
                    aria-label="Checkbox for following text input"
                    onChange={(event) => set_Check(x.id)}
                  />
                  <InputGroup.Text>{x.levelRateFixed}</InputGroup.Text>

                  <InputGroup.Text>{x.description}</InputGroup.Text>
                </InputGroup>
              </div>
            );
          })}
          <Button onClick={handleSubmit}> Submit Level</Button>
        </div>
      )}
    </div>
  );
}
//  <button
//               onClick={() =>
//                 dispatch(
//                   artworkHearts(
//                     artworkByidSelector.id,
//                     artworkByidSelector.hearts
//                   )
//                 )
//               }
//             >
