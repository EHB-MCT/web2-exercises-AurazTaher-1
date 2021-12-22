class Database{
    constructor (mongoclient,database,collection,url){
        this.mongoclient = mongoclient
        this.url = url
        this.database = database
        this.collection = collection
    }

    async createConnection(){
        const client = await this.mongoclient.connect(this.url, { 
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });
        return client;
    }

    async getAllVenues(){
        let client = await this.createConnection()
        const db = client.db(this.database).collection(this.collection)
        const venues = await db.find({}).toArray()
        client.close()
        return venues
    }

    async getVenue(id){
        let client = await this.createConnection()
        const db = client.db(this.database).collection(this.collection)
        const venue = await db.find({_id: id})
        client.close()
        return venue
    }

    async insertVenue(venue){
        let client = await this.createConnection()
        const db = client.db(this.database).collection(this.collection)
        const addedVenue = await db.insertOne(venue)
        client.close()
        return addedVenue
    }

    async updateVenue(id, newVenue){
        let client = await this.createConnection()
        const db = client.db(this.database).collection(this.collection)
        let updatedVenue = await db.updateOne({_id: id},{$set: newVenue})
        client.close()
        return updatedVenue
    }

    async deleteVenue(id){
        let client = await this.createConnection()
        const db = client.db(this.database).collection(this.collection)
        let deletedVenue = await db.deleteOne({_id: id})
        client.close()
        return deletedVenue
    }
}

export
{
    Database
}