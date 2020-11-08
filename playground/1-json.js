// We have our data stored as a javascript object and our goal is to convert this data
// into JSON, which is a string and we can save it to the file system (fs). The fs core
// module only knows how to work with string data. So we need to figure out how we can
// take an object represented as a string to save it and then to load that back in and
// get the original object back. The first method we gonna use is JSON.stringify. This
// is a javascript method that takes in an object or an array or any value and it returns
// the JSON string representation. For example, const bookJSON = JSON.stringify(book) let us
// remark that bookJSON is a string, it is NOT and object. If I try to access a property
// like title, bookJSON.title, we will get and undefined ...
// The method JSON.parse() takes in a JSON string and gives us back the javascript object.

const fs = require("fs")

const book = {
    title: "Get programming with Node.js",
    author: "Me, myself and I"
}

const bookJSON = JSON.stringify(book)
console.log(bookJSON)

const parseData = JSON.parse(bookJSON)
console.log(parseData, parseData.author)

// Now using fs (file system) we are going to save our data to a file in the file system ...

fs.writeFileSync('1-json.json', bookJSON)

// Now we are going to read the content of the file 1-json.json, parse it using JSON.parse() 
// method and show the javascript object. What we get with the method fs.readFileSync('1-json.json')
// is a Buffer NOT a string (review the console.log(dataBuffer)). If we want to get a string we 
// have to use the method dataBuffer.toString()

const dataBuffer = fs.readFileSync('1-json.json')
console.log(dataBuffer)
console.log(dataBuffer.toString())

const dataJSON = dataBuffer.toString()
const data = JSON.parse(dataJSON)
console.log(data, data.title)

// Challenge

// Read data into buffer 
const myBufferData = fs.readFileSync('2-json.json')

// Convert buffer into string
const myStringData = myBufferData.toString()

// Parse string into javascript object
const myParseData = JSON.parse(myStringData)

// Change object properties
myParseData.name = "Jordi"
myParseData.age = 47

// Convert updated javascript object into JSON string
const myDataJSON = JSON.stringify(myParseData)

// Write the JSON string into a file 
fs.writeFileSync('2-json-challenge-result.json', myDataJSON)