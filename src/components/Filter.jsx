
import { sortOpt, statusOpt, typeOpt } from '../helpers/constants'
import { useDispatch } from 'react-redux'
import { clearFilters, filterBySearch, filterByStatus, filterByType, sortJobs } from '../redux/jobSlice';
import { useRef } from 'react';

const Filter = () => {

const dispatch = useDispatch();
const inputRef = useRef();
const typeRef = useRef();
const statusRef = useRef();
const sortRef = useRef();

const handleReset = () => {
  dispatch(clearFilters());

  inputRef.current.value = '';
  typeRef.current.value = 'Select';
  statusRef.current.value = 'Select';
  sortRef.current.value = 'Select';

}
  return (
    <div className='filter-sec'>
        <h3>Job Filter</h3>
        <form>
        <div>
          <label>Search</label>
          <input 
          ref={inputRef}
          onChange={(e) => dispatch(filterBySearch(e.target.value))}
          placeholder='Ex:Amazon' 
          type="text" />
        </div>

        <div>
          <label>Status</label>
          <select 
          ref={statusRef}
            onChange={(e) => dispatch(filterByStatus(e.target.value))}
            name="status">
            <option selected disabled>Select</option>
            {statusOpt.map((opt,i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div> 
        <div>
          <label>Type</label>
          <select 
          ref={typeRef}
          onChange={(e) => dispatch(filterByType(e.target.value))}
          name='type'
          >
            <option selected disabled>Select</option>
            {typeOpt.map((opt,i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Sort</label>
          <select
          ref={sortRef}
          onChange={(e) => dispatch(sortJobs(e.target.value))}
           name="type">
            <option selected disabled>Select</option>
            {sortOpt.map((opt,i) => (
              <option key={i}>{opt}</option>
            ))}
          </select>
        </div>
        <div className='button-area'>
        <button onClick={handleReset} type="button">Clear</button>
        </div>
      </form>
    </div>
  )
}

export default Filter