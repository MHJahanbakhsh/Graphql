import {
   Job,
   Company
} from './db.js'

export const resolvers = {
   Query: {
      jobs: async () => { //can be regular or async function.mostly async because resolver usually should talk to database somehow 
         return Job.findAll()
      }
   },

   Job: {
      //for rest of the fields that we dont provide a resolver function,it uses the value that we gave in previous step which is Job.findAll
      company: (parent) => {
         return Company.findById(parent.companyId)
      }
   }


}