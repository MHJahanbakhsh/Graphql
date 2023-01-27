import {request, gql} from 'graphql-request'


const GRAPQHQL_URL = 'http://localhost:9000/graphql'


export async function getJobs(){
    const query = gql`
    {
  jobs {
    id
    title
    company {
      name
    }
  }
}
    `    
    const {jobs} = await request(GRAPQHQL_URL, query)
    return jobs
}