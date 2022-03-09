import { useEffect } from "react";
import { useDispatch } from "react-redux";
import MatchesCard from "../../components/MatchesCard/MatchesCard";

import { fetchMatchById, fetchWinner } from "../../store/user/actions";
import { selectUser } from "../../store/user/selectors";
import { useSelector } from "react-redux";
import {
  selectUserMatches,
  selectUserVictories,
} from "../../store/user/selectors";

export default function MatchesPlayed() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  // console.log("users ", user.id);
  const id = user.id;

  const matches = useSelector(selectUserMatches);
  // console.log("Matches", matches);

  const victories = useSelector(selectUserVictories);
  console.log("victories", victories);

  useEffect(() => {
    dispatch(fetchMatchById(id));
    dispatch(fetchWinner(id));
  }, [dispatch, id]);

  return (
    <div>
      <h1>MATCHES PLAYED</h1>
      {!matches ? (
        "Loading..."
      ) : (
        <MatchesCard
          imageUrl={matches.imageUrl}
          location={matches.location?.city}
          winnerId={victories.winnerId.length}
        />
      )}
    </div>
  );
}
//
