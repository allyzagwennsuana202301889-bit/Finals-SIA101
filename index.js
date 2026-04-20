const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Debug logger 
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Root route (IMPORTANT for StackBlitz)
app.get('/', (req, res) => {
  res.send('API is running');
});

// Sample data
let lessons = [
  {
    id: 1,
    subject: "Geometry",
    uploadedby: "Zeirah",
    description: "An introduction to geometric shapes and their properties."
  },
  {
    id: 2,
    subject: "Biology",
    uploadedby: "Liamxian",
    description: "Basic concepts in biology, including the study of cells and organisms."
  },
  {
    id: 3,
    subject: "Calculus",
    uploadedby: "Sunny",
    description: "An overview of calculus concepts like derivatives and integrals."
  }
];

// GET all lessons
app.get('/api/lessons', (req, res) => {
  res.json(lessons);
});

// GET single lesson (optional but useful)
app.get('/api/lessons/:id', (req, res) => {
  const lesson = lessons.find(l => l.id === parseInt(req.params.id));
  if (!lesson) {
    return res.status(404).json({ message: "Lesson not found" });
  }
  res.json(lesson);
});

// POST add lesson
app.post('/api/lessons', (req, res) => {
  const { subject, uploadedby, description } = req.body;

  if (!subject || !uploadedby) {
    return res.status(400).json({
      message: "Subject and uploadedby are required"
    });
  }

  const id = lessons.length > 0 ? lessons[lessons.length - 1].id + 1 : 1;

  const newLesson = {
    id,
    subject,
    uploadedby,
    description: description || ""
  };

  lessons.push(newLesson);

  res.status(201).json({
    message: "Lesson added successfully",
    lesson: newLesson
  });
});

// PUT update lesson description
app.put('/api/lessons/:id', (req, res) => {
  const lesson = lessons.find(l => l.id === parseInt(req.params.id));

  if (!lesson) {
    return res.status(404).json({ message: "Lesson not found" });
  }

  const { subject, uploadedby, description } = req.body;

  if (subject !== undefined) lesson.subject = subject;
  if (uploadedby !== undefined) lesson.uploadedby = uploadedby;
  if (description !== undefined) lesson.description = description;

  res.json({
    message: "Lesson updated successfully",
    lesson
  });
});

// DELETE lesson (extra feature)
app.delete('/api/lessons/:id', (req, res) => {
  const index = lessons.findIndex(l => l.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ message: "Lesson not found" });
  }

  const deleted = lessons.splice(index, 1);

  res.json({
    message: "Lesson deleted successfully",
    lesson: deleted[0]
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});