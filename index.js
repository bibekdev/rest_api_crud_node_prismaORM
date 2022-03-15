const express = require('express');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// get all tasks
app.get('/task', async (req, res) => {
  const task = await prisma.task.findMany();
  res.json(task);
});

// get task by id
app.get('/task/:id', async (req, res) => {
  const id = req.params.id;
  const task = await prisma.task.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.json(task);
});

// create new tasks
app.post('/task/create', async (req, res) => {
  const { title, description } = req.body;
  const task = await prisma.task.create({
    data: {
      title: title,
      description: description,
    },
  });
  res.json(task);
});

// update existing task
app.put('/task/update/:id', async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  const task = await prisma.task.update({
    where: {
      id: Number(id),
    },
    data: {
      title: title,
      description: description,
    },
  });
  res.json(task);
});

// delete existing task
app.delete('/task/delete/:id', async (req, res) => {
  const id = req.params.id;
  const task = await prisma.task.delete({
    where: {
      id: Number(id),
    },
  });
  res.json({ message: 'The task is deleted' });
});

const PORT = 8000 || process.env.PORT;
app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
