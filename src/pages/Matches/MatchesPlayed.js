// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import MatchesCard from "../../components/MatchesCard/MatchesCard";
// import { CardGroup } from "react-bootstrap";
// import { selectUser } from "../../store/user/selectors";
// import { useSelector } from "react-redux";

// import {
//   fetchAllMatches,
//   getMatcheId,
//   fetchPlayersWhoPlayed,
//   fetchSets,
// } from "../../store/matches/actions";
// import {
//   selectAllMatches,
//   selectMatchesPlayed,
//   selectPlayerThatPlayedInThatMatch,
//   selectSetsPlayed,
// } from "../../store/matches/selector";
// import { Card } from "react-bootstrap";

// export default function MatchesPlayed() {
//   const dispatch = useDispatch();

//   const user = useSelector(selectUser);
//   const id = user.id;

//   const matchesPlayedByTheUser = useSelector(selectMatchesPlayed);
//   console.log("matches Played By The User", matchesPlayedByTheUser);

//   const matchesPlayed = matchesPlayedByTheUser?.matchId;

//   console.log("what matches played", matchesPlayed);

//   const matchBetween = useSelector(selectPlayerThatPlayedInThatMatch);
//   // console.log("match beteween", matchBetween);

//   const setsPlayed = useSelector(selectSetsPlayed);
//   console.log("Set played", setsPlayed);
//   // console.log("set played dot lenght", setsPlayed?.[1]);

//   useEffect(() => {
//     dispatch(getMatcheId());
//     if (matchesPlayed) {
//       dispatch(fetchPlayersWhoPlayed(matchesPlayed));
//       dispatch(fetchSets(matchesPlayed));
//     }
//   }, [dispatch, id, matchesPlayed]);

//   return (
//     <div>
//       <h1>MATCHES PLAYED</h1>
//       {!setsPlayed ? (
//         "Loading"
//       ) : (
//         <>
//           <div>
//             {setsPlayed?.[1].map((sets) => {
//               return (
//                 <div key={sets.id}>
//                   <CardGroup>
//                     <Card>
//                       <h1> {sets.user.name}</h1>{" "}
//                       <div>
//                         {" "}
//                         <img src={sets.user.imageUrl} width="300" />
//                       </div>
//                     </Card>
//                   </CardGroup>
//                   <h3>First Set :{sets.score}</h3>
//                 </div>
//               );
//             })}
//           </div>
//           <div>
//             {setsPlayed?.[2].map((sets) => {
//               return (
//                 <div key={sets.id}>
//                   {" "}
//                   <h3>Second Set:{sets.score}</h3>
//                 </div>
//               );
//             })}
//           </div>
//           <div>
//             {setsPlayed?.[3].map((sets) => {
//               return (
//                 <div key={sets.id}>
//                   {" "}
//                   <h3>Third Set:{sets.score}</h3>
//                 </div>
//               );
//             })}
//           </div>
//         </>
//       )}
//     </div>
//   );
// }
// //
