export const selectAllMatches = (state) => state.matches.allMatches;

export const selectMatchesPlayed = (state) =>
  state.matches.matchesPlayed.findThematchesPlayed;

export const selectPlayerThatPlayedInThatMatch = (state) =>
  state.matches.matchesPlayedPicture.whoPlayedThatMatch;

export const selectSetsPlayed = (state) => state.matches.sets.SetByMatchId;
