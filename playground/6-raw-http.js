const http = require('http')

const url = `http://api.weatherstack.com/current?access_key=83c43e0e2c34b6e139a448524c815888&query=45,-75`

const request = http.request(url, (response) => {
    let data = ''
    
    response.on('data', (chunk) => {
        data = data + chunk.toString()        
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.end()