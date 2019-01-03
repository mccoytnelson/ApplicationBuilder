module.exports={
    deleteListing(req,res){
        let db = req.app.get('db')
        let {id} = req.params
        db.delete_listing([id])
        res.sendStatus(200)
    },
    deleteApplication(req,res){
        let db = req.app.get('db')
        let {id} = req.params
        db.delete_application([id])
        res.sendStatus(200)
    }
}