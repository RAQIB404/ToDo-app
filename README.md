# Todo App

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Open [http://localhost:3000/api/tasks] with your browser to see the data in JSON format.

## Prisma

To open Prisma Studio, run the following command:

```bash
npx prisma studio
```

Open [http://localhost:5555](http://localhost:5555) with your browser to see Prisma Studio.

## Task Management

### Add a Task

To add a task, fill out the task form with the title, description, priority, status, and due date, then click the "Add Task" button.

### Update a Task

To update a task, click on the task you want to edit, modify the task details in the form, and click the "Update Task" button.

### Delete a Task

To delete a task, click on the delete button associated with the task you want to remove.

## Kanban Board

This application includes a Kanban board to help you manage your tasks visually. The Kanban board is divided into columns representing different stages of task completion, such as "TO-DO", "IN-PROGRESS", and "DONE".

### Moving Tasks

To move a task from one column to another, simply drag and drop the task card to the desired column. This will update the task's status accordingly.

### Viewing Task Details

Click on a task card to view its details. You can edit the task's title, description, priority, status, and due date from the task detail view.

### Filtering Tasks

Use the filter options to view tasks based on their priority, status, or due date. This helps you focus on specific tasks that need attention.

### Task Notifications

Receive notifications for upcoming due dates and task status changes to stay on top of your tasks.

Enjoy managing your tasks with this intuitive Kanban board!