const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Sample data for lessons (including description)
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

// Route to get all lessons
app.get('/api/lessons', (req, res) => {
  res.json(lessons);
});

// Route to add a lesson with description
app.post('/api/lessons', (req, res) => {
  const { subject, uploadedby, description } = req.body;

  // Validate that subject and uploadedby are provided
  if (!subject || !uploadedby) {
    return res.status(400).json({ message: "Subject and uploadedBy are required" });
  }

  // Assign a unique ID and create a new lesson with description
  const id = lessons.length + 1;
  const newLesson = { id, subject, uploadedby, description };

  // Add the new lesson to the lessons array
  lessons.push(newLesson);

  // Send response with status code 201 (Created)
  res.status(201).json({
    message: "Lesson added successfully",
    lesson: newLesson
  });
});

// Route to update a lesson's description (for example, if an admin or teacher wants to update it)
app.put('/api/lessons/:id', (req, res) => {
  const { id } = req.params;
  const { description } = req.body;

  // Find the lesson by ID
  const lesson = lessons.find(l => l.id === parseInt(id));
  
  if (!lesson) {
    return res.status(404).json({ message: "Lesson not found" });
  }

  // Update the lesson's description
  lesson.description = description;

  // Return the updated lesson
  res.json({
    message: "Lesson updated successfully",
    lesson
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});