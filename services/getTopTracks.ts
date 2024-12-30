import { Card } from "../types/types";

const getTopTracks = async (
  email: string,
  limit?: number,
  offset?: number
): Promise<Card[]> => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   if (!emailRegex.test(email)) {
//     throw new Error("Invalid email format");
//   }


  console.log("getTopTracks called");
  const baseUrl = process.env.BASE_URL ?? "http://localhost:3000";
  const endpoint = process.env.TOP_TRACK_ENDPOINT ?? "/api/v1/top-tracks";
  if (!baseUrl || !endpoint) {
    throw new Error(
      "API base URL or endpoint is not defined in environment variables"
    );
  }

  const url = `${baseUrl}${endpoint}?email=${email}${
    limit ? `&limit=${limit}` : ""
  }${offset ? `&offset=${offset}` : ""}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    const data = await response.json();
    return data.map((item: any) => ({
      id: item.id,
      albumCover: item.albumCover,
      trackName: item.trackName,
      albumName: item.albumName,
      artistName: item.artistName,
    }));
  } catch (error) {
    console.error("Error fetching top tracks:", error);
    throw new Error("Failed to fetch top tracks");
  }
};

export default getTopTracks;