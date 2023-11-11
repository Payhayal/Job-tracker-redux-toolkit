import { v4 } from "uuid";
import { statusOpt, typeOpt } from "../helpers/constants"
import { useDispatch } from "react-redux";
import axios from "axios";
import { addJob } from "../redux/jobSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const AddJob = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   const form = new FormData(e.target);
   const newJob = Object.fromEntries(form.entries());

   if(!newJob.type || !newJob.status) {
    toast.info('Please fill in all the fields!!');
    return;
   }
  //  add id and date to the new form object
   newJob.id = v4();
   newJob.date = new Date().toLocaleDateString();

  // 1. adding data to api
   axios
   .post('http://localhost:3040/jobs', newJob).then(() => {dispatch(addJob(newJob));
  
  // 3.navigate to the homepage
   navigate('/');

  //  4.add notifications to your app
  // toast.success('New job has been added successfully :D');
  toast.success('New job has been added successfully :D', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    });
   })
  .catch(() => toast.error('An unexpected error occurred :(', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    })); 
  };

  return (
    <div className="add-sec">
      <h2>Job Requisition Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Position</label>
          <input required name="position" type="text" />
        </div>
        <div>
          <label>Company</label>
          <input required name="company" type="text" />
        </div>
        <div>
          <label>Location</label>
          <input required name="location" type="text" />
        </div>
        <div>
          <label>Status</label>
          <select  name="status">
            <option selected disabled>Select</option>
            {statusOpt.map((opt,i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div> 
        <div>
          <label>Type</label>
          <select name="type">
            <option selected disabled>Select</option>
            {typeOpt.map((opt,i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
        <button>Add</button>
        </div>
      </form>
    </div>
  )
}

export default AddJob