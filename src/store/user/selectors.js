export const selectToken = (state) => state.user.token;

export const selectUser = (state) => state.user;

export const selectAllUsers = (state) => state.user.players;

export const SelectAllLevels = (state) => state.user.levels;

export const selectUserMatches = (state) => state.user.match;

export const selectAllUsersLocations = (state) => state.user.location;

export const selectUsersById = (state) => state.user.playerById;

export const selectUserVictories = (state) => state.user.matchesWinner;
