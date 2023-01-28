import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { getCompany } from './graphql/queries';
import JobList from './JobList';

function CompanyDetail() {
  const { companyId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    getCompany(companyId).then((res) => setData(res));
  }, [companyId]);

  const company = data ? data.company : null;
  if (!data) return <h1>Loading</h1>;
  return (
    <div>
      <h1 className="title">{company.name}</h1>
      <div className="box">{company.description}</div>
      <h3 className='hero-head'>{company.name} list of jobs:</h3>
      <JobList jobs={data.jobs}/>

    </div>
  );
}

export default CompanyDetail;
