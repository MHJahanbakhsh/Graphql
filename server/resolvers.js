import {Job,Company} from './db.js'

export const resolvers = {
   Query: {
      job:(_root,args)=>{ //underscode_ is just a convention for unused/private variables
         const {id} = args
         return Job.findById(id)
      },

      jobs: () => { //can be regular or async function.mostly async because resolver usually should talk to database somehow 
         return Job.findAll()
      },

      company: (_root, args)=>{
         const {companyId} = args
         return Company.findById(companyId)  
      }
   },

   Mutation: {
      createJob(_root, {title, companyId, description}){
         return Job.create({title, companyId, description})
      }
      // note that id will be generated automatically by the server
   },

   Job: {
      //for rest of the fields that we dont provide a resolver function,it uses the value that we gave in previous step which is Job.findAll
      company: (parent) => { //in this case parent is a Job
         return Company.findById(parent.companyId)
      }
   },

   Company: {
      jobs:(parent)=>{ //in this case parent is a company
         return Job.findAll(job=>job.companyId===parent.id)
         //find all can also take a helper function to act like a filter method
      }
   }


}