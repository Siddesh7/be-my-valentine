import dbConnect from "../../lib/dbConnect";
import User from "../../models/User";

import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest): Promise<Response> {
  try {
    console.log("POST /api/user");
    await dbConnect();

    const body = await req.json();

    const {name, username, image} = body;
    const userExists = await User.findOneAndUpdate(
      {username: username}, // Condition to find the user by username
      {$set: {name, image}}, // Update only the specified fields
      {new: true, upsert: false} // Return the updated document
    );

    if (userExists) {
      console.log("User already exists");

      return new NextResponse(JSON.stringify({message: "User already exists"}));
    }
    const response = await User.create({
      name,
      username,
      image,
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
    console.log("GET /api/user");

    await dbConnect();
    const url = new URL(req.url);
    const username = url.searchParams.get("username");
    console.log(username);
    if (!username) {
      const users = await User.find({}, {_id: 0, __v: 0});
      return new NextResponse(JSON.stringify({data: users}), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    const messages = await User.findOne({username: username}, {_id: 0, __v: 0});
    console.log(messages);
    return new NextResponse(JSON.stringify({data: messages}), {
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
