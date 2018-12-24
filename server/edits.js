module.exports = {
    async editUserInformation(req, res) {
        let { email, name, phoneNumber, address, resume, portfolio, url, companyName, companyAddress, companySummary, companyPhone, logo } = req.body;
        let db = req.app.get('db');
        let userFound = await db.edit_userinformation([name, email, phoneNumber, address, resume, portfolio, url,req.params.id, companyName, companyAddress, companySummary, companyPhone, logo])
        userFound = userFound[0];
        req.session.user = {
            id: userFound.account_id, email: userFound.email, name: userFound.name,
            phoneNumber: userFound.phone_number, address: userFound.address,
            resume: userFound.resume, portfolio: userFound.portfolio, url: userFound.url,
            companyName: userFound.company_name, companySummary: userFound.company_summary,
            companyAddress: userFound.company_address, companyPhone: userFound.company_phone, logo: userFound.logo
        }
        res.status(200).send(req.session.user)
    }
}