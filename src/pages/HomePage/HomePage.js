import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplayHomePageCard from "../../components/DisplayHomePageCard/DisplayHomePageCard";
import { fetchAllPlayers } from "../../store/user/actions";
import { selectAllUsers } from "../../store/user/selectors";
import { FormGroup } from "react-bootstrap";
import { Input, Label } from "reactstrap";

function compareLevel(Level_A, Leve_B) {
  return Leve_B.level - Level_A.level;
}

export default function HomePage() {
  const dispatch = useDispatch();

  const players = useSelector(selectAllUsers);
  console.log("players", players);

  // const playersComparingScore = players.sort(compareLevel);
  // console.log("Players comparing score", playersComparingScore);

  useEffect(() => {
    dispatch(fetchAllPlayers());
  }, [dispatch]);

  return (
    <div>
      <div>
        {" "}
        <FormGroup>
          <Label for="exampleSelect">Select Your Tennis Buddy By Level:</Label>
          <Input id="exampleSelect" name="select" type="select">
            <option>1</option>
            <option>1.5</option>
            <option>2</option>
            <option>2.5</option>
            <option>3</option>
            <option>3.5</option>
            <option>4</option>
            <option>4.5</option>
            <option>5</option>
            <option>5.5</option>
            <option>6</option>
            <option>6.5</option>
            <option>7.0</option>
          </Input>
        </FormGroup>
      </div>
      {!players
        ? "Loading.."
        : players.map((x) => {
            return (
              <DisplayHomePageCard
                key={x.id}
                name={x.name}
                levelId={x.level.levelRateFixed}
                imageUrl={x.imageUrl}
                location={x.location.city}
                id={x.id}
              />
            );
          })}
    </div>
  );
}
