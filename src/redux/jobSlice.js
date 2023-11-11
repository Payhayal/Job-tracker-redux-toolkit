import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    // this array will never change
    mainJobs: [],
    // we will transfer the filtered ones here
    jobs: [],
    // did you get a response from API?
    initialized: false,
    isError: false,

}
const jobSlice = createSlice({
    name:"jobs",
    initialState,
    reducers:{
    setJobs: (state, action) => {
        state.jobs = action.payload;
        state.mainJobs = action.payload;
        state.initialized = true;
        state.isError = false;
    },
    setError: (state) => {
        state.initialized = true;
        state.isError = true;
    },
    addJob: (state,action) => {
        state.jobs.push(action.payload);
    },
    filterBySearch: (state,action) => {
    // converting the seach section to lowercase
     const query = action.payload.toLowerCase();

    //  filtering matches with the search section
    const filter = state.mainJobs.filter((job) => 
    job.company.toLowerCase().includes(query));
    
    state.jobs = filter;

    },
    filterByStatus: (state,action) => {
        const filtred = state.mainJobs.filter((job) => job.status === action.payload);
        state.jobs = filtred;
    },
    filterByType: (state,action) => {
     state.jobs = state.mainJobs.filter((job) => job.type === action.payload);
    },
    sortJobs: (state,action) => {
        switch (action.payload) {
            case 'A-Z':
                state.jobs.sort((a,b) => a.company.localeCompare(b.company));
            break;

            case 'Z-A':
                state.jobs.sort((a,b) => b.company.localeCompare(a.company));
            break;

            case 'Newest':
                state.jobs.sort((a,b) => new Date(b.date)- new Date(a.date));
            break;
            
            case 'Oldest':
                state.jobs.sort((a,b) => new Date(a.date) - new Date(b.date));
            break;

            default:
            return state;

        }
    },
    clearFilters: (state) => {
        state.jobs = state.mainJobs;
    },

    },
});

export const {setJobs, setError, addJob, filterBySearch, filterByStatus, filterByType, sortJobs, clearFilters } = jobSlice.actions;

export default jobSlice.reducer;