const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, 'public')));

// Sample data
let lessons = [
  { id: 1, subject: "Geometry", uploadedby: "Zeirah", description: "An introduction to geometric shapes." },
  { id: 2, subject: "Biology", uploadedby: "Liamxian", description: "Basic concepts in biology." },
  { id: 3, subject: "Calculus", uploadedby: "Sunny", description: "Derivatives and integrals." }
];

// Routes
app.get('/api/lessons', (req, res) => res.json(lessons));

app.get('/api/lessons/:id', (req, res) => {
  const lesson = lessons.find(l => l.id == req.params.id);
  if (!lesson) return res.status(404).json({ message: "Not found" });
  res.json(lesson);
});

app.post('/api/lessons', (req, res) => {
  const { subject, uploadedby, description } = req.body;

  const newLesson = {
    id: lessons.length + 1,
    subject,
    uploadedby,
    description
  };

  lessons.push(newLesson);
  res.status(201).json(newLesson);
});

app.put('/api/lessons/:id', (req, res) => {
  const lesson = lessons.find(l => l.id == req.params.id);
  if (!lesson) return res.status(404).json({ message: "Not found" });

  Object.assign(lesson, req.body);
  res.json(lesson);
});

app.delete('/api/lessons/:id', (req, res) => {
  lessons = lessons.filter(l => l.id != req.params.id);
  res.json({ message: "Deleted" });
});

// IMPORTANT: homepage fix
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});