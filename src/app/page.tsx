"use client";

import { useState, useEffect } from "react";
import TaskForm from "../components/TaskForm";
import KanbanBoard from "../components/KanbanBoard";
import ThemeToggle from "../components/ThemeToggle";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: number;
  dueDate: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(() => []);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const res = await fetch("/api/tasks");
      if (!res.ok) throw new Error("Failed to fetch tasks");
      const data = await res.json();
      if (Array.isArray(data)) {
        setTasks(data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  }

  async function updateTask(updatedTask: Task) {
    await fetch(`/api/${updatedTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    fetchTasks();
    setEditingTask(null);
  }

  async function deleteTask(id: string) {
    const res = await fetch(`/api/tasks`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      fetchTasks();
    } else {
      console.error("Error deleting task");
    }
  }

  return (
    <main className="min-h-screen p-6 bg-white text-black dark:bg-black dark:text-white">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Task List</h1>
        <ThemeToggle />
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <TaskForm onTaskAdded={fetchTasks} />
      <KanbanBoard tasks={tasks} onTaskUpdate={updateTask} />
      <div className="mt-4">
        {tasks.map((task) => (
          <div key={task.id} className="bg-gray-800 p-4 rounded-lg mb-2">
            {editingTask?.id === task.id ? (
              <TaskForm
                onTaskAdded={fetchTasks}
                initialTask={editingTask}
                onSubmit={(task) => updateTask(task)}
                onCancel={() => setEditingTask(null)}
              />
            ) : (
              <>
                <h2 className="text-xl font-semibold">Title:{task.title}</h2>
                <p>Description:{task.description}</p>
                <p className="text-sm text-gray-400">Status: {task.status}</p>
                <p className="text-sm text-gray-400">Priority: {task.priority}</p>
                <p className="text-sm text-gray-400">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => setEditingTask(task)}
                    className="p-2 bg-yellow-500 rounded text-black"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-2 bg-red-500 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
