import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplayHomePageCard from "../../components/DisplayHomePageCard/DisplayHomePageCard";
import { fetchAllPlayers } from "../../store/user/actions";
import { selectAllUsers } from "../../store/user/selectors";
import { FormGroup } from "react-bootstrap";
import { Input, Label } from "reactstrap";
import { useState } from "react";

function compareLevel(Level_A, Leve_B) {
  return Leve_B.level?.levelRateFixed - Level_A.level?.levelRateFixed;
}

function compareGender(Boolean_A, Boolean_B) {
  return Boolean_A.gender - Boolean_B.gender;
}

export default function HomePage() {
  const dispatch = useDispatch();
  const players = useSelector(selectAllUsers);
  console.log("players", players);

  const [sortBy, set_sort_By] = useState("level");
  const [sortedPlayers, setSortedPlayers] = useState([]);

  const [selectedLevel, setSelectedLevel] = useState(null);

  console.log("Select level", selectedLevel);

  const changeSorting = (event) => {
    set_sort_By(event.target.value);
  };
  useEffect(() => {
    let playersSorted = [...players].sort(
      sortBy === "level" ? compareLevel : compareGender
    );
    if (selectedLevel) {
      playersSorted = playersSorted.filter((player) => {
        return player.level?.levelRateFixed.includes(selectedLevel);
      });
    }
    setSortedPlayers(playersSorted);
  }, [sortBy, selectedLevel, players]);

  useEffect(() => {
    dispatch(fetchAllPlayers());
  }, [dispatch]);

  // const sortByLevel = !selectedLevel
  //   ? players
  //   : players.filter((player) => {
  //       return player.level?.levelRateFixed.includes(selectedLevel);
  //     });
  // console.log("what it is sort by level", sortByLevel);
  // const sorting = sortByLevel && playersSorted;
  return (
    <div>
      <div>
        {" "}
        <FormGroup>
          <Label for="exampleSelect">Select Your Tennis Buddy By Level:</Label>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            value={selectedLevel}
            onChange={(e) => {
              setSelectedLevel(parseInt(e.target.value));
            }}
          >
            {players.map((lev) => (
              <option key={lev.id} value={lev.level?.levelRateFixed}>
                {lev.level?.levelRateFixed}
              </option>
            ))}
          </Input>
        </FormGroup>
        <div>
          {" "}
          <Input type="select" onChange={changeSorting} value={sortBy}>
            <option value="level">Order by Level</option>
            <option value="gender">Order by Gender</option>
          </Input>
        </div>
      </div>
      {!sortedPlayers
        ? "Loading.."
        : sortedPlayers.map((x) => {
            return (
              <DisplayHomePageCard
                key={x.id}
                name={x.name}
                levelId={x.level?.levelRateFixed}
                imageUrl={x.imageUrl}
                location={x.location?.city}
                id={x.id}
              />
            );
          })}
    </div>
  );
}
