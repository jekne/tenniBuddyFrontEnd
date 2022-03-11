import { useEffect, useState } from "react";
import { InputGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLevels } from "../../store/user/actions";
import {
  SelectAllLevels,
  selectToken,
  selectUser,
} from "../../store/user/selectors";
import { levelPlayerByID } from "../../store/players/actions";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";

export default function Levels() {
  const dispatch = useDispatch();
  const userLogged = useSelector(selectUser);
  const token = useSelector(selectToken);
  const navigate = useNavigate();

  const id = userLogged?.id;
  console.log("userLogged", id);

  const [check, set_Check] = useState("");
  // console.log("what it is Check", check);
  const levels = useSelector(SelectAllLevels);
  // console.log("Levels", levels);

  const handleSubmit = () => {
    dispatch(levelPlayerByID(id, check));
    console.log("id check", id, check);
    // navigate("/");
  };

  // useEffect(() => {
  //   if (token !== null) {
  //     navigate("/");
  //   }
  // }, [token, navigate]);

  useEffect(() => {
    dispatch(fetchAllLevels());
    // dispatch(levelPlayerByID(id));
  }, [dispatch]);
  return (
    <div>
      <h1> LEVEL UTR</h1>
      {!levels ? (
        "Loading..."
      ) : (
        <div>
          {levels.map((x) => {
            return (
              <div key={x.id}>
                <Card style={{ width: "30rem" }}>
                  <h2> Level {x.levelRateFixed}</h2>
                </Card>
                <Card style={{ width: "30rem" }}>
                  <Card style={{ width: "30rem" }}>
                    <InputGroup.Checkbox
                      aria-label="Checkbox for following text input"
                      onChange={(event) => set_Check(x.id)}
                    />
                    <h5>{x.description}</h5>
                  </Card>
                </Card>
              </div>
            );
          })}

          <Button onClick={handleSubmit}> Submit Level</Button>
        </div>
      )}
    </div>
  );
}
