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
    const temp = fetchData(basicURL, zipCode, apiKey)
    // sending the data to the Server using .then to extract the temperature value from the promise
    .then((temp)=>{
      postData('/receiveData',newDate, temp, content);
    })
    // retreiving data back from the server
    .then(()=>{
      getData('/localAPI')
    });



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
    return temp
  }
  // and using catch to alert the user that the zipcode is wrong and displaying the error in the console
  catch (err) {
      console.log("ERRRRRor", err)
      alert('Zip Code Entered is not valid!')
  }
}


// Async post to send the data to the server side
// postData function with 4 parameters the url of the post route and the three component of the data object required
const postData = async (url, date, temp, feel)=>{

  await fetch(url, {
    method: 'POST',
    // same-origin to send data within the same port or the same server
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    // stringfying the data to send it as an object to the server side
    body: JSON.stringify({
      date: date,
      temp: temp,
      feelings: feel
    }),
  });
};

// Async get request to get back the data from the server side
const getData = async (url) => {
  //
  const dataRetreived = await fetch(url);
  // transforming the data retreived into json
  const data = await dataRetreived.json();
  console.log(data);
  //Check wether there are older data and remove it if existing to replace it with the new data
  const entry = document.getElementById('entryHolder')
  if (entry != null){
    entry.remove();
  }
  // creating 3 divs for the date, temp, content
  const entryHolderDiv = document.createElement('div');
  const dateDiv = document.createElement('div');
  const tempDiv = document.createElement('div');
  const contentDiv = document.createElement('div');
  // adding id attribute to the elements as required in the rubric
  dateDiv.setAttribute('id', 'date');
  tempDiv.setAttribute('id','temp');
  contentDiv.setAttribute('id', 'content');
  entryHolderDiv.setAttribute('id', 'entryHolder');
  // updating html content
  dateDiv.innerHTML = `<p>The date today is: ${data.date}.</p>`;
  tempDiv.innerHTML = `<p>The temperature today is: ${data.temp} &#8451;.</p>`;
  contentDiv.innerHTML = `<p>Feeling: ${data.feelings}</p>`;
  // appending created elements to the created div with entryHolder id
  entryHolderDiv.appendChild(dateDiv);
  entryHolderDiv.appendChild(tempDiv);
  entryHolderDiv.appendChild(contentDiv);
  const holderDiv = document.querySelector('.entry');
  holderDiv.appendChild(entryHolderDiv)
};
