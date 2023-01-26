

export const resolvers = {
     Query:{
        jobs: async()=>[ //can be regular or async function.mostly async because resolver usually should talk to database somehow 
         {
            id:'id',
            description:'null',
            title:'no'
         }
        ]
     }


}