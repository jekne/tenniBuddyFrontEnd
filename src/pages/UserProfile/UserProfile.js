import { useDispatch, useSelector } from "react-redux";
import FormEditProfile from "../../components/Forms/FormEditProfile";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import { selectUser, selectUsersById } from "../../store/user/selectors";
import { useEffect } from "react";
import { ShowPlayerByID } from "../../store/user/actions";

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  console.log("users ", user.id);
  const id = user.id;

  const playerById = useSelector(selectUsersById);
  console.log("player by id", playerById);

  useEffect(() => {
    if (playerById) {
      dispatch(ShowPlayerByID(id));
    }
  }, [dispatch, id]);
  return (
    <div className="userProfileBackGround">
      <strong>
        {" "}
        <h1 className="userProfileTitle"> {user.name} BUDDY PROFILE</h1>{" "}
      </strong>
      {!user ? (
        "Loading ... "
      ) : (
        <div className="userProfile">
          <UserProfileCard
            key={playerById.id}
            email={playerById.email}
            gender={playerById.gender ? "Man" : "Woman"}
            imageUrl={playerById.imageUrl}
            levelId={playerById.level?.levelRateFixed}
            location={playerById.location?.city}
            name={playerById.name}
            telephone={playerById.telephone}
            age={playerById.age}
          />
          <strong>
            {" "}
            <FormEditProfile className="formEditProfile" />
          </strong>
        </div>
      )}
    </div>
  );
}
