import express, { json } from 'express';
import { read } from './jsonFileStorage.js';

const app = express();

app.get('/sightings/:index/', (request, response) => {
    read('data.json', (err, data) => {
        // Respond with the name at the index specified in the URL
      const indexRequested = request.params.index
      const sighting = data.sightings[indexRequested]

      //run a loop to access all keys in the object 

      const keys = Object.keys(sighting)
      console.log(keys)

      const newData = keys.map(element => `${element}: ${sighting[element]}`)
      const updatedData = newData.join("<br>")

      console.log(updatedData)

      // display key-value pair

      const content = `
        <html>
          <body>
            <h1>hello</h1>
            <div> ${updatedData} </div>
          </body>
        </html>
      `;
      
      response.send(content);
      }
    );
  }
)

app.listen(3004);


//http://localhost:3004/year-sightings/1989

app.get('/year-sightings/:year/', (request, response) => {
    read('data.json', (err, data) => {
      //run a loop inside sightings object, check indexes that contain year 
      const sightingsArr = data.sightings
      const yearRequested = request.params.year
      console.log(yearRequested)


      const arrOfSighting = []
      for (let i =0; i<sightingsArr.length;i+=1){
        if (sightingsArr[i].YEAR === yearRequested){
          arrOfSighting.push(`Year: ${yearRequested}: State: ${(sightingsArr[i].STATE)}`)
        }
      }
      console.log(arrOfSighting)
      //if year includes X-year, then extract that particular value of year and get that particular index
      response.send(arrOfSighting);
      }
    );
  }
)

app.listen(3005);