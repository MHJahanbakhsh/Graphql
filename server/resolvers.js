import {Job,Company} from './db.js'

//we are returning promises! no their resolvers. somehow graphql handles it itself!
export const resolvers = {
   Query: {
      job: (_root, args) => { //underscode_ is just a convention for unused/private variables
         const {id} = args
         return Job.findById(id)
      },

      jobs: () => { //can be regular or async function.mostly async because resolver usually should talk to database somehow 
         return Job.findAll()
      },

      company: (_root, args) => {
         const {companyId} = args
         return Company.findById(companyId)
      }
   },

   Mutation: {
      createJob(_root, {input},context) { //note that we are destructring input. input itself is an object.
         console.log(context) // we can define context however we want(i defined it on server.js)
         if(!context.user) throw new Error('unAuthorized!')
         return Job.create({...input,companyId:context.user.companyId}) //returns a promise
      },
      // note that id will be generated automatically by the server


     async deleteJob(_root,{id},context){
         //check if user is authenticated  
         if(!context.user) throw new Error('unAuthorized!') 

         //check if the job they are trying to delete belongs to their company
         const theJob = await Job.findById(id)
         if(theJob.companyId!==context.user.companyId) throw new Error('you are not authorized to delete this job')
         return Job.delete(id)
      },

      //this fakebase gets whole job with the already generated ID and replace the values with new ones.(i know but this is as best we can get )
      async updateJob(_root,{input},context){ 

         //check if user is authenticated  
         if(!context.user) throw new Error('unAuthorized!') 

         //check if the job they are trying to update belongs to their company
         const theJob = await Job.findById(input.id)
         if(theJob.companyId!==context.user.companyId) throw new Error('you are not authorized to update this job')

         return Job.update({...input,companyId:context.user.companyId})
      }
   },

   Job: {
      //for rest of the fields that we dont provide a resolver function,it uses the value that we gave in previous step which is Job.findAll
      company: (parent) => { //in this case parent is a Job
         return Company.findById(parent.companyId)
      }
   },

   Company: {
      jobs: (parent) => { //in this case parent is a company
         return Job.findAll(job => job.companyId === parent.id)
         //find all can also take a helper function to act like a filter method
      }
   }


}