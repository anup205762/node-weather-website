const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'https://api.darksky.net/forecast/2ad29f5e91220ceffe0696ef941e8ab7/'+latitude+","+longitude
    request({url,json: true},(error,{body}) => {
        if(error){
            console.log("Unable to connect to api !!!!!")
            callback("Unable to connect to api !!!!!",undefined)
        }else if(body.error){
            console.log(body.error)
            callback(body.error,undefined)
        }else{
            console.log(body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degresss. There is a '+body.currently.precipProbability+'% chance of rain')
            const summary = body.daily.data[0].summary+' It is currently '+body.currently.temperature+' degresss. There is a '+body.currently.precipProbability+'% chance of rain'
            callback(undefined,{
                summary: summary,
                temperature: body.currently.temperature,
                precipProbability: body.currently.precipProbability
            })
        }
    })
}

module.exports = forecast