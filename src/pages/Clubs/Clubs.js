import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClubs } from "../../store/clubs/actions";
import { selectClubs } from "../../store/clubs/selectors";
import ClubCards from "../../components/ClubsCard/ClubCards";

export default function Clubs() {
  const dispatch = useDispatch();

  const clubs = useSelector(selectClubs);
  console.log("All the clubs", clubs);

  useEffect(() => {
    dispatch(fetchClubs());
  }, [dispatch]);
  return (
    <div>
      {!clubs
        ? "Loading..."
        : clubs.map((x) => {
            return (
              <ClubCards
                key={x.id}
                name={x.name}
                imageUrl={x.imageUrl}
                adress={x.adress}
                zipCode={x.zipCode}
                email={x.email}
                rateClub={x.rateClub}
                telephone={x.telephone}
                webSite={x.webSite}
              />
            );
          })}
    </div>
  );
}
