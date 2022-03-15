import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/user/actions";
import Button from "react-bootstrap/Button";
import { selectUser } from "../../store/user/selectors";
import Nav from "react-bootstrap/Nav";

export default function LoggedIn() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  return (
    <>
      <strong>
        {" "}
        <Nav.Item style={{ padding: ".5rem 1rem" }}>{user.name}</Nav.Item>
      </strong>
      <Button onClick={() => dispatch(logOut())}>Logout</Button>
    </>
  );
}
