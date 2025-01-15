import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Read
export async function GET() {
  try {
    const news = await prisma.news.findMany();
    return NextResponse.json(news);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
  }
}

// Create
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const newNews = await prisma.news.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        publishedAt: new Date(data.publishedAt),
      },
    });
    return NextResponse.json(newNews);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create news' }, { status: 500 });
  }
}

// Update
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const updatedNews = await prisma.news.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        publishedAt: new Date(data.publishedAt),
      },
    });
    return NextResponse.json(updatedNews);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update news' }, { status: 500 });
  }
}

// Delete
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.news.delete({
      where: { id: id },
    });
    return NextResponse.json({ message: 'News deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete news' }, { status: 500 });
  }
}
