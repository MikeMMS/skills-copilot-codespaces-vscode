// Create web server

const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create a new express app
const app = express();
// Add the body parser middleware
app.use(bodyParser.json());
// Add the cors middleware
app.use(cors());

// Create an empty object to store the comments
const commentsByPostId = {};

// Create a route to get comments for a post
app.get('/posts/:id/comments', (req, res) => {
  // Send back the comments for the post
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a route to create a new comment
app.post('/posts/:id/comments', (req, res) => {
  // Create an id for the comment
  const commentId = randomBytes(4).toString('hex');
  // Get the content from the request body
  const { content } = req.body;
  // Get the comments for the post
  const comments = commentsByPostId[req.params.id] || [];
  // Add the new comment to the comments array
  comments.push({ id: commentId, content });
  // Store the comments for the post
  commentsByPostId[req.params.id] = comments;
  // Send back the created comment
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});