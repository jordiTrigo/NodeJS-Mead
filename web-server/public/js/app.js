/* We are going to use fetch API and the script is running in the client side javascript.
   fetch() is a function and the argument is a string with the url we want to fetch.
   Calling fetch() in our client side javascript is going to kick off an asynchronous IO
   operation much like calling a request in node.js did. That means we don't have access 
   to the data right away. Instead we provide a function and that function will run at 
   some point in the future when the data is available. We use the then method on the return
   value from fetch() and we provide to it the callback function we want to run and we get
   access to the response as the first and only argument up above. Then inside of here 
   we can use the response to do whatever we want to do like extract the data and render it
   to the browser or just dump it to the console. Example:

   fetch('http://puzzle.mead.io/puzzle').then((response) => {

   })

   we fetch data from the URL: http://puzzle.mead.io/puzzle and then run this function: (response) => {}
   And also then is part of a much bigger API known as promises and its companion async/await

    */

console.log('Client side javascript file is loaded!')

// fetch('http://puzzle.mead.io/puzzle').then((response) => {
//     response.json().then((data) => {
//         console.log(data)
//     })
// })

// fetch('http://localhost:3000/weather?address=caldes%20de%20malavella').then((response) => {
//     response.json().then((data) => {
//         if (data.error) {
//            console.log(data.error)
//         } else {
//             console.log(data.location)
//             console.log(data.forecast)
//         }        
//     })
// })

/* Now regarding to the code of index.hbs we need to select the element from our html document
   that we're trying to work with and we do this using document.querySelector(). Now we are trying
   to select our form located in index.hbs. So document.querySelector('form') returns a javascript
   representation of the form element and we can use it to manipulate the element or to do things
   when a user interacts with the element. */

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

/* If we want select some element by his class we need to do: document.querySelector('.classname) */
/* If we want select some element by his id we need to do: document.querySelector('#idname) */

const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

/* We need to add an event listener onto our element every time we submit the form */

weatherForm.addEventListener('submit', (e) => {
    // The function preventDefault() is going to prevent that default behaviour which is to
    // refresh the browser allowing the server to render a new page and instead it's going 
    // to do nothing, it's going to allow us to do whatever we want by letting the function run.
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    
    fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {        
        response.json().then((data) => {
            if (data.error) {
                //console.log(data.error)
                messageOne.textContent = data.error                
            } else {
                // console.log(data.location)
                // console.log(data.forecast)
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }        
        })
    })
})

