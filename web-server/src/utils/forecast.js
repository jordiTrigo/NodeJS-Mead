const request = require('postman-request')

// const forecast = (latitude, longitude, callback) => {
//     //const url = `http://api.weatherstack.com/current?access_key=83c43e0e2c34b6e139a448524c815888&query=${latitude},${longitude}&units=s`
//     const url = `http://api.weatherstack.com/current?access_key=83c43e0e2c34b6e139a448524c815888&query=${latitude},${longitude}`

//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather service!', undefined)
//         } else if (response.body.error) {
//             callback('Unable to find location', undefined)
//         } else {
//             callback(undefined, `It is currently ${response.body.current.temperature} degress out. It feels like there is ${response.body.current.feelslike} degrees out.`)
//         }
//     })
// }

// module.exports = forecast

const forecast = (latitude, longitude, callback) => {
    //const url = `http://api.weatherstack.com/current?access_key=83c43e0e2c34b6e139a448524c815888&query=${latitude},${longitude}&units=s`
    const url = `http://api.weatherstack.com/current?access_key=83c43e0e2c34b6e139a448524c815888&query=${latitude},${longitude}`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, `It is currently ${body.current.temperature} degress out. It feels like there is ${body.current.feelslike} degrees out.`)
        }
    })
}

module.exports = forecast