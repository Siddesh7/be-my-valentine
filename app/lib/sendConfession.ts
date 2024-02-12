const sendConfessions = async (from: string, to: string, message: string) => {
  try {
    const res = await fetch("/api/confessions", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({from, to, message}),
    });
    return res.status === 201;
  } catch (error) {
    console.error("Failed to post data", error);
  }
};
export default sendConfessions;
