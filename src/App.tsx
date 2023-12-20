import { useEffect } from "react";
import { TOURNAMENT_URL, fetchDetails } from "./utils/fetch";
import GameComponent from "./components/GameComponent";
import { useSelector, useDispatch } from "react-redux";
import { setTournaments } from "./store/slice/tournamentSlice";
import { RootState } from "./store/store";
function App() {
  const dispatch = useDispatch();
  const tournamentDetails = useSelector(
    (state: RootState) => state.tournamentSlice.games
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
        {tournamentDetails?.map((detail, gameId) => (
          <GameComponent
            key={gameId}
            game={detail.game}
            gameId={gameId}
            teams={detail.teams}
          />
        ))}
      </div>
    </>
  );
}

export default App;
