'use strict'
const Job = use('App/Models/Job')
const SavedJob = use('App/Models/SavedJob')
const Benefit = use('App/Models/BenefitName')
const JobBenefit = use('App/Models/JobBenefit')
const Category = use('App/Models/JobCategory')
const Highlight = use('App/Models/JobHighlight')
const User = use('App/Models/User')
// const JobQuestions = use('App/Models/')
const HttpResponse = use('App/Controllers/Http/HttpResponse')
const Question = use('App/Models/JobApplicationQuestion')
const Application = use('App/Models/JobApplication')
const Answers = use('App/Models/JobApplicationAnswer')
const Upload = use('App/Models/FileUpload')
const { HttpException } = use("node-exceptions");
const fs = use('fs')
const { v4: uuidv4 } = require('uuid');

class JobController {
    async getBenefits({ response }) {
        try {
            let b = await Benefit.query().orderBy("name", 'ASC').fetch();
            let c = await Category.query().orderBy("name", 'ASC').fetch();
            response.send({
                data: {
                    benefits: await b.toJSON(),
                    categories: await c.toJSON()
                }
            })

        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async getJobsByCategoryId({params, response}){
        let {id } = params
        try{
            let b = await Job.query().where('category_id', id).orderBy('created_at', 'ASC').fetch()

            response.send({data: b.toJSON()})
        }catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async search({request, response}){
        try{//wtf
        }catch(e){
            throw new HttpException(e.message, e.status)
        }
    }

    async searchItem({request, response}){
        try{

        }catch(e){
            throw new HttpException(e.message, e.status)
        }
    }

    async applyJob({ request, auth, response }) {
        let {
            id,
            applicant_id,
            answers,
            firstname,
            middlename,
            lastname,
            email,
            contact_no,
            resume,
            filetype
            //uploaded files
        } = request.all()
        // const resume = request.file('resume')


        // console.log(resume)
        let user_id = auth.user.id

        try {
            let j = await Job.find(id)
            console.log(j)
            console.log(id)
            console.log(applicant_id)
            console.log(answers)
            console.log(firstname)
            console.log(middlename)
            console.log(lastname)
            console.log(email)
            console.log(contact_no)
            // console.log(resume)

            let app = new Application()
            app.job_id = id
            app.applicant_id = applicant_id
            app.first_name = firstname
            app.middle_name = middlename
            app.last_name = lastname
            app.email = email
            app.contact_no = contact_no
            app.is_approved = false
            app.status = "Pending"
            if (resume != null && filetype != null) {
                var x = await this.processBase64File(resume, 'Resume', filetype, auth.user.id)
                console.log(x)
                app.file_id = x.id
            }

            await app.save()

            answers.map(async (entry) => {
                let ans = new Answers()
                ans.job_application_id = app.id
                ans.job_application_questions_id = entry.id
                ans.answer = entry.answer

                await ans.save()
            })

            response.send({ message: 'OK' })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async processBase64File(file, type, filetype, user_id) {
        let base64String = file
        let base64Data = base64String.split(';base64').pop();
        let name = uuidv4()
        let status = null
        try {
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
        }

    }

    async getJobQuestions({ params, response }) {
        let { id } = params

        try {
            let j = (await Job.query().where('id', id).with('company').with('questions').fetch()).toJSON()[0]

            response.send({ data: j })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async approveJob({ request, response }) {

    }

    async disapproveJob({ request, response }) {

    }

    async archiveJob({ request, response }) {

    }

    async checkForApplication({request, auth, response}){
        let { id } = auth.user
        let { job_id } = request.all()

        try{
            let x = await User.find(id)
            let y = await User.applicant().fetch()

            let b = await Application.query().where('applicant_id', y.id)
        } catch (e){
            throw new HttpException(e.message, e.status)
        }
    }

    async myApplications({auth, response}){
        let {id} = auth.user

        try{
            let user = await User.find(id)
            let b = await user.applicant().fetch()
            
            let x = await Application.query().where('applicant_id', b.id).with('job.company').fetch()

            response.send({data: x.toJSON()})
        } catch(e){
            throw new HttpException(e.message, e.status)
        }
    }

    async newJob({ request, auth, response }) {
        let {
            title,
            job_description,
            work_from,
            work_to,
            highlights,
            salary,
            location,
            lat,
            lng,
            salary_included_benefits,
            category,
            benefits,
            questions,
            deadline
        } = request.all()
        let { id } = auth.user

        try {
            let errors = [];
            let user = await User.find(id)
            if (!user) {
                throw new HttpException("Invalid request.", HttpResponse.STATUS_BAD_REQUEST)
            }
            let company = await user.company().fetch()

            if (!company) {
                throw new HttpException("Invalid request.", HttpResponse.STATUS_BAD_REQUEST)
            }

            let njob = new Job()
            njob.name = title
            njob.job_description = job_description
            njob.deadline = deadline
            njob.work_from = work_from
            njob.work_to = work_to
            njob.salary = salary
            njob.location = location
            njob.lat = lat
            njob.lng = lng
            njob.salary_included_benefits = salary_included_benefits
            njob.category_id = category
            njob.company_id = company.id
            njob.status = 'Pending'
            await njob.save()

            try {
                await highlights.map(async entry => {
                    let h_a = new Highlight()
                    h_a.description = entry.description
                    h_a.job_id = njob.id
                    await h_a.save()
                })
            } catch (e) {

                console.log("highlight save fail")
            }

            try {
                await questions.map(async entry => {
                    let q_a = new Question()
                    q_a.job_id = njob.id
                    q_a.question = entry.question
                    q_a.type = entry.type
                    await q_a.save()
                })
            } catch (e) {
                console.log("question save fail")
            }

            try {
                await benefits.map(async entry => {
                    if (entry.value && entry.value == true) {
                        let b_a = new JobBenefit()
                        b_a.job_id = njob.id;
                        b_a.benefit_id = entry.id

                        await b_a.save()
                    }
                })
            } catch (e) {
                console.log("benefit save fail")
            }

            response.send({ data: njob })

            console.log(request.all())
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async getJobs({ response }) {
        try {
            let jobs = (await Job.query().where('is_approved', true).orderBy('updated_at', 'DESC').with('category').with('company').with('highlight').with('benefits.name').fetch()).toJSON()
            response.send({ data: jobs })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async getJob({ params, response }) {
        let { id } = params
        try {
            let jobs = await Job.query().where('id', id).with('company').with('benefits.name').with('highlight').with('category').fetch()

            if (!jobs || jobs.toJSON().length == 0) {
                throw new HttpException("Invalid Job", HttpException.STATUS_BAD_REQUEST);
            }

            response.send({ data: jobs.toJSON()[0] })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async getJobByCompany({ params, response }) {
        let { id } = params
        try {
            let jobs = await Job.query().where('company_id', id).with('benefits').with('highlight').fetch()

            if (!jobs || jobs.toJSON().length == 0) {
                throw new HttpException("Invalid Job", HttpException.STATUS_BAD_REQUEST);
            }

            response.send({ data: jobs.toJSON() })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async getApplicants({ params, auth, response }) {

    }

    async getApplication({ params, response }) {

    }

    async saveJob({ params, auth, response }) {
        let { id } = params

        if (id == null) {
            throw new HttpException("Invalid Request", HttpException.STATUS_BAD_REQUEST);
        }
        try {
            let job = await Job.find(id)
            let check = (await SavedJob.query().where('job_id', id).where('user_id', auth.user.id).fetch()).toJSON()
            if (check.length > 0) {
                throw new HttpException("Job Already saved.", HttpException.STATUS_BAD_REQUEST);
            }

            if (!job) {
                throw new HttpException("Invalid Job", HttpException.STATUS_BAD_REQUEST);
            }
            let save = new SavedJob()
            save.job_id = id
            save.user_id = auth.user.id

            await save.save()
            response.send({ status: 'OK' })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async unsaveJob({ params, response }) {
        let { id } = params
        if (id == null) {
            throw new HttpException("Invalid Request", HttpException.STATUS_BAD_REQUEST);
        }

        try {
            let savedjob = await SavedJob.find(id)
            if (!savedjob) {
                throw new HttpException("Invalid Job", HttpException.STATUS_BAD_REQUEST);
            }
            // let save = await SavedJob.find(id)
            await savedjob.delete()
            response.send({ status: 'OK' })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async getSavedJobs({ auth, response }) {
        let { id } = auth.user
        console.log(id)
        console.log(auth.user)
        try {
            let saved = await SavedJob.query().where('user_id', id).orderBy('updated_at', 'desc').with('job.company').with('job.benefits.name').with('job.highlight').fetch()
            response.send({ data: saved.toJSON() })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }
}

module.exports = JobController
