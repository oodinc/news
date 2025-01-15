import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get Detail News by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Await the params to ensure they are fully resolved before use
    const { id } = await params;  // this line ensures that params is awaited
    const news = await prisma.news.findUnique({
      where: { id: Number(id) },
    });

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json(news);
  } catch {
    return NextResponse.json({ error: "Failed to fetch news" }, { status: 500 });
  }
}
