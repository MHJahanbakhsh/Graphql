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

   Job: {
      //for rest of the fields that we dont provide a resolver function,it uses the value that we gave in previous step which is Job.findAll
      company: (parent) => {
         return Company.findById(parent.companyId)
      }
   }


}