import Reaction from "@/app/models/Reaction";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    console.log("POST /api/reaction");
    await dbConnect();

    const body = await req.json();

    const {from, to, reaction, point = 1} = body;
    let points = Number(point) > 20 ? 20 : point;
    const response = await Reaction.create({
      from,
      to,
      reaction,
      point: points,
    });

    return new NextResponse(JSON.stringify({data: response}), {
      status: 201,
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

export async function GET(req: NextRequest): Promise<Response> {
  try {
    console.log("GET /api/reeactions");
    await dbConnect();
    const url = new URL(req.url);
    const username = url.searchParams.get("username");

    if (!username) {
      const reactions = await Reaction.find();

      return new NextResponse(JSON.stringify({reactions}), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const reactionsReceived = await Reaction.find({to: username});
    const reactionsSent = await Reaction.find({from: username});
    return new NextResponse(
      JSON.stringify({reactionsReceived, reactionsSent}),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
