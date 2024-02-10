const sendReaction = async (
  from: string,
  to: string,
  reaction: number,
  points?: number
) => {
  try {
    const res = await fetch("/api/reactions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({from, to, reaction, point: points || 1}),
    });
    return res.status === 201;
  } catch (error) {
    console.error("Failed to post data", error);
  }
};
export default sendReaction;
