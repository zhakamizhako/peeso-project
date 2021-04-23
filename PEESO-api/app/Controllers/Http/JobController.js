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
const { HttpException } = use("node-exceptions");
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

    async applyJob({ request, auth, response }) {
        let {
            id,

        } = request.all()
        let user_id = auth.user.id

        try {
            let j = await Job.find(id)

        } catch (e) {
            throw new HttpException(e.message, e.status)
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

            response.send({ data: jobs.toJSON()[0] })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
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
