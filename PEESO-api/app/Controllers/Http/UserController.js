'use strict'
const { HttpException } = use("node-exceptions");
const Env = use('env');
const Hash = use("Hash");
const User = use('App/Models/User')
const Profile = use('App/Models/Profile')
const Applicant = use('App/Models/Applicant')
const Verification = use('App/Models/Verification')
let CodeGenerator = require('node-code-generator')

let generator = new CodeGenerator()
let pattern = '*********'
let options = {
    alphanumericChars:
        '123456789abcdefghijklmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
}
class UserController {
    async authenticate({ auth, request, response }) {
        var { } = request.all();

        try {

        } catch (e) {
            throw new HttpException(e.message, e.code)
        }
    }

    async createUser({ request, response }) {
        let { username, email, password, type } = request.all()
        try {
            var b = new User()
            b.username = username
            b.email = email
            b.password = password
            b.type = type == 'google' ? 'google' : 'normal'

            let expiryDate = new Date(now())
            expiryDate.setHours(expiryDate.getHours() + 5);
            b.expiry = expiryDate
            b.is_verified = false;
            b.status = 'unverified'
            await b.save()
            var c = new Verification()
            c.user_id = b.id
            c.otp_code = await generator.generateCodes(pattern, 1, options)
            c.expiry = expiryDate.setHours(expiryDate.getMinutes() + 10);
            await c.save()

            response.send({ user: b })

        } catch (e) {
            throw new HttpException(e.message, e.code)
        }

    }

    async sendNewToken({ request, response }) {
        try {

        } catch (e) {
            throw new HttpException(e.message, e.code)
        }
    }

    async verifyToken({ request, response }) {
        try {

        } catch (e) {
            throw new HttpException(e.message, e.code)
        }
    }

    async createApplicant({ request, response }) {
        let { username,
            email,
            password,
            opening_statement,
            first_name,
            middle_name,
            last_name,
            address,
            contact_no,
            expected_salary } = request.all()

        let query = await User.query().where("email", email).where("username", username)
        if (!query) {
            try {
                let b = new User;
                let c = new Profile;
                let d = new Applicant;

                b.username = username
                b.email = email
                b.password = password

                c.first_name = first_name
                c.middle_name = middle_name
                c.last_name = last_name

                d.first_name = first_name
                d.middle_name = middle_name
                d.last_name = last_name
                d.opening_statement = opening_statement
                d.address = address
                d.contact_no = contact_no
                d.email = email
                d.expected_salary = expected_salary

                await b.save()
                c.user_id = b.id;
                await c.save()
                d.
            } catch (e) {
                throw new HttpException(e.message, e.code)
            }
        } else {
            let data = {
                message: "User already exists."
            }
            throw new HttpException(data, HttpResponse.STATUS_BAD_REQUEST)
        }
    }
}

module.exports = UserController
