const bcrypt = require('bcryptjs')
module.exports = {
    reset: async (req, res) => {
        let db = req.app.get('db');
        req.session.destroy();
        await db.TABLE_SEED();
        res.sendStatus(200);
    },
    logout: async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    login: async (req, res) => {
        let { email, password } = req.body;
        let db = req.app.get('db')
        let userFound = await db.user_check([email])
        if (!userFound[0]) {
            return res.status(200).send('User not found')
        }
        let result = bcrypt.compareSync(password, userFound[0].hash_value)
        userFound = userFound[0];
        if (result) {
            req.session.user = {
                id: userFound.account_id, email: userFound.email, name: userFound.name,
                phoneNumber: userFound.phone_number, address: userFound.address,
                resume: userFound.resume, portfolio: userFound.portfolio, url: userFound.url,
                companyName: userFound.company_name, companySummary: userFound.company_summary,
                companyAddress: userFound.company_address, companyPhone: userFound.company_phone, logo: userFound.logo
            }
            res.status(200).send(req.session.user)
        } else {
            return res.status(401).send('Incorrect Password')
        }
    },
    signUp: async (req, res) => {
        let { email, password, name, phone, address, resume, portfolio, url, companyName, companyAddress, summary, companyPhone, companyUrl } = req.body;
        let db = req.app.get('db')
        let foundUser = await db.user_check([email])
        if (foundUser[0]) {
            return res.status(200).send('Email already in use.')
        }
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let company_id = await db.create_company([companyName])
        await db.create_account([email, hash, name, phone, address, resume, portfolio, url, company_id[0].company_id, companyAddress, summary, companyPhone, companyUrl])
        let userFound = await db.user_check([email])
        userFound = userFound[0];
        req.session.user = {
            id: userFound.account_id, email: userFound.email, name: userFound.name,
            phoneNumber: userFound.phone_number, address: userFound.address,
            resume: userFound.resume, portfolio: userFound.portfolio, url: userFound.url,
            companyName: userFound.company_name, companySummary: userFound.company_summary,
            companyAddress: userFound.company_address, companyPhone: userFound.company_phone, logo: userFound.logo
        }
        res.status(200).send(req.session.user)
    },
    userData: (req, res) => {
        if (req.session.user) {
            res.status(200).send(res.data)
        } else {
            res.status(401).send('Please log in')
        }
    },
    devLogin: (req, res) => {
        if (req.session.user) {
            let userFound = req.session.user
           let package = {
                id: userFound.account_id, email: userFound.email, name: userFound.name,
                phoneNumber: userFound.phone_number, address: userFound.address,
                resume: userFound.resume, portfolio: userFound.portfolio, url: userFound.url,
                companyName: userFound.company_name, companySummary: userFound.company_summary,
                companyAddress: userFound.company_address, companyPhone: userFound.company_phone, logo: userFound.logo
            }
            res.status(200).send(package)
        } else {
            res.status(401).send('Please log in to view account info')
        }
    }
}