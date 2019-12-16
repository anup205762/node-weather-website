const request = require('request')

const getGeoLocation = (address,callback) => {
    let url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW51cDIwNTc2MiIsImEiOiJjazQweTdiZ2swNnJ0M2Vxa281b3psdzBjIn0.P3YKoQOL6md6xwjjv9Hd2A&limit=1'
    request({url,json: true},(error,{body}) => {
        console.log(url)
        console.log(body)
        console.log(error)
        if(error){
            console.log("Unable to connect to api !!!!!")
            callback("Unable to connect to api !!!!!",undefined)
        }else if(body.features.length === 0){
            console.log("Invalid location")
            callback("Invalid location",undefined)
        }else{
            console.log(body.features[0].center[0],body.features[0].center[1])
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = getGeoLocation