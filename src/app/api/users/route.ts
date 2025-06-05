// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '../../lib/prisma'; // adjust this path based on your actual file structure
// import fs from 'fs';
// import path from 'path';
 

// export async function GETJson() {
//   const filePath = path.join(process.cwd(), 'data', 'users.json');
//   const fileContent = fs.readFileSync(filePath, 'utf8');
//   const users = JSON.parse(fileContent);
//   return new Response(JSON.stringify(users));
// }
// // GET all users
// export async function GET() {
//   try {
//     const users = await prisma.user.findMany();
//     return NextResponse.json(users);
//   } catch (error) {
//     console.error('Error fetching users:', error);
//     return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
//   }
// }

// // CREATE new user
// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const newUser = await prisma.user.create({
//       data: {
//         placeName: body.placeName,
//         review: parseFloat(body.review),
//         noofReviews: parseInt(body.noofReviews),
//         reviewContent: body.reviewContent,
//         image: body.image,
//       },
//     });

//     return NextResponse.json(newUser, { status: 201 });
//   } catch (error) {
//     console.error('Failed to insert user:', error);
//     return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
//   }
// }

// // UPDATE user
// export async function PUT(req: NextRequest) {
//   try {
//     const body = await req.json();

//     const updatedUser = await prisma.user.update({
//       where: { id: body.id },
//       data: {
//         placeName: body.placeName,
//         review: body.review,
//         noofReviews: body.noofReviews,
//         reviewContent: body.reviewContent,
//         image: body.image,
//       },
//     });

//     return NextResponse.json(updatedUser);
//   } catch (error) {
//     console.error('Failed to update user:', error);
//     return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
//   }
// }

// // DELETE user
// export async function DELETE(req: NextRequest) {
//   try {
//     const { id } = await req.json();

//     await prisma.user.delete({ where: { id } });
//     return new NextResponse(null, { status: 204 });
//   } catch (error) {
//     console.error('Failed to delete user:', error);
//     return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
//   }
// }


// ✅ Revised route.ts using JSON instead of Prisma
// import { NextRequest, NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';

// const filePath = path.join(process.cwd(), 'data', 'users.json');

// // Ensure file exists
// if (!fs.existsSync(filePath)) {
//   fs.mkdirSync(path.dirname(filePath), { recursive: true });
//   fs.writeFileSync(filePath, '[]', 'utf8');
// }

// function readData() {
//   const fileContent = fs.readFileSync(filePath, 'utf8');
//   return JSON.parse(fileContent);
// }

// function writeData(data: any) {
//   fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
// }

// // GET all users
// export async function GET() {
//   try {
//     const users = readData();
//     return NextResponse.json(users);
//   } catch (error) {
//     console.error('Error reading JSON:', error);
//     return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
//   }
// }

// // CREATE new user
// export async function POST(req: NextRequest) {
//   try {
//     const body = await req.json();
//     const users = readData();

//     const newUser = {
//       id: users.length ? Math.max(...users.map((u: any) => u.id)) + 1 : 1,
//       ...body,
//       review: parseFloat(body.review),
//       noofReviews: parseInt(body.noofReviews),
//     };

//     users.push(newUser);
//     writeData(users);

//     return NextResponse.json(newUser, { status: 201 });
//   } catch (error) {
//     console.error('Failed to insert user:', error);
//     return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
//   }
// }

// // UPDATE user
// export async function PUT(req: NextRequest) {
//   try {
//     const body = await req.json();
//     let users = readData();
//     const index = users.findIndex((u: any) => u.id === body.id);

//     if (index === -1) throw new Error('User not found');

//     users[index] = { ...body };
//     writeData(users);

//     return NextResponse.json(users[index]);
//   } catch (error) {
//     console.error('Failed to update user:', error);
//     return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
//   }
// }

// // DELETE user
// export async function DELETE(req: NextRequest) {
//   try {
//     const { id } = await req.json();
//     let users = readData();
//     users = users.filter((u: any) => u.id !== id);
//     writeData(users);

//     return new NextResponse(null, { status: 204 });
//   } catch (error) {
//     console.error('Failed to delete user:', error);
//     return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
//   }
// }

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'users.json');

interface User {
  id: number;
  placeName: string;
  review: number;
  noofReviews: number;
  reviewContent: string;
  image: string;
}

function readData(): User[] {
  if (!fs.existsSync(filePath)) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, '[]', 'utf8');
  }
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(fileContent) as User[];
}

function writeData(data: User[]): void {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  try {
    const users = readData();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Omit<User, 'id'>;
    const users = readData();

    const newUser: User = {
      id: Date.now(),
      ...body,
    };

    const updatedUsers = [...users, newUser];
    writeData(updatedUsers);

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Failed to add user:', error);
    return NextResponse.json({ error: 'Failed to add user' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = (await req.json()) as User;
    const users = readData();

    const updatedUsers = users.map((u) => (u.id === body.id ? body : u));
    writeData(updatedUsers);

    return NextResponse.json(body);
  } catch (error) {
    console.error('Failed to update user:', error);
    return NextResponse.json({ error: 'Failed to update user' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { id } = (await req.json()) as { id: number };
    const users = readData();

    const updatedUsers = users.filter((u) => u.id !== id);
    writeData(updatedUsers);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete user:', error);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
