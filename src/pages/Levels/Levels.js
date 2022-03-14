import { useEffect, useState } from "react";
import { InputGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLevels } from "../../store/user/actions";
import { SelectAllLevels, selectUser } from "../../store/user/selectors";
import { levelPlayerByID } from "../../store/players/actions";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Levels() {
  const dispatch = useDispatch();
  const userLogged = useSelector(selectUser);
  const levels = useSelector(SelectAllLevels);

  const [check, set_Check] = useState("");
  const id = userLogged?.id;

  const handleSubmit = () => {
    dispatch(levelPlayerByID(id, check));
    console.log("id check", id, check);
  };

  useEffect(() => {
    dispatch(fetchAllLevels());
  }, [dispatch]);
  return (
    <div className="backgroundLevel">
      <div>
        <h1 className="levelUtr">
          {" "}
          <strong>LEVEL UTR </strong>
        </h1>
      </div>
      <div className="levelsAllPage">
        {!levels ? (
          "Loading..."
        ) : (
          <div className="levels">
            {levels.map((x) => {
              return (
                <div key={x.id} style={{ margin: 10 }}>
                  <Card style={{ width: "30rem" }}>
                    <h2> Level {x.levelRateFixed}</h2>
                  </Card>
                  <Card style={{ width: "30rem" }}>
                    <h5>{x.description}</h5>
                  </Card>

                  <Card style={{ width: "30rem" }}>
                    <InputGroup.Checkbox
                      style={{ width: " 2rem", height: "2rem" }}
                      className="checkbox"
                      aria-label="level"
                      onChange={(event) => set_Check(x.id)}
                    />
                  </Card>
                </div>
              );
            })}
            <Link to={`/`}>
              <Button className="btlUtr" onClick={handleSubmit}>
                {" "}
                SUBMIT YOUR LEVEL
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
