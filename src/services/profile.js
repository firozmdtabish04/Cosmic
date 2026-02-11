import client from "./api/client";

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await client.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateProfile = async (data) => {
  const token = localStorage.getItem("token");

  const res = await client.put("/auth/profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
