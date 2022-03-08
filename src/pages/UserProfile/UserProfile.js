import { useSelector } from "react-redux";
import FormEditProfile from "../../components/Forms/FormEditProfile";
import UserProfileCard from "../../components/UserProfileCard/UserProfileCard";
import { selectUser } from "../../store/user/selectors";

export default function UserProfile() {
  const user = useSelector(selectUser);
  // console.log("users ", user);

  return (
    <div>
      <h1>USER PROFILE</h1>
      {!user ? (
        "Loading ... "
      ) : (
        <div>
          <UserProfileCard
            key={user.id}
            email={user.email}
            gender={user.gender ? "Man" : "Woman"}
            imageUrl={user.imageUrl}
            levelId={user.levelId}
            location={user.location}
            name={user.name}
            telephone={user.telephone}
            age={user.age}
          />
          <FormEditProfile />
        </div>
      )}
    </div>
  );
}
