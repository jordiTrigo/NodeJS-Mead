// Install: $ npm i express
// Directory structure for scale and be organized => web-server/src
// For this example supose that we own the domain app.com. If someone visits app.com
// we want to show them something maybe the home page for our company web site. But 
// we will have other pages like app.com/help or app.com/about. So we have multiple routes:
//
// app.com
// app.com/help
// app.com/about
// 
// So how we can set up our server to send a response when someone tries to get
// something at a specific route => we use app.get()
// We use listen to start the server and we use a specific port. Once started, it's never
// gonna stop unless we stop it because its job is to stay up and running. Listening 
// and processing new incoming requests.
//
// We are gonna use de module path in order to show node where our public directory
// lives. In fact we will use: path.join([...paths]).
// More info about path: https://nodejs.org/dist/latest-v15.x/docs/api/path.html

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const hbs = require('hbs')
const path = require('path')
const express = require('express')
const app = express()

const port = process.env.PORT || 3000

// Info: https://expressjs.com/en/4x/api.html#app.set

// Define paths for Express config

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

// The only directory set up to be exposed by the web server is ../public 
const publicDirectoryPath = path.join(__dirname, '../public')    
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine, views location and partials location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'JoArMi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'ArJoMi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'ArJoMi',
        helpText: 'Help us Obi-Wan!'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    // res.send({
    //     address: `Your address is ${req.query.address}.`,
    //     forecast: 'It\'s 9 degrees.',
    //     location: 'Caldes'
    // })

    // Fent { latitude, longitude, location } estem fent destructuring de l'objecte i, a més
    // { latitude, longitude, location } = {} amb aquesta igualtat estem posant un valor per
    // defecte (default params) en el paràmetre de la funció ...

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address                
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'ArJoMi',
        errorMessage: 'Help article not found.'
    })
})

// Express provides us with the wild car character * that we can use in our URLs 
// and right here this means MATCH ANYTHING THAT HASN'T BEEN MATCHED SO FAR!!!
// Hem de posar això sempre AL FINAL pq express fa una cerca des de 
// app.use(express.static(publicDirectoryPath)) cap avall, app.get('', (req, res)
// després app.get('/about', ... fins al final 

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'ArJoMi',
        errorMessage: 'Page not found.'
    })
})

// We have to change this lines, because we are using Heroku and Heroku will provide us
// with a port value that we have to use when our app is running on Heroku. This isn't
// a static value we can hard code in the project, this is a value that changes over time
// and it's provided to our app via an environment variable. An environment variable is
// a key/value pair set at the OS level).
// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })
// Hem de definir una nova constant port just A SOTA DE LA CREACIÓ DE l'app express i
// és la que usarem aquí. Notem que process.env.PORT tindrà un valor que serà injectat
// per Heroku...

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})