import connect from "@/utils/db";
import User from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const GET = async (request) => {
  try {
    await connect();
    const users = await User.find({});
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new NextResponse(error, { status: 500 });
  }
};
export const POST = async (request) => {
  try {
    await connect();
    const { name, email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    return new NextResponse("Created", { status: 201 });
  } catch (error) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
};
