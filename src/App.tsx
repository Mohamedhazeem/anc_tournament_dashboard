import { useEffect, useState } from "react";
import {
  TOURNAMENT_URL,
  fetchDetails,
  fetchTournamentDetailType,
} from "./utils/fetch";
import GameComponent from "./components/GameComponent";

function App() {
  const [details, setDetails] = useState<fetchTournamentDetailType[]>();
  useEffect(() => {
    const detail = fetchDetails(TOURNAMENT_URL);
    detail
      .then((detail) => setDetails(detail))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <div className="tournament-container">
        {details?.map((detail) => (
          <GameComponent game={detail.game} teams={detail.teams} />
        ))}
      </div>
    </>
  );
}

export default App;
