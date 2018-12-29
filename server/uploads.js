module.exports={
    async uploadListing(req,res){
        let db = req.app.get('db')
        let {id,companyName,companySummary,companyPhone,companyAddress,position,location,salary,description} = req.body
        let listing = await db.upload_listing([id,companyName,companySummary,companyAddress,companyPhone,position,location,salary,description])
        res.status(200).send({listingID: listing[0].listing_id})
    },
    async uploadQuestion(req,res){
        let db = req.app.get('db')
        let {daisyChain, question, checked, points} = req.body
        let data = await db.upload_question([daisyChain, question, checked, points])
        res.status(200).send({questionID: data[0].question_id})
    },
     async uploadMulti(req,res){
        let db = req.app.get('db')
        let {poppyChain,answer,points} = req.body
        await db.upload_multi([poppyChain,answer,points])
        res.sendStatus(200)
    },
    async uploadApplication(req,res){
        let db = req.app.get('db')
        let {listingID,accountID} = req.body
        let id = await db.upload_application([listingID,accountID])
        res.status(200).send(id)
    },
    async uploadAnsweredQuestion(req,res){
        let db = req.app.get('db')
        let {completedID,questionID,answer,points} = req.body
        await db.upload_answered_question([completedID,questionID,answer,points])
        res.sendStatus(200)
    }
}