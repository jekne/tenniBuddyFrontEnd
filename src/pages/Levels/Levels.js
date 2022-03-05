import { useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllLevels } from "../../store/user/actions";
import { SelectAllLevels } from "../../store/user/selectors";
export default function Levels() {
  const dispatch = useDispatch();

  const [check, set_Check] = useState(false);
  console.log("what it is Check", check);
  const levels = useSelector(SelectAllLevels);
  //   console.log("Levels", levels);

  useEffect(() => {
    dispatch(fetchAllLevels());
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
                    onChange={(event) => set_Check(!check)}
                  />
                  <InputGroup.Text>{x.levelRateFixed}</InputGroup.Text>

                  <InputGroup.Text>{x.description}</InputGroup.Text>
                </InputGroup>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
