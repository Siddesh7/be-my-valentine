export async function getConfessions(username: string) {
  try {
    const res = await fetch(`/api/confessions/?username=${username}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      throw new Error(res.status.toString());
    }
    return res.json();
  } catch (error) {
    console.error("Failed to post data", error);
  }
}
