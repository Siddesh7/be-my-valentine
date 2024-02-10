import Reaction from "@/app/models/Reaction";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest): Promise<Response> {
  try {
    console.log("GET /api/leaderboard");
    await dbConnect();

    const users = await User.find({}, {_id: 0, __v: 0});
    console.log(users);
    users.sort((a, b) => b.total - a.total);

    return new NextResponse(JSON.stringify({data: users}), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({message: "Internal server error"}),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

export const POST = GET;
