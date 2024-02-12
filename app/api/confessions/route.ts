import Reaction from "@/app/models/Reaction";
import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

import {NextRequest, NextResponse} from "next/server";
import ConfessionModel from "@/app/models/Confession";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    console.log("POST /api/confessions");
    await dbConnect();

    const body = await req.json();

    const {from, to, message} = body;
    const response = await ConfessionModel.create({
      from,
      to,
      message,
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
    console.log("GET /api/confessions");
    await dbConnect();
    const url = new URL(req.url);
    const username = url.searchParams.get("username");

    if (!username) {
      const confessions = await ConfessionModel.find();
      return new NextResponse(JSON.stringify({confessions}), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const reactionsReceived = await ConfessionModel.find({to: username});
    const reactionsSent = await ConfessionModel.find({from: username});
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
