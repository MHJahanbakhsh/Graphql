import {gql} from '@apollo/client' //this gql function validates the query syntax(note that it wont validate based on schema) and if it is wrong it wont send the request
import {request/*,gql*/} from 'graphql-request'; 
import {getAccessToken} from '../../auth'

const GRAPQHQL_URL = 'http://localhost:9000/graphql'


export async function createCompany(input) {
  const query = gql`
   mutation CreateJob($input: CreateJobInput!) {
  # WITH ':' we are making an alias for returned data. because it will return a job and we don't want api to say it is a createJob!  
  job: createJob(input: $input) {
    title
    description
    id
    company {
      name
    }
  }
}
  `;
    const variables = {input}
    const headers = {'Authorization':'Bearer '+ getAccessToken()}
    return await request(GRAPQHQL_URL, query, variables,headers)
}


export async function getCompany(companyId) {
  const query = gql`
    query ($companyId: ID!) {
      company(companyId: $companyId) {
        name
        id
        description
      }
      jobs {
      id
      title
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

export async function  getJobs() {
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