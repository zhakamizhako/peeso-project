'use strict'
const { HttpException } = use("node-exceptions");
// const Env = use('env');
const Hash = use("Hash");
const User = use('App/Models/User')
const Profile = use('App/Models/Profile')
const FreelanceEmployer = use('App/Models/FreelanceEmployer')
const Company = use('App/Models/Company')
const Applicant = use('App/Models/Applicant')
const Verification = use('App/Models/Verification')
const KeySkill = use('App/Models/KeySkill')
const ApplicantSkill = use('App/Models/ApplicantKeySkill')
const EducationalBackground = use('App/Models/ApplicantEducationalBackground')
const JobExperience = use('App/Models/ApplicantJobExperience')
const HttpResponse = use('App/Controllers/Http/HttpResponse')
const Upload = use('App/Models/FileUpload')
const MyFile = use('App/Models/MyFile')
const fs = use('fs')
const { v4: uuidv4 } = require('uuid');

let CodeGenerator = require('node-code-generator');
const { first, last } = require('../../Models/Company');

let generator = new CodeGenerator()
let pattern = '******'
let options = {
    alphanumericChars:
        '123456789ABCDEFGHJKLMNPQRSTUVWXYZ'
}
class UserController {
    async authenticate({ auth, request, response }) {
        var { username, email, password, type } = request.all();

        try {
            function validateEmail(email) {
                let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                return re.test(String(email).toLowerCase())
            }

            let cb = false

            console.log("email:" + email)
            console.log("username:" + username)
            console.log("password:" + password)

            if (email != null) {
                // if (validateEmail(email)) {
                cb = await User.findBy('email', email)
                // }
            } else if (username != null && type != 'google') {
                cb = await User.findBy('username', username)
            }

            if (!cb) {
                throw new HttpException('Invalid Username or Password!', HttpResponse.STATUS_BAD_REQUEST)
            }

            let pass = await Hash.verify(password, cb.password)
            if (!pass) {
                throw new HttpException('Invalid Username or Password!', HttpResponse.STATUS_BAD_REQUEST)
            }

            var { token } = await auth.generate(cb)

            let profile = await cb.profile().fetch()

            let returnData = {
                userData: cb,
                accessToken: token
            }

            returnData.userData.profile = profile

            if (!cb.is_verified) {
                returnData.verified = false
            } else {
                returnData.verified = true
            }

            let test = (await User.query().where('id', cb.id).with('company').with('applicant').with('freelanceEmploy').fetch()).toJSON()[0]
            console.log(test)
            if (test != null && (test.company != null || test.applicant != null || test.freelanceEmploy != null)) {
                returnData.noAccount = false
            } else {
                returnData.noAccount = true
            }

            console.log(returnData)
            response.send(returnData)


        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async me({ auth, response }) {
        let user_id = auth.user.id
        let user = (await User.query().where('id', user_id).with('profile.picture').with("company").with("applicant").with('freelancer').with("freelanceEmploy").fetch()).toJSON()[0]

        if (!user) {
            throw new HttpException('Invalid Token / Token Expired.', 404)
        }

        response.send({ user: user })
    }

    async processBase64File(file, type, filetype, user_id) {
        let base64String = file
        let base64Data = base64String.split(';base64').pop();
        let name = uuidv4()
        let status = null
        try {
            let dir = `public/${type}`
            if (!fs.existsSync(dir)) {
                {
                    fs.mkdirSync(dir)
                }
            }
            status = await fs.writeFileSync(`public/${type}/${name}.${filetype}`, base64Data, { encoding: 'base64' })
        } catch (e) {
            console.log(e)
            status = false
        }
        if (status != false) {
            let b = new Upload()
            b.filename = name
            b.path = `${type}/${name}.${filetype}`
            b.uploaded_by = user_id
            b.type = type
            await b.save()
            return { name: name, tmpPath: `${type}/${name}.${filetype}`, id: b.id }
            // imageData.push({ name: name, tmpPath: `${type}/${name}.${filetype}` })
        } else {
            return false
        }

    }

    async uploadProfilePic({ request, auth, response }) {
        let { photo, fileType } = request.all()

        let u = await User.find(auth.user.id)
        let profile = await u.profile().fetch()

        let upload = await this.processBase64File(photo, 'Profile', fileType, u.id)

        profile.profile_pic = upload.id

        await profile.save()

        response.send({ data: profile })
    }

    async createUser({ request, response }) {
        let { username, email, password, type } = request.all()
        console.log('a')
        if (email == null) {
            throw new HttpException('email required.', HttpResponse.STATUS_BAD_REQUEST)
        }

        try {
            var btest = (await User.query().where('email', email).fetch()).toJSON()[0]
            if (btest) {
                throw new HttpException('This Email has already been taken', HttpResponse.STATUS_BAD_REQUEST)
            }
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
            c.otp_code = await generator.generateCodes(pattern, 1, options)[0]
            console.log('generating date')
            let expiryOTP = new Date()
            expiryOTP = expiryOTP.setMinutes(expiryOTP.getMinutes() + 10);
            console.log()
            c.expiry = new Date(expiryOTP)

            await c.save()
            console.log('sending bak')
            console.log(b)
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
            c.otp_code = await generator.generateCodes(pattern, 1, options)[0]
            let expiryOTP = new Date()
            expiryOTP = expiryOTP.setHours(expiryOTP.getMinutes() + 10);
            c.expiry = new Date(expiryOTP)
            await c.save()
            console.log('new otp generated')
            response.send({ status: 'OK' })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async verifyToken({ request, response }) {
        console.log('verifytokencall')
        let { user_id, otp_code } = request.all()
        if (otp_code == null) {
            throw new HttpException("otp required", 403)
        }
        try {
            console.log(user_id)
            console.log(otp_code)
            let query = (await Verification.query().where('user_id', user_id).where('otp_code', otp_code).where('expiry', '>', new Date()).fetch()).toJSON()
            console.log(query)
            if (query.length == 0) {
                throw new HttpException('Invalid OTP, or OTP has expired', 403)
            }
            let queryuser = await User.find(user_id)
            queryuser.is_verified = true;
            await queryuser.save()

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
            title,
            expected_salary, key_skills, educational_backgrounds, job_experiences, profile } = request.all()

        console.log(key_skills)
        console.log(educational_backgrounds)
        console.log(job_experiences)

        try {
            let query = await User.find(user_id)
            if (!query) {
                console.log("wtf")
                throw new HttpException("User does not exist", HttpResponse.STATUS_BAD_REQUEST)
            }

            // let c = new Profile;
            let d = new Applicant;

            d.user_id = query.id;

            d.opening_statement = opening_statement
            d.first_name = first_name
            d.middle_name = middle_name
            d.last_name = last_name
            d.address = address
            d.contact_no = contact_no
            d.email = email
            d.expected_salary = expected_salary
            d.title = title
            await d.save()

            try {
                let cc = await User.find(user_id)
                let profilea = await cc.profile().fetch();
                if (!profilea) {
                    let c = new Profile
                    c.first_name = d.first_name
                    c.middle_name = d.middle_name
                    c.last_name = d.last_name
                    c.user_id = user_id

                    await c.save()

                }
                // if (profile == null) {
                // }
            } catch (e) {
                console.log('Error ?')
                console.log(e)
            }

            //attempt save skills
            try {
                let skills = (key_skills)
                await skills.map(async entry => {
                    let s_a = await KeySkill.findBy('skill_name', entry.name)
                    if (!s_a) {
                        s_a = new KeySkill()
                        s_a.skill_name = entry.name
                        await s_a.save()
                    }
                    let s_b = new ApplicantSkill()
                    s_b.applicant_id = d.id
                    s_b.key_skill_id = s_a.id
                    s_b.rating = entry.rate
                    await s_b.save()
                })
            } catch (e) {
                console.log("Save skills failed")
                console.log({ message: e.message, code: e.status })
            }

            //attempt save Educational background
            try {
                let edu_back = (educational_backgrounds)
                await edu_back.map(async entry => {
                    let eb_a = new EducationalBackground()
                    eb_a.name = entry.name
                    eb_a.course = entry.degree
                    eb_a.date_start = entry.startDate
                    eb_a.date_end = entry.endDate
                    eb_a.applicant_id = d.id

                    await eb_a.save()
                })
            } catch (e) {
                console.log("Save educational background failed")
                console.log({ message: e.message, code: e.status })
            }

            //Attempt save job experiences
            try {
                let job_expi = (job_experiences)
                await job_expi.map(async entry => {
                    let jb_a = new JobExperience()
                    jb_a.name = entry.name
                    jb_a.role = entry.role
                    jb_a.date_start = entry.startDate
                    jb_a.date_end = entry.endDate
                    jb_a.applicant_id = d.id
                    await jb_a.save()
                })
            } catch (e) {
                console.log("Save job experience failed")
                console.log({ message: e.message, code: e.status })
            }

            response.send({ applicant: d })


        } catch (e) {
            console.log(e)
            throw new HttpException(e.message, e.status)
        }
    }

    async createCompany({ request, response }) {
        let {
            user_id, //required
            email,
            company_name,
            description,
            address,
            first_name,
            middle_name,
            last_name,
            contact_no,
            overseas,
            profile } = request.all()

        try {
            let query = await User.find(user_id)
            if (!query) {
                console.log("wtf")
                throw new HttpException("User does not exist", HttpResponse.STATUS_BAD_REQUEST)
            }

            // let c = new Profile;
            let d = new Company;

            d.user_id = query.id;
            d.name = company_name
            d.shortdesc = description
            // d.first_name = first_name
            // d.middle_name = middle_name
            // d.last_name = last_name
            d.address = address
            d.contact_no = contact_no
            d.email = email
            d.is_overseas = overseas
            // d.expected_salary = expected_salary
            d.user_id = user_id
            await d.save()

            if (profile == null) {
                let c = new Profile
                c.first_name = first_name
                c.middle_name = middle_name
                c.last_name = last_name
                c.user_id = user_id
                c.is_company = true

                await c.save()
            }

            response.send({ company: d })


        } catch (e) {
            console.log(e)
            throw new HttpException(e.message, e.status)
        }
    }

    async createFreelanceEmployer({ request, response }) {
        let {
            first_name,
            middle_name,
            last_name,
            user_id,
            email,
            contact_no,
            address,
            photoverification,
            photohouse,
            filetypeverification,
            filetypehouse,
        } = request.all()

        try {
            let query = await User.find(user_id)
            if (!query) {
                console.log("wtf")
                throw new HttpException("User does not exist", HttpResponse.STATUS_BAD_REQUEST)
            }

            let profile = await query.profile().fetch()

            if (!profile) {
                let c = new Profile()
                c.first_name = first_name
                c.middle_name = middle_name
                c.last_name = last_name
                c.is_company = false
                c.user_id = query.id
                c.contact_no = contact_no
                await c.save()

                profile = await query.profile().fetch()
            }

            let d = new FreelanceEmployer()

            if (photoverification && filetypeverification) {
                let bb = await this.processBase64File(photoprofile, filetypeprofile, "Verification", query.id)
                d.verification_photo_id = bb.id
            }

            if (photohouse && filetypehouse) {
                let bb = await this.processBase64File(photohouse, filetypehouse, "VerificationHouse", query.id)
                d.house_picture_id = bb.id
            }
            // let c = new Profile;
            d.user_id = query.id
            d.first_name = profile.first_name
            d.middle_name = profile.middle_name
            d.last_name = profile.last_name
            d.email = email
            d.address = address
            await d.save()

            response.send({ freelanceEmployer: d })
        } catch (e) {
            console.log(e)
            throw new HttpException(e.message, e.status)
        }
    }

    async getApplicant({ params, response }) {
        let { id } = params
        try {
            let bb = (await Applicant.query().where('id', id).with('user').with('keySkills.name').with('experiences').with('educationalBackground').with('user.profile.picture').with('user.uploaded').fetch()).toJSON()

            if (!bb || bb.length < 1 || bb == []) {
                response.send({ message: 'Invalid request.' })
            }

            response.send({ data: bb[0] })
        } catch (e) {
            console.log(e)
            throw new HttpException(e.message, e.status)
        }
    }

    async updateCompany({ request, auth, response }) {

    }

    async updateCompanyAdmin({ request, auth, response }) {//reserved for admin management

    }

    async updateApplicant({ request, auth, response }) {

    }

    async updateApplicantAdmin({ request, auth, response }) {//reserved for admin management

    }

    async uploadFile({ request, auth, response }) {
        let { file, fileType, type } = request.all()
        try {
            let u = await User.find(auth.user.id)

            let upload = await this.processBase64File(file, type, fileType, u.id)
            if (!upload) {
                throw new HttpException("File save failed", 500)
            }
            let myfile = new MyFile()
            myfile.file_id = upload.id
            myfile.user_id = u.id
            myfile.type = type
            myfile.status = "Pending"
            myfile.is_approved = false
            myfile.is_rejected = false

            await myfile.save()

            response.send({ data: myfile, file: upload })
        } catch (e) {
            console.log(e)
            throw new HttpException(e.message, e.status)
        }

    }

    async getFiles({ request, auth, response }) {
        let u = await User.find(auth.user.id)
        try {
            let myfile = await MyFile.query().where('user_id', u.id).orderBy('updated_at', 'ASC').fetch()

            response.send({ data: myfile })
        } catch (e) {
            console.log(e)
            throw new HttpException(e.message, e.status)
        }

    }
}

module.exports = UserController
