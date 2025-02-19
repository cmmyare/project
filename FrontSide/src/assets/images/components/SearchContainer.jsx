//import React from "react";
import { FormRow, FormRowSelect } from ".";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { Form, useSubmit, Link } from "react-router-dom";
import { JOB_TYPE, JOB_STATUS, JOB_SORT_BY } from "../../../utils/constants";
import { useAllJobsCotext } from "../pages/AllJobs";
// console.log(useAllJobsContext);
const debounce = (onChange) => {
  let timeout;
  return (e) => {
    const form = e.currentTarget.form;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      onChange(form);
    }, 2000);
  };
};
const SearchContainer = () => {
  const { searcchValues } = useAllJobsCotext();
  //console.log("waaal", searcchValues);
  const { search, jobStatus, jobType, sort } = searcchValues;
  // const navigation = useNavigation();
  const submit = useSubmit();
  // const isSubmiting = navigation.state === "submitting";

  return (
    <Wrapper>
      <Form className="form">
        <h5 className="form-title">Search</h5>
        <div className="form-center">
          <FormRow
            type="text"
            name="search"
            defaultValue={search}
            onChange={debounce((form) => {
              submit(form);
            })}
          />
          <FormRowSelect
            labelText="job status"
            name="jobStatus"
            list={["all", ...Object.values(JOB_STATUS)]}
            defaultValue={jobStatus}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="job type"
            name="jobType"
            list={["all", ...Object.values(JOB_TYPE)]}
            defaultValue={jobType}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <FormRowSelect
            labelText="sort"
            defaultValue={sort}
            list={[...Object.values(JOB_SORT_BY)]}
            onChange={(e) => {
              submit(e.currentTarget.form);
            }}
          />
          <Link to="/dashboard/all-jobs" className="btn form-btn delete-btn">
            Resest all search values
          </Link>
        </div>
      </Form>
    </Wrapper>
  );
};

export default SearchContainer;
