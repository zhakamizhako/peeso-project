'use strict'
const { HttpException } = use("node-exceptions");
// const Env = use('env');
const Hash = use("Hash");
const User = use('App/Models/User')
const Profile = use('App/Models/Profile')
const Applicant = use('App/Models/Applicant')
const Verification = use('App/Models/Verification')
const KeySkill = use('App/Models/KeySkill')
const ApplicantSkill = use('App/Models/ApplicantKeySkill')
const EducationalBackground = use('App/Models/EducationalBackground')
const JobExperience = use('App/Models/ApplicantJobExperience')
const HttpResponse = use('App/Controllers/Http/HttpResponse')

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
            throw new HttpException(e.message, e.status)
        }
    }

    async createUser({ request, response }) {
        let { username, email, password, type } = request.all()
        console.log('a')
        if (email == null) {
            throw new HttpException('email required.', HttpResponse.STATUS_BAD_REQUEST)
        }
        try {
            var b = new User()
            b.username = username
            b.email = email
            b.password = password
            b.type = type == 'google' ? 'google' : 'normal'

            let expiryDate = new Date()
            expiryDate.setHours(expiryDate.getHours() + 5);
            b.expiry = expiryDate
            b.is_verified = false;
            b.status = 'unverified'
            await b.save()
            console.log('saved')
            var c = new Verification()
            c.user_id = b.id
            c.otp_code = await generator.generateCodes(pattern, 1, options)
            console.log('generating date')
            let expiryOTP = new Date()
            c.expiry = expiryOTP.setMinutes(expiryOTP.getMinutes() + 10);
            console.log('saving')
            await c.save()

            response.send({ user: b })

        } catch (e) {
            console.log(e)
            console.log('----')
            console.log(e.message)
            console.log('----')
            console.log(e.status)
            throw new HttpException(e.message, e.status)
        }

    }

    async sendNewToken({ request, response }) {
        let { user_id } = request.all()
        try {
            var c = new Verification()
            c.user_id = user_id
            c.otp_code = await generator.generateCodes(pattern, 1, options)
            c.expiry = expiryDate.setHours(expiryDate.getMinutes() + 10);
            await c.save()

            response.send({ status: 'OK' })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async verifyToken({ request, response }) {
        let { user_id, otp_code } = request.all()

        try {
            let query = await Verification.query().where('user_id', user_id).where('otp_code', otp_code).where('expiry', '<', new Date())
            if (!query) {
                throw new HttpException('Invalid OTP', 403)
            }
            console.log(query)
            response.send({ status: 'OK' })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async createApplicant({ request, response }) {
        let {
            user_id, //required
            email,
            opening_statement,
            first_name,
            middle_name,
            last_name,
            address,
            contact_no,
            expected_salary, key_skills, educational_backgrounds, job_experiences } = request.all()

        try {
            let query = await User.find(user_id)
            if (!query) {
                console.log("wtf")
                throw new HttpException("User does not exist", HttpResponse.STATUS_BAD_REQUEST)
            }

            // let c = new Profile;
            let d = new Applicant;

            // c.first_name = first_name
            // c.middle_name = middle_name
            // c.last_name = last_name
            // c.user_id = query.id;
            // await c.save()

            d.user_id = query.id;

            d.opening_statement = opening_statement
            d.first_name = first_name
            d.middle_name = middle_name
            d.last_name = last_name
            d.address = address
            d.contact_no = contact_no
            d.email = email
            d.expected_salary = expected_salary
            await d.save()

            //attempt save skills
            try {
                let skills = await JSON.parse(key_skills)
                skills.map(async entry => {
                    let s_a = KeySkill.findBy('skill_name', entry.name)
                    if (!s_a) {
                        s_a = new KeySkill()
                        s_a.name = entry.name
                        await s_a.save()
                    }
                    let s_b = new ApplicantSkill()
                    s_b.applicant_id = d.id
                    s_b.key_skill_id = s_a.id
                    s_b.rating = entry.rating
                    await s_b.save()
                })
            } catch (e) {
                console.log("Save skills failed")
                console.log({ message: e.message, code: e.status })
            }

            //attempt save Educational background
            try {
                let edu_back = await JSON.parse(educational_backgrounds)
                edu_back.map(async entry => {
                    let eb_a = new EducationalBackground()
                    eb_a.name = entry.name
                    eb_a.course = entry.degree
                    eb_a.date_start = entry.startDate
                    eb_a.date_end = entry.endDate
                    eb_a.applicant_id = user_id

                    await eb_a.save()
                })
            } catch (e) {
                console.log("Save educational background failed")
                console.log({ message: e.message, code: e.status })
            }

            //Attempt save job experiences
            try {
                let job_expi = await JSON.parse(job_experiences)
                job_expi.map(async entry => {
                    let jb_a = new JobExperience()
                    jb_a.name = entry.name
                    jb_a.role = entry.role
                    jb_a.date_start = entry.startDate
                    jb_a.date_end = entry.endDate
                    await jb_a.save()
                })
            } catch (e) {
                console.log("Save job experience failed")
                console.log({ message: e.message, code: e.status })
            }


            response.send({ profile: c, applicant: d })


        } catch (e) {
            console.log(e)
            throw new HttpException(e.message, e.status)
        }
    }
}

module.exports = UserController
