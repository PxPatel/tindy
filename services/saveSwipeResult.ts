import { SwipeResult } from "../types/types";

const saveSwipeResult = async (
  email: string,
  trackId: string = "",
  decision: SwipeResult = SwipeResult.LIKE
): Promise<boolean> => {
  // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // if (!emailRegex.test(email)) {
  //   throw new Error("Invalid email format");
  // }

  const baseUrl = process.env.BASE_URL;
  const endpoint = process.env.SWIPE_RESULT_ENDPOINT;

  if (!baseUrl || !endpoint) {
    console.error(
      "Base URL or endpoint is not defined in environment variables."
    );
    return false;
  }

  try {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, trackId, decision }),
    });

    if (!response.ok) {
      console.error(`Failed to save swipe result: ${response.statusText}`);
      return false;
    }

    return true;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(
        `Error occurred while saving swipe result: ${error.message}`
      );
    } else {
      console.error(`An unknown error occurred while saving swipe result.`);
    }
    return false;
  }
};

export default saveSwipeResult;
