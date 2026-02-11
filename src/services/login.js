import client from "./api/client";

export const loginUser = async (data) => {
  const res = await client.post("/auth/login", data);
  return res.data;
};
