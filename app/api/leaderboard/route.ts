import Reaction from "@/app/models/Reaction";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest): Promise<Response> {
  try {
    console.log("GET /api/leaderboard");
    await dbConnect();

    // Fetch top 3 users based on their `total` score, excluding `_id` and `__v` fields
    const users = await User.find({}, {_id: 0, __v: 0})
      .sort({total: -1}) // Sort users in descending order by `total`
      .limit(3); // Limit the result to the top 3

    console.log(users);

    return new Response(JSON.stringify({data: users}), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.error(err); // Log the error for debugging purposes
    return new Response(JSON.stringify({message: "Internal server error"}), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export const POST = GET;
