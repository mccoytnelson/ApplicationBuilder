module.exports={
    async uploadListing(req,res){
        let db = req.app.get('db')
        let {id,companyName,companySummary,companyPhone,companyAddress,position,location,salary,description} = req.body
        let listing = await db.upload_listing([id,companyName,companySummary,companyAddress,companyPhone,position,location,salary,description])
        res.status(200).send({listingID: listing[0].listing_id})
    }
}