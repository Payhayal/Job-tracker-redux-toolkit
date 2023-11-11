import { useEffect } from "react"
import Card from "../components/Card"
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setJobs, setError } from "../redux/jobSlice";
import Filter from "../components/Filter";


const JobList = () => {
  const state = useSelector((store) => store)
 const dispatch = useDispatch();

  useEffect(() => {
    axios
    .get('http://localhost:3040/jobs')
    .then((res)=> dispatch (setJobs(res.data)))
    .catch((err)=>dispatch(setError(err)))
  },[]);


  return (
    <div className="list-page">
      <Filter />
      <h3 className="job-count">You`re viewing ({state.mainJobs.length}) out of ({state.jobs.length}) jobs.</h3>
      <section className="list-section">
        {/* while you are waiting response from the API */}
       {!state.initialized && <p>Loading...</p>}

       {state.initialized && !state.isError ? (
        <>
        {state.jobs.map((job) => (<Card key={job.id} job={job}/>))}
        </> ) : (<p>Sorry, an Error occurred... </p>)}
      </section>
    </div>
  )
}

export default JobList