module.exports={
    async getAllListings(req,res){
        let db = req.app.get('db')
        let listings = await db.get_all_listings()
        res.status(200).send(listings)
    },
    async getAccountDetails(req,res){
        let {id} = req.body
        let db = req.app.get('db')
        let account = await db.get_account_details([id])
        res.status(200).send(account[0])
    },
    async getSpecificListing(req,res){
        let {id} = req.params
        let db = req.app.get('db')
        let listing = await db.get_specific_listing([id])
        listing = listing[0]
        res.status(200).send(listing)
    },
    async getCompanyListings(req,res){
        let {id} = req.params
        let db = req.app.get('db')
        let listing = await db.get_company_listings([id])
        listing = listing
        res.status(200).send(listing)
    },
    async getQuestions(req,res){
        let {id} = req.params
        let db = req.app.get('db')
        let questions = await db.get_questions([id])
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
    async getSpecificCompleted(req,res){
        let {id} = req.params
        let db = req.app.get('db')
        let listing = await db.get_specific_completed([id])
        listing = listing[0]
        res.status(200).send(listing)
    },
    async getCompanyCompleted(req,res){
        let {id} = req.params
        let db = req.app.get('db')
        let listing = await db.get_company_completed([id])
        res.status(200).send(listing)
    },
    async getAnswered(req,res){
        let {completed_id,question_id} = req.params
        let db = req.app.get('db')
        let answer = await db.get_answered([completed_id,question_id])
        answer = answer[0]
        res.status(200).send(answer)
    },
    async calculatePoints(req,res){
        let {id} = req.params
        let db = req.app.get('db')
        let list = await db.calculate_points([id])
        res.status(200).send(list)
    },
}