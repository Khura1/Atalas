import cors from 'cors'
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'

import fs from 'fs'
import { stringify } from 'querystring'
import { Gpio } from 'onoff'

const currentFolder = path.dirname(fileURLToPath(import.meta.url))
const messagesFile = path.join(currentFolder, 'messages.jsonl')
let toggle1 = new Boolean(false)
const led = new Gpio(27, 'out')

let messages = [];
if (fs.existsSync(messagesFile)) {                  // If the file exists...
  messages = fs.readFileSync(messagesFile, 'utf8')  // Read the whole file as text
               .split('\n')                         // Split at new-lines into an array
               .filter(line => line.length > 0)     // Exclude empty lines (i.e. last)
               .map(line => JSON.parse(line))       // Map to an object after parsing JSON
}

const app = express()

// const bodyParser = require('body-parser');
// app.use(bodyParser.json());

app.use(cors({origin: 'http://localhost:1234'}))

app.use(express.json())

app.use('/', express.static(path.join(currentFolder, 'public')))

app.post('/led/(:toggle)', (req, res) => {
  
  console.log(req.params.toggle);

  if ( req.params.toggle == 'on' ) {
    toggle1 = true;
    console.log('true');
  } 
  else { 
    toggle1 = false;
    console.log('False');
  }

  if ( toggle1 ) { 
    led.writeSync(1); // turn on
    console.log('Turn on');
  } else {
    led.writeSync(0); // turn off
    console.log('Turn off');
  }

  res.json()
})

// Add a message
app.post('/bulletin', (req, res) => {
  let id = 0;
  if (messages.length == 0) {
    id = 1;
  } else {
    id = messages[messages.length - 1].id + 1;
  }
  console.log(req.body)
  const message = {
      id: id,
      time: new Date(), // the current date/time
      content: req.body.label,
  }
  console.log(JSON.stringify(message))  // write the object out to the server's console
  fs.appendFileSync(messagesFile, JSON.stringify(message) + '\n')
  messages.push(message)
  res.json(message)                     // respond with the message (including the time given)
})

// Add a message
app.post('/bulletin1/(:label)', (req, res) => {
  let id = 0;
  if (messages.length == 0) {
    id = 1;
  } else {
    id = messages[messages.length - 1].id + 1;
  }
  console.log(req.params.label)
  const message = {
      id: id,
      time: new Date(), // the current date/time
      content: req.params.label,
  }
  console.log(JSON.stringify(message))  // write the object out to the server's console
  fs.appendFileSync(messagesFile, JSON.stringify(message) + '\n')
  messages.push(message)
  res.json(message)                     // respond with the message (including the time given)
})

app.get('/bulletin', (req, res) => {
  res.json(messages)
})

//Delete the specified item from the lisst
app.delete('/bulletin/(:id)', (req, res) => {

  // GET RECORD BY ID
  let index = messages.findIndex(item => item.id == req.params.id);

  if ( index > -1 ) {
    // DELETE RECORD BY ID
    messages.splice(index, 1);
   
    // OVERWRITE FILE
    fs.unlinkSync(messagesFile);
    messages.forEach(message => {
      fs.appendFileSync(messagesFile, JSON.stringify(message) + '\n')
    });
    res.json()  // No response data needed
  }
})

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000')
})