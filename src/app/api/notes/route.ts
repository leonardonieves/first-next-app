//url: http://domain:port/api/notes

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const POST = async (request: any) => {
    await prisma.$connect();
    try {
        const body = await request.json();
        const { title, description } = body;

        const newNote = await prisma.note.create({
            data: {
                title,
                description
            }
        })
        await prisma.$disconnect();
        return NextResponse.json(newNote);
    } catch (error) {
        await prisma.$disconnect();
        return NextResponse.json({ message: "POST error", error }, { status: 500 })
    }
}

export const GET = async (request: any) => {
    await prisma.$disconnect();
    try {

        const notes = await prisma.note.findMany();
        await prisma.$disconnect();
        return NextResponse.json(notes);
    } catch (error) {
        await prisma.$disconnect();
        return NextResponse.json({ message: "GET error", error }, { status: 500 })
    }
}