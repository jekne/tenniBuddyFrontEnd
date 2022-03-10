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
import {
  fetchAllMatches,
  getMatcheId,
  fetchPlayersWhoPlayed,
} from "../../store/matches/actions";
import {
  selectAllMatches,
  selectMatchesPlayed,
} from "../../store/matches/selector";

export default function MatchesPlayed() {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);
  const id = user.id;

  const matchesPlayedByTheUser = useSelector(selectMatchesPlayed);
  // console.log("matches Played By The User", matchesPlayedByTheUser);

  const matchesPlayed = matchesPlayedByTheUser?.matchId;

  console.log("what matches played", matchesPlayed);

  useEffect(() => {
    dispatch(getMatcheId());
    if (matchesPlayed) {
      dispatch(fetchPlayersWhoPlayed(matchesPlayed));
    }
  }, [dispatch, id, matchesPlayed]);

  return (
    <div>
      <h1>MATCHES PLAYED</h1>
      {/* {!matches ? (
        "Loading..."
      ) : (
        <MatchesCard
          imageUrl={matches.imageUrl}
          location={matches.location?.city}
          // winnerId={victories.winnerId.length}
        />
      )} */}
    </div>
  );
}
//
