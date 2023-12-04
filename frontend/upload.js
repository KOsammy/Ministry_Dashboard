const express = require('express');
const multer = require('multer');
const mysql = require('mysql');

// Create an Express app
const app = express();

// Set up multer middleware for file uploads
const upload = multer({
  dest: 'uploads/'
});

// Define the route for handling file uploads
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const imageFileType = req.file.mimetype.split('/')[1];
  const allowedFormats = ['jpg', 'jpeg', 'png', 'gif'];

  if (!allowedFormats.includes(imageFileType)) {
    return res.status(400).send('Only JPG, JPEG, PNG, and GIF files are allowed.');
  }

  const name = req.body.name;
  const email = req.body.email;

  // Connect to the MySQL database
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'SAmmy@,123',
    database: 'mydatabase',
    port: 3006
  });

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return res.status(500).send('Database error.');
    }

    // Insert the user data into the database
    const sql = `INSERT INTO users (name, email) VALUES ('${name}', '${email}')`;

    connection.query(sql, (err, result) => {
      if (err) {
        console.error('Error inserting user data:', err);
        return res.status(500).send('Database error.');
      }

      // Save the uploaded file with a unique name
      const fileName = `${Date.now()}.${imageFileType}`;
      req.file.mv(`uploads/${fileName}`, (err) => {
        if (err) {
          console.error('Error saving uploaded file:', err);
          return res.status(500).send('File upload failed.');
        }

        // Send a successful response
        res.status(200).send({
          message: 'File uploaded successfully.',
          fileName
        });
      });
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
