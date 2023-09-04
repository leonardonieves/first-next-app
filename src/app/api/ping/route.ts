import { NextResponse } from "next/server";

export const GET = async () => {
    return NextResponse.json({ message: "Healthy OK" }, { status: 200 })
}