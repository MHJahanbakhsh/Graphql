import {
    request,
    gql
} from 'graphql-request'


const GRAPQHQL_URL = 'http://localhost:9000/graphql'


export async function getJob(id) {
    const query = gql `
   query($id:ID!) { # or use a custom name for your query like this: query jobQuery($id:ID!)
  job(id:$id) {
    id
    title
    company {
      id
      name
    }
    description
  }
}
    `
    const variables = {
        id
    }
    console.log(id)
    const {
        job
    } = await request(GRAPQHQL_URL, query, variables)
    console.log(job)
    return job
}

export async function getJobs() {
    const query = gql `
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
    const {
        jobs
    } = await request(GRAPQHQL_URL, query)
    return jobs
}