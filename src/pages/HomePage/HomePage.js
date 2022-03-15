import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplayHomePageCard from "../../components/DisplayHomePageCard/DisplayHomePageCard";
import { fetchAllLevels, fetchAllPlayers } from "../../store/user/actions";
import { selectAllUsers, SelectAllLevels } from "../../store/user/selectors";
import { FormGroup } from "react-bootstrap";
import { Input, Label } from "reactstrap";
import { useState } from "react";
import { selectAlllocations } from "../../store/locations/selectors";
import { fetchAllLocations } from "../../store/locations/actions";

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
  const locationsSelector = useSelector(selectAlllocations);

  const [sortBy, set_sort_By] = useState("level");
  const [sortedPlayers, setSortedPlayers] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [location, set_Location] = useState(null);

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
    dispatch(fetchAllLocations());
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
          <Label for="exampleSelect">FIND YOUR TENNIS BUDDY</Label>
          <Input
            id="exampleSelect"
            name="select"
            type="select"
            value={selectedLevel}
            onChange={(e) => {
              setSelectedLevel(parseFloat(e.target.value));
            }}
          >
            <option>SELECT LEVEL</option>
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
            <option> LOCATION</option>
            {locationsSelector.map((locati) => (
              <option key={locati.id} value={locati.id}>
                {locati.city}
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
        : sortedPlayers.map((player) => {
            return (
              <strong>
                {" "}
                <DisplayHomePageCard
                  key={player.id}
                  name={player.name}
                  levelId={player.level?.levelRateFixed}
                  imageUrl={player.imageUrl}
                  location={player.location?.city}
                  description={player.description}
                  id={player.id}
                />
              </strong>
            );
          })}
    </div>
  );
}
