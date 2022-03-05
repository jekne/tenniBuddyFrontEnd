import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DisplayHomePageCard from "../../components/DisplayHomePageCard/DisplayHomePageCard";
import { fetchAllPlayers } from "../../store/user/actions";
import { selectAllUsers } from "../../store/user/selectors";

export default function HomePage() {
  const dispatch = useDispatch();

  const players = useSelector(selectAllUsers);
  console.log("players", players);

  useEffect(() => {
    dispatch(fetchAllPlayers());
  }, []);
  return (
    <div>
      <h1>ALL PLAYERS</h1>
      <div>
        {!players
          ? "Loading..."
          : players.map((x) => {
              return (
                <DisplayHomePageCard
                  key={x.id}
                  name={x.name}
                  levelId={x.levelId}
                  imageUrl={x.imageUrl}
                  location={x.location}
                />
              );
            })}
      </div>
    </div>
  );
}
//  "age": 28,
//             "createdAt": "2022-03-05T18:28:58.351Z",
//             "email": "dominic@dominic.com",
//             "gender": true,
//             "id": 10,
//             "imageUrl": "https://image-cdn.essentiallysports.com/wp-content/uploads/20210210153717/2021-02-08T055434Z_1695155671_UP1EH280GEY10_RTRMADP_3_TENNIS-AUSOPEN.jpg?width=900",
//             "levelId": "7.0",
//             "location": "Austrian",
//             "name": "Dominic Thiem",
//             "password": "$2b$10$6nrm6.cMvCa0tt.YY1f6JuHAhmvZ62dh0Ms2Ljd1gkp7RjyGzeqV.",
//             "telephone": 35890204,
//             "updatedAt": "2022-03-05T18:28:58.351Z"
