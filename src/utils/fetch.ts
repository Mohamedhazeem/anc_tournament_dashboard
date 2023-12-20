export type fetchTournamentDetailType = {
  game: string | "";
  teams: [
    {
      team_name: string | "";
      players: [
        {
          name: string | "";
          age: number ;
        }
      ];
    }
  ];
};

export const TOURNAMENT_URL = "https://mocki.io/v1/b4544a37-0765-405f-baf6-6675845d5a0e";

export const fetchDetails = async (url: string) : Promise<fetchTournamentDetailType[]> => {

  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  //eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const data: fetchTournamentDetailType[]  = await response.json();

  return data;
};
