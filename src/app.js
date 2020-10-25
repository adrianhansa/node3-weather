const path = require('path')
const express = require('express')
const hbs = require('hbs')

//Define paths for Express config
const publicDir = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//create an express application
const app = express()

//for templating we can install handlebars: npm i hbs
//to set up handlebar engine and tell express we are going to use it, we write:
app.set('view engine','hbs');

//Setting up views and partials location
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDir))

// const aboutPage = path.join(__dirname,'../public/about.html')
// const helpPage = path.join(__dirname,'../public/help.html')

// app.use('/help',express.static(helpPage))
// app.use('/about', express.static(aboutPage))

app.get('',(req,res)=>{
    res.render('index',{title:'Weather',name:'Adrian'})
})

app.get('/about',(req,res)=>{
    res.render('about',{title:'About Us',content:'This is the content of the About Page',name:'Adrian'})
})

app.get('/help',(req,res)=>{
    res.render('help',{title:'Help Page',content:'This is the HELP PAGE',name:'Adrian'})
})

app.get('/help/*',(req,res)=>{
    res.render('404',{errorMessage:'This help page does not exist'})
    //It will serve a 404 page for any url whuch includes /help/ that is not defined otherwise
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({error:'You must provide an address'})
    }
    res.send({location:'Liverpool',forecast:'It is raining',address:req.query.address})
})

app.get('/products',(req,res)=>{
    console.log(req.query)
    if(!req.query.search){
        return res.send({error:'You must provide a search term'})
    }
    res.send({products:[]})
})

//Serving a 404 page; it will be a match for any other route not defined above
app.get('*',(req,res)=>{
    res.render('404',{errorMessage:'This page does not exist'})
})

//this starts up the server and it listens to a specific port
app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})

//Test