module.exports = {
    //all listings
    async alphabatize(req, res) {
        let db = req.app.get('db')
        let listings = await db.alphabatize()
        res.status(200).send(listings)
    },
    async dealphabatize(req, res) {
        let db = req.app.get('db')
        let listings = await db.dealphabatize()
        res.status(200).send(listings)
    },
    async customSearch(req, res) {
        try {
            let { search } = req.body
            let db = req.app.get('db')
            console.log(search)
            let listings = await db.custom_search([search])
            res.status(200).send(listings)
        }
        catch (err) {
            console.log(err)
        }
    },
    async oldest(req, res) {
        let db = req.app.get('db')
        let listings = await db.oldest()
        res.status(200).send(listings)
    },
    async newest(req, res) {
        let db = req.app.get('db')
        let listings = await db.newest()
        res.status(200).send(listings)
    },
    //user apps
    async userAlphabatize(req, res) {
        let { id } = req.params
        let db = req.app.get('db')
        let listings = await db.alphabatize_user([id])
        res.status(200).send(listings)
    },

    async userDeAlphabatize(req, res) {
        try {
            let { id } = req.params
            let db = req.app.get('db')
            let listings = await db.user_dealphabatize([id])
            res.status(200).send(listings)
        }
        catch (err) { console.log(err) }
    },
    async userCustomSearch(req, res) {
        try {
            let { id } = req.params
            let { search } = req.body
            let db = req.app.get('db')
            console.log(search)
            let listings = await db.user_custom_search([search,id])
            res.status(200).send(listings)
        }
        catch (err) {
            console.log(err)
        }
    },
    async userOldest(req, res) {
        let { id } = req.params
        let db = req.app.get('db')
        let listings = await db.user_oldest([id])
        res.status(200).send(listings)
    },
    async userNewest(req, res) {
        let { id } = req.params
        let db = req.app.get('db')
        let listings = await db.user_newest([id])
        res.status(200).send(listings)
    },
    //company listings
    async userAlphabatize(req, res) {
        let { id } = req.params
        let db = req.app.get('db')
        let listings = await db.alphabatize_user([id])
        res.status(200).send(listings)
    },

    async userDeAlphabatize(req, res) {
        try {
            let { id } = req.params
            let db = req.app.get('db')
            let listings = await db.user_dealphabatize([id])
            res.status(200).send(listings)
        }
        catch (err) { console.log(err) }
    },
    async userCustomSearch(req, res) {
        try {
            let { id } = req.params
            let { search } = req.body
            let db = req.app.get('db')
            console.log(search)
            let listings = await db.user_custom_search([search,id])
            res.status(200).send(listings)
        }
        catch (err) {
            console.log(err)
        }
    },
    async userOldest(req, res) {
        let { id } = req.params
        let db = req.app.get('db')
        let listings = await db.user_oldest([id])
        res.status(200).send(listings)
    },
    async userNewest(req, res) {
        let { id } = req.params
        let db = req.app.get('db')
        let listings = await db.user_newest([id])
        res.status(200).send(listings)
    },
}