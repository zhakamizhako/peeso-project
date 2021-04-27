'use strict'
const Company = use('App/Models/Company')
const User = use('App/Models/User')
const HttpResponse = use('App/Controllers/Http/HttpResponse')
const { HttpException } = use("node-exceptions");
class CompanyController {
    async getCompanies({ response }) {
        try {
            let jobs = (await Company.query().orderBy('updated_at', 'DESC').with('ratings.user.profile').fetch()).toJSON()
            response.send({ data: jobs })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async getCompany({ params, response }) {
        let { id } = params
        try {
            let cdata = await Company.query().where('id', id).with('ratings').fetch()
            response.send({ data: (await cdata.toJSON())[0] })

        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async updateCompany({ request, auth, response }) {
        try {
            let {
                company_id,
                description,
                shortdesc,
                name,
                address,
                contact_no,
                email,
                vision,
                mission,
                development_thrusts,
                type,
                employees_min,
                employees_max,
                lat,
                lng,
                salary,
            } = request.all()
            let { id } = auth.user
            let company = null
            if (!company_id) {
                let x = await User.find(id)
                company = await x.company().fetch()
            } else {
                company = await Company.find(company_id)
            }

            if (!company) {
                throw new HttpException("Invalid request", 401);
            }

            company.company_id = company_id
            company.description = description
            company.shortdesc = shortdesc
            company.name = name
            company.address = address
            company.contact_no = contact_no
            company.email = email
            company.vision = vision
            company.mission = mission
            company.development_thrusts = development_thrusts
            company.type = type
            company.employees_min = employees_min
            company.employees_max = employees_max
            company.lat = lat
            company.lng = lng
            company.salary = salary

            await company.save();

            response.send({ data: company })

        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }
}

module.exports = CompanyController
