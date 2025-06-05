import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../lib/prisma'; // adjust this path based on your actual file structure

// GET all users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// CREATE new user
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newUser = await prisma.user.create({
      data: {
        placeName: body.placeName,
        review: parseFloat(body.review),
        noofReviews: parseInt(body.noofReviews),
        reviewContent: body.reviewContent,
        image: body.image,
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Failed to insert user:', error);
    return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
  }
}

// UPDATE user
export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const updatedUser = await prisma.user.update({
      where: { id: body.id },
      data: {
        placeName: body.placeName,
        review: body.review,
        noofReviews: body.noofReviews,
        reviewContent: body.reviewContent,
        image: body.image,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

// DELETE user
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    await prisma.user.delete({ where: { id } });
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}

