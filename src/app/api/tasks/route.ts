import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";

export async function GET() {
  try {
    console.log("API /api/tasks hit"); // Debugging log
    const tasks = await prisma.task.findMany(); // Fetch tasks from DB
    console.log("Tasks fetched:", tasks);
    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Received task:", body);

    if (!body.title || !body.status || !body.priority || !body.dueDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newTask = await prisma.task.create({
      data: {
        title: body.title,
        description: body.description,
        priority: body.priority,
        status: body.status,
        dueDate: new Date(body.dueDate),
      },
    });

    return NextResponse.json(newTask);
  } catch (error) {
    console.error("Error creating task:", error);
    if (error instanceof Error && error.message.includes("Can't reach database server")) {
      return NextResponse.json({ error: "Database connection error" }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    console.log("Updating task:", body);

    if (!body.id) {
      return NextResponse.json({ error: "Task ID is required" }, { status: 400 });
    }

    const updatedTask = await prisma.task.update({
      where: { id: body.id },
      data: {
        title: body.title,
        description: body.description,
        priority: body.priority,
        status: body.status,
        dueDate: new Date(body.dueDate),
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    if (error instanceof Error && error.message.includes("Can't reach database server")) {
      return NextResponse.json({ error: "Database connection error" }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.task.delete({ where: { id } });
    return NextResponse.json({ message: "Task deleted" });
  } catch (error) {
    console.error("Error deleting task:", error);
    if (error instanceof Error && error.message.includes("Can't reach database server")) {
      return NextResponse.json({ error: "Database connection error" }, { status: 500 });
    }
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
