'use strict'
const Job = use('App/Models/Job')
const SavedJob = use('App/Models/SavedJob')
const HttpResponse = use('App/Controllers/Http/HttpResponse')
const { HttpException } = use("node-exceptions");
class JobController {

    async getJobs({ response }) {
        try {
            let jobs = (await Job.query().where('is_approved', true).orderBy('updated_at', 'DESC').with('company').with('highlight').fetch()).toJSON()
            response.send({ data: jobs })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }

    async getJob({ params, response }) {
        let { id } = params
        try {
            let jobs = await Job.query().where('id', id).with('company').with('benefits').with('highlights').fetch()

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
            let jobs = await Job.query().where('company_id', id).with('benefits').with('highlights').fetch()

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
            let saved = await SavedJob.query().where('user_id', id).orderBy('updated_at', 'desc').with('job.company').with('job.benefit').with('job.highlight').fetch()
            response.send({ data: saved.toJSON() })
        } catch (e) {
            throw new HttpException(e.message, e.status)
        }
    }
}

module.exports = JobController
