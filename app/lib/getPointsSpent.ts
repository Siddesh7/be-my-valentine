export async function getPointsSpent(username: string) {
  try {
    const res = await fetch(`/api/reactions/?username=${username}`, {
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
