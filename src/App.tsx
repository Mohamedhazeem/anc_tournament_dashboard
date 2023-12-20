import { useEffect } from "react";
import { TOURNAMENT_URL, fetchDetails } from "./utils/fetch";
import GameComponent from "./components/GameComponent";
import { useSelector, useDispatch } from "react-redux";
import { setTournaments } from "./store/slice/tournamentSlice";
import { RootState } from "./store/store";
function App() {
  const dispatch = useDispatch();
  const tournamentDetails = useSelector(
    (state: RootState) => state.tournamentSlice.data
  );

  useEffect(() => {
    const detail = fetchDetails(TOURNAMENT_URL);
    detail
      .then((detail) => dispatch(setTournaments(detail)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="tournament-container">
        {tournamentDetails?.map((detail) => (
          <GameComponent game={detail.game} teams={detail.teams} />
        ))}
      </div>
    </>
  );
}

export default App;
