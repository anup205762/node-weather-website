const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils.js/geocode')
const foreCast = require('./utils.js/forecast')
//console.log(path.join(__dirname,'../public'))
//console.log(__dirname)
//console.log(__filename)

const app = express()
const port = process.env.PORT || 3000 

const publicDirectory = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const patialPath = path.join(__dirname,'../templates/partials/header')

app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartial('headPartial',patialPath)

app.use(express.static(publicDirectory))

app.get('', (req, res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Anup'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Anup'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About',
        name: 'Anup'
    })
})

app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
           error:'You must provide a address term'
       })
   }
   geoCode(req.query.address,(error,{latitude,longitude,location}={} ) => {
    if(error){
        return res.send({
            error:error
        })
    }
    foreCast(latitude,longitude,(error,foreCast) => {
        if(error){
            return res.send({
                error:error
            })
        }
        return res.send({
            foreCast,
            location:req.query.address 
        })    
     })
  })
})

app.get('/products',(req, res) => {
    if(!req.query.search){
         return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('*',(req, res) => {
    res.send('404 error')
})



app.listen(port,() => {
    console.log('Server is up on port 3000')
})