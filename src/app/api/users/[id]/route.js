import User from "@/models/User";
import connect from "@/utils/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const DELETE = async (request, { params }) => {
  const { id } = params;
  try {
    await connect();
    await User.findByIdAndDelete(id);
    return new NextResponse("Deleted", { status: 200 });
  } catch (error) {
    return new NextResponse("error", { status: 500 });
  }
};
export const PUT = async (request, { params }) => {
  try {
    await connect();
    const { name, email, password } = await request.json();
    const hashedPassword = await bcrypt.hash(password, 5);
    await User.findByIdAndUpdate(params.id, {
      name,
      email,
      password: hashedPassword,
    });
    return new NextResponse("Edited", { status: 200 });
  } catch (error) {
    console.log(error);
    return new NextResponse(error, { status: 500 });
  }
};
