import express from 'express'
import mongodb, { ObjectId } from 'mongodb'
import bodyParser from 'body-parser'
import cors from 'cors'
import { Database } from './database.js'

const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.json())
app.use(cors())
const url = "mongodb+srv://Auraz:Auraz123@devwerkstuk.pdrqk.mongodb.net/Web2Eindwerk?retryWrites=true&w=majority"
const db = new Database(mongodb.MongoClient,"Web2Eindwerk","Venues",url)


app.listen(port,()=>{
    console.log(`backend listening on port ${port}`)
})

app.get("/api/venues", async (req,res)=>{
    let venues = await db.getAllVenues()
    res.send(venues)
})

app.get("/api/venues/:id", async (req,res)=>{
    let id = new ObjectId(`${req.params.id}`)
    let venue = await db.getVenue(id)
    res.send(venue)
})

app.post("/api/venues",async (req,res)=>{
    let venue = req.body
    
    let insertedVenue = await db.insertVenue(venue)
    res.send(insertedVenue)
})

app.put("/api/venues/:id", async (req,res)=>{
    let id = new ObjectId(`${req.params.id}`)
    let venue = req.body
    let updatedVenue = await db.updateVenue(id,venue)
    res.send(updatedVenue)
})

app.delete("/api/venues/:id", async (req,res)=>{
    let id = new ObjectId(`${req.params.id}`)
    let result = await db.deleteVenue(id)
    res.send(result)
})