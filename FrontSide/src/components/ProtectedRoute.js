import { Navigate, Outlet, useLoaderData } from "react-router-dom";

const ProtectedRoute = () => {
  const loaderData = useLoaderData(); // ✅ Get user data
  console.log("🔍 ProtectedRoute Loader Data:", loaderData);

  const user = loaderData?.user || null;

  if (!user) {
    console.log("🚫 User not authenticated. Redirecting to Landing Page.");
    return <Navigate to="/" replace />; // ✅ Redirect unauthorized users
  }

  console.log("✅ User authenticated. Allowing access.");
  return <Outlet />; // ✅ Render children if user is authenticated
};

export default ProtectedRoute;
