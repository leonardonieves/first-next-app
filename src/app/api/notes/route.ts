//url: http://domain:port/api/notes

import prisma from "@/libs/prismaDb";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
    try {
        const body = await request.json();
        const { title, description } = body;

        const newNote = await prisma.note.create({
            data: {
                title,
                description
            }
        })

        return NextResponse.json(newNote);
    } catch (error) {
        return NextResponse.json({ message: "POST error", error }, { status: 500 })
    }
}

export const GET = async (request: any) => {
    try {
        

        const notes = await prisma.note.findMany()

        return NextResponse.json(notes);
    } catch (error) {
        return NextResponse.json({ message: "GET error", error }, { status: 500 })
    }
}