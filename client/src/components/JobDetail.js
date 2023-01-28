import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { getJob } from './graphql/queries';
import { useEffect, useState } from 'react';

function JobDetail() {
  const { jobId } = useParams();
  const [job, setJob] = useState([])
  const [err, setErr] = useState(null)
  useEffect(()=>{
    console.log('mounted')
    getJob(jobId).then(setJob).catch(err=>setErr(true))
  },[jobId])

  if(err) return <p>ooops! something went wrong</p>

  return (
    <div>
      <h1 className="title">
        {job.title}
      </h1>
      <h2 className="subtitle">
        <Link to={`/companies/${job.company?.id}`}>
          {job.company?.name}
        </Link>
      </h2>
      <div className="box">
        {job.description}
      </div>
    </div>
  );
}

export default JobDetail;
