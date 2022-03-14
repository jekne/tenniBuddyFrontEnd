import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplayHomePageCard from "../../components/DisplayHomePageCard/DisplayHomePageCard";
import { fetchAllLevels, fetchAllPlayers } from "../../store/user/actions";
import { selectAllUsers, SelectAllLevels } from "../../store/user/selectors";
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
  const levels = useSelector(SelectAllLevels);
  // console.log("players", players);

  const [sortBy, set_sort_By] = useState("level");
  const [sortedPlayers, setSortedPlayers] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [location, set_Location] = useState(null);
  console.log("Select locatioon", location);

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
    if (location) {
      playersSorted = playersSorted.filter((player) => {
        return player.locationId === location;
      });
    }
    setSortedPlayers(playersSorted);
  }, [sortBy, selectedLevel, players, location]);

  useEffect(() => {
    dispatch(fetchAllPlayers());
    dispatch(fetchAllLevels());
  }, [dispatch]);

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
              setSelectedLevel(parseFloat(e.target.value));
            }}
          >
            <option>Select level:</option>
            {levels?.map((lev) => (
              <option key={lev.id} value={lev.level?.levelRateFixed}>
                {lev.levelRateFixed}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            value={location}
            onChange={(e) => {
              set_Location(parseInt(e.target.value));
            }}
          >
            {players.map((locati) => (
              <option key={locati.id} value={locati.locationId}>
                {locati.location?.city}
              </option>
            ))}
          </Input>
        </FormGroup>
        <div>
          {" "}
          <Input type="select" onChange={changeSorting} value={sortBy}>
            <option value="level">MEN'S BUDDY</option>
            <option value="gender">WOMEN'S BUDDY</option>
          </Input>
        </div>
      </div>
      {selectedLevel && (
        <p>
          Current level: <b>{selectedLevel}</b>
        </p>
      )}
      {!sortedPlayers || sortedPlayers.length < 1
        ? "No playes with selected level"
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
