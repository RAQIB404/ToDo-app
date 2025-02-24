"use client";

import {  forwardRef } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: number;
  dueDate: string;
}

const statuses = ["TO-DO", "IN-PROGRESS", "DONE"];

interface KanbanBoardProps {
  tasks: Task[];
  onTaskUpdate: (updatedTask: Task) => Promise<void>;
}

export default function KanbanBoard({ tasks, onTaskUpdate }: KanbanBoardProps) {
  function handleDragEnd(result: any) {
    if (!result.destination) return;
    const { draggableId, destination } = result;
    const updatedTask = tasks.find((task) => task.id === draggableId);
    if (updatedTask) {
      onTaskUpdate({ ...updatedTask, status: destination.droppableId });
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-3 gap-6 p-6">
        {statuses.map((status) => (
          <Droppable key={status} droppableId={status}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="p-4 bg-gray-900 rounded-lg min-h-[300px] shadow-lg"
              >
                <h2 className="text-xl font-bold text-white mb-3">{status}</h2>
                {tasks
                  .filter((task) => task.status === status)
                  .map((task, index) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <MotionTask
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          title={task.title}
                          description={task.description}
                        />
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}

// Wrap motion.div with forwardRef
const MotionTask = forwardRef<HTMLDivElement, { title: string; description: string }>(
  ({ title, description, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        {...props}

        className="p-4 bg-gray-700 rounded-lg mb-3 shadow-md cursor-pointer"
      >
        <h3 className="font-semibold text-white">{title}</h3>
      </motion.div>
    );
  }
);

MotionTask.displayName = "MotionTask";
