/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// the basic url without ziocode or apiKey
basicURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
// defining the api key
const apiKey = 'dfbe2f1a6d3fb2a41435b4828f580224';
// selecting generate button with the id #generate to apply the event listener on it
const genButton = document.getElementById('generate');

// applying event listener when clicking generate button
genButton.addEventListener('click', obtainData)

// a function to obtain the data from the weather api
function obtainData() {
    // getting the value of the zipCode when entered by the user in the textarea
    const zipCode = document.getElementById('zip').value;
    // alerting the user when no zipcode entered
    if (zipCode==='') {
      alert('Enter Zipcode first!');
      // adding retrun to get out the function and don't the complete the following steps
      return
    }
    // fetching the data from the external api using the zipcode and the apikey
    fetchData(basicURL, zipCode, apiKey);
}

// async fetchData function that uses fetch to get the data from the external api
const fetchData = async (url, zip, key) => {
  // using await to wait until there is a response from the external api
  const responseData = await fetch(url + zip + '&appid=' + key + '&units=metric');
  // handling the data obtained using try to transform the json data extracted from the API to javascript object
  try {
    const obtainedData = await responseData.json();
    console.log(obtainedData);
    return obtainedData.main.temp
  }
  // and using catch to alert the user that the zipcode is wrong and displaying the error in the console
  catch (err) {
      console.log("ERRRRRor", err)
      alert('Zip Code Entered is not valid!')
  }
}
