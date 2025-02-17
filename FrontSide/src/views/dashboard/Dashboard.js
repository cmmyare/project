import React from "react";
import { Form, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import PageContainer from "src/components/container/PageContainer";
import "./Dashboard.css"; // Import the CSS file
import customFetch from "../utilities/customFetch";
// export const Loader = async () => {
//   try {
//     const { data } = await customFetch.get("/users/current-user");
//     return data || { user: null }; // ✅ Always return a valid object
//   } catch (error) {
//     console.log("Loader Error:", error);
//     return { user: null }; // ✅ Prevents null error
//   }
// };
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const response = await customFetch.post("test/reg", data); // Correct path
    toast.success("Successfully submitted!"); // Show success toast
    return response.data; // Always return a value for success
  } catch (error) {
    console.error("Error:", error);
    toast.error(error?.response?.data?.msg || "An error occurred!");
    return { error: error?.response?.data?.msg || "An error occurred!" }; // Return error details
  }
};

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      {/* <div className="dashboard-container">
        <div className="form-container">
          <h2 className="form-title">Send Data</h2>
          <Form method="post" className="form-grid">
            <div className="form-group">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                placeholder="name"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">age</label>
              <input
                type="number"
                name="age"
                placeholder="age"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">phone</label>
              <input
                type="number"
                name="phone"
                placeholder="phone"
                defaultValue="61xxxxxx"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">email</label>
              <input
                type="text"
                name="email"
                placeholder="email"
                defaultValue="dere@gmail.com"
                className="form-input"
              />
            </div>

            <div className="form-group full-width">
              <button type="submit" className="form-button">
                Submit
              </button>
            </div>
          </Form>
        </div>
      </div> */}
    </PageContainer>
  );
};

export default Dashboard;
