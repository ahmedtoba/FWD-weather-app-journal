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
app.get('/sendData', (req, res)=>{
  res.send(projectData)
})

//post route to receive the data obtaidned from the external API from the client side and push it to the projectData object




// post route to recieve the data returned from the weather API
