import client from "./api/client";

export const signupUser = async (userData) => {
  try {
    const response = await client.post("/auth/signup", userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    }
    throw { message: "Server not reachable" };
  }
};
