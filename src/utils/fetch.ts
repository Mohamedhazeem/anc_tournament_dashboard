import { Game } from "./propsType";
export const TOURNAMENT_URL = "https://mocki.io/v1/b4544a37-0765-405f-baf6-6675845d5a0e";

export const fetchDetails = async (url: string) : Promise<Game[]> => {

  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch data: ${response.statusText}`);
  }
  const data: Game[]  = await response.json() as Game[];

  return data;
};
