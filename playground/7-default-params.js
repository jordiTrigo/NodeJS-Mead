const greeter = (name) => {
    console.log('Hello ' + name)
}

greeter('ArJoMi')

// NO name provided, prints Hello undefined ... Better to use default params ...
// If argument name is provided then greeterDefaultParams will print the name, if not
// it will print user ...

const greeterDefaultParams = (name = 'user', age) => {
    console.log(`Hello ${name}`)
}

greeterDefaultParams()