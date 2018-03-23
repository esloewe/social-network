import React from "react";
import axios from "./axios";

export default class JobBoard extends React.Component {
    constructor() {
        super();
        this.state = {};
    }

    componentDidMount() {
        axios.get("/jobs.json").then(resp => {
            this.setState({ jobs: resp.data.results });
        });
    }

    render() {
        if (!this.state.jobs) {
            return null;
        }
        const jobsList = this.state.jobs.map(job => (
            <div className="jobBoard" key={job.id}>
                <h3>{job.job_title}</h3>
                <p>{job.description}</p>
                <p>{job.location}</p>
                <p>{job.contact}</p>
            </div>
        ));
        return (
            <div>
                <h2 id="titleInjobs">Jobs of the Week</h2> {jobsList}
            </div>
        );
    }
}
