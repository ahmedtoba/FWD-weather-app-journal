// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setting the Server up on port 8000
const port = 8000;
app.listen(port, ()=>{
  console.log(`Server is running on: http://localhost:${port}`);
})

// get route to send the Internal API data to the client side
app.get('/localAPI', (req, res)=>{
  res.send(projectData)
})

// post request to recieve the data from the client side post body and updating the projectData object with the new data obtained
app.post('/receiveData', (req, res) => {
  // using object spread operator (...) to update the projectData object without modifying the request body
  projectData = {...req.body}
  res.send(projectData)
})
