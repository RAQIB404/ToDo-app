"use client";

import { useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: number;
  status: string;
  dueDate: string;
}

export default function TaskForm({
  onTaskAdded,
  initialTask,
  onSubmit,
  onCancel, 
}: {
  onTaskAdded: () => void;
  initialTask?: Task;
  onSubmit?: (task: Task) => void;
  onCancel?: () => void;
}) {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(initialTask?.description || "");
  const [priority, setPriority] = useState(initialTask?.priority || 1);
  const [status, setStatus] = useState(initialTask?.status || "TO-DO");
  const [dueDate, setDueDate] = useState(
    initialTask ? initialTask.dueDate.split("T")[0] : ""
  );
  const [id, setId] = useState(initialTask?.id || ""); 

  useEffect(() => {
    if (initialTask) {
      setId(initialTask.id || "");
      setTitle(initialTask.title);
      setDescription(initialTask.description);
      setPriority(initialTask.priority);
      setStatus(initialTask.status);
      setDueDate(initialTask.dueDate.split("T")[0]);
    }
  }, [initialTask]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const newTask = { id, title, description, priority, status, dueDate };
  
    if (onSubmit && id) {
      onSubmit(newTask);
      setId("");
      setTitle("");
      setDescription("");
      setPriority(1);
      setStatus("TO-DO");
      setDueDate("");
      onCancel?.();
    } else {
      try {
        const res = await fetch("/api/tasks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTask),
        });
  
        if (res.ok) {
          setTitle("");
          setDescription("");
          setPriority(1);
          setStatus("TO-DO");
          setDueDate("");
          onTaskAdded();
        } else {
          console.error("Failed to add task");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 bg-gray-800 p-4 rounded-lg">
      
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="p-2 rounded bg-gray-700 text-white"
      />
     
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 rounded bg-gray-700 text-white"
      />
      <input
        type="number"
        min="1"
        max="5"
        placeholder="Priority (1-5)"
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        className="p-2 rounded bg-gray-700 text-white"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="p-2 rounded bg-gray-700 text-white"
      >
        <option value="TO-DO">TO-DO</option>
        <option value="IN-PROGRESS">IN-PROGRESS</option>
        <option value="DONE">DONE</option>
      </select>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        className="p-2 rounded bg-gray-700 text-white"
      />

      <div className="flex space-x-4">
        <button type="submit" className="p-2 bg-blue-500 rounded text-white">
          {initialTask ? "Update Task" : "Add Task"}
        </button>
        {initialTask && (
          <button type="button" onClick={onCancel} className="p-2 bg-gray-500 rounded text-white">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
