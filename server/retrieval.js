module.exports={
    async getAllListings(req,res){
        let db = req.app.get('db')
        let listings = await db.get_all_listings()
        res.status(200).send(listings)
    },
    async getSpecificListing(req,res){
        let id = req.params
        let db = req.app.get('db')
        let listing = await db.get_specific_listing([id.id])
        listing = listing[0]
        res.status(200).send(listing)
    },
    async getQuestions(req,res){
        let id = req.params
        let db = req.app.get('db')
        let questions = await db.get_questions([id.id])
        questions
        res.status(200).send(questions)
    },
    async getMulti(req,res){
        let id = req.body.id
        let db = req.app.get('db')
        let options = await db.get_multi([id])
        let editedOptions = options.map((e)=>{return {...e,value: e.answer,label:e.answer}})
        res.status(200).send(editedOptions)
    },
    async getCompleted(req,res){
        let {id} = req.params
        let db = req.app.get('db')
        let listings = await db.get_completed([id])
        res.status(200).send(listings)
    },
}