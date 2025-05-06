export const fetchUsersService = async () => {
  const res = await fetch("http://localhost:3000/api/get-users", {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Erreur lors du chargement");
  }

  const data = await res.json();
  return data.users;
};
  
export const deleteUserService = async (userId: string) => {
  const res = await fetch("http:/localhost:3000/api/delete-user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });

  return res.ok;
};
  