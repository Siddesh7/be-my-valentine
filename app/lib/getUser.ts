import User from "../models/User";
import dbConnect from "./dbConnect";

export async function getUser(username: string) {
  await dbConnect();
  const users = await User.find({username}, {_id: 0, __v: 0});
  console.log(users);
  return users;
}
