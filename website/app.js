/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
// the d.getMonth starts from 0 so we added 1 to correct the month
let newDate = d.getMonth()+1+'.'+ d.getDate()+'.'+ d.getFullYear();

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
    // getting the value of the feelings when entered by the user in the textarea
    const content = document.getElementById('feelings').value;
    // alerting the user when no zipcode entered
    if (zipCode==='') {
      alert('Enter Zipcode first!');
      // adding retrun to get out the function and don't the complete the following steps
      return
    }
    // fetching the data from the external api using the zipcode and the apikey
    const temperature = fetchData(basicURL, zipCode, apiKey);
    console.log(temperature)
    // sending the data to the Server
    postData('/receiveData',newDate, temperature, content)
}

// async fetchData function that uses fetch to get the data from the external api
const fetchData = async (url, zip, key) => {
  // using await to wait until there is a response from the external api
  const responseData = await fetch(url + zip + '&appid=' + key + '&units=metric');
  // handling the data obtained using try to transform the json data extracted from the API to javascript object
  try {
    const obtainedData = await responseData.json();
    const temp = obtainedData.main.temp;
    // return only the required temp data
    return(double(temp))
  }
  // and using catch to alert the user that the zipcode is wrong and displaying the error in the console
  catch (err) {
      console.log("ERRRRRor", err)
      alert('Zip Code Entered is not valid!')
  }
}


// Async post to send the data to the server side
// postData function with two parameters the url of the post route and the data object
const postData = async (url, date, temp, feel)=>{

  await fetch(url, {
    method: 'POST',
    // same-origin to send data within the same port or the same server
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      date: date,
      temp: temp,
      feelings: feel
    }),
  });
};
