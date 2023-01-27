import {
    request,
    gql
} from 'graphql-request'


const GRAPQHQL_URL = 'http://localhost:9000/graphql'


export async function getCompany(companyId) {
  const query = gql`
    query ($companyId: ID!) {
      company(companyId: $companyId) {
        name
        id
        description
      }
    }
  `;
    const variables = {companyId}
    return await request(GRAPQHQL_URL, query, variables)
}

export async function getJob(id) {
  const query = gql`
    query ($id: ID!) {
      job(id: $id) {   # or use a custom name for your query like this: query jobQuery($id:ID!)
        id
        title
        company {
          id
          name
        }
        description
      }
    }
  `;
  const variables = { id }; //create an object with id
  const { job } = await request(GRAPQHQL_URL, query, variables);
  return job;
}

export async function getJobs() {
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
  `;
  const { jobs } = await request(GRAPQHQL_URL, query);
  return jobs;
}