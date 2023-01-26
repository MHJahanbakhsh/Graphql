import {Job} from './db.js'

export const resolvers = {
     Query:{
        jobs: async()=>{ //can be regular or async function.mostly async because resolver usually should talk to database somehow 
          return Job.findAll()
      }
     }


}