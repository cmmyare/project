import axios from "axios";

const costumfech = axios.create({
  baseURL: "http://localhost:3000/api/",
  withCredentials: true, // ✅ Ensures cookies are sent
  headers: { "Content-Type": "application/json" },
});

export default costumfech;
