import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAppLoading } from "./store/appState/selectors";
import { getUserWithStoredToken } from "./store/user/actions";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Loading from "./components/Loading";
import MessageBox from "./components/MessageBox";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage/HomePage";
import Clubs from "./pages/Clubs/Clubs";
import UserProfile from "./pages/UserProfile/UserProfile";
import Levels from "./pages/Levels/Levels";
import PlayerDetails from "./pages/PlayerDetails/PlayerDetails";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectAppLoading);

  useEffect(() => {
    dispatch(getUserWithStoredToken());
  }, [dispatch]);

  return (
    <div className="App">
      <Navigation />
      <MessageBox />
      {isLoading ? <Loading /> : null}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/uprofile" element={<UserProfile />} />
        <Route path="/levels" element={<Levels />} />
        <Route path="/details/:id" element={<PlayerDetails />} />
      </Routes>
    </div>
  );
}

export default App;
