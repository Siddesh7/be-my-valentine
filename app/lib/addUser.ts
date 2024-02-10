const addUser = async (name: string, username: string, image: string) => {
  try {
    const res = await fetch("/api/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, username, image}),
    });
    if (!res.ok) {
      throw new Error(res.status.toString());
    }
    return res.json();
  } catch (error) {
    console.error("Failed to post data", error);
  }
};
export default addUser;
