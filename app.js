const http = require('http');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set the response HTTP header with status code and content type
  res.writeHead(200, {'Content-Type': 'text/plain'});
  
  // Send the response body "Hello, World!"
  res.end('Hello, World!\n');
});

// Define the port number to listen on
const port = 80;

// Start the server and listen on the specified port
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});