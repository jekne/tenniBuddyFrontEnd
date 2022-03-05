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
// adress: "Koenenkade 8" ok
// createdAt: "2022-03-04T20:15:42.313Z"
// email: "tennis@amstelpark.nl" ok
// id: 1
// imageUrl: "https://www.amstelveenz.nl/resize/upload/60/5921/logo_amstelpark_tennis_amsterdam-NEWSLARGELOGO.jpg"
// name: "Amstelpark Tennisclub " ok
// rateClub: 5 ok
// telephone: "020-301-0715" ok
// updatedAt: "2022-03-04T20:15:42.313Z"
// webSite: "https://www.amstelpark.nl/"
// zipCode: " ok
//src="holder.js/100px160"

//src="holder.js/100px160"
