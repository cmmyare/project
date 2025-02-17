import React, { useState } from "react";
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from "@mui/material";
import { Link, useNavigate, redirect } from "react-router-dom";
import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";
import customFetch from "../../utilities/customFetch"; // API utility
import { toast } from "react-toastify";
const AuthLogin = ({ title, subtitle, subtext }) => {
  const navigate = useNavigate(); // For redirecting after login

  // State for email & password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle login submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      await customFetch.post("/auth/login", formData);
      toast.success("Login successfully");

      console.log("Navigating to /dashboard");
      navigate("/dashboard", { replace: true }); // ✅ Redirect using useNavigate
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.msg || "Login failed. Please try again."
      );
    }
  };

  return (
    <>
      {title && (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      )}

      {subtext}

      <Box component="form" onSubmit={handleSubmit}>
        <Stack>
          {/* Email Field */}
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="email"
              mb="5px"
            >
              Email Address
            </Typography>
            <CustomTextField
              id="email"
              variant="outlined"
              fullWidth
              value={formData.email}
              onChange={handleChange}
            />
          </Box>

          {/* Password Field */}
          <Box mt="25px">
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Password
            </Typography>
            <CustomTextField
              id="password"
              type="password"
              variant="outlined"
              fullWidth
              value={formData.password}
              onChange={handleChange}
            />
          </Box>

          {/* Remember Me & Forgot Password */}
          <Stack
            justifyContent="space-between"
            direction="row"
            alignItems="center"
            my={2}
          >
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember this Device"
              />
            </FormGroup>
            <Typography
              component={Link}
              to="/forgot-password"
              fontWeight="500"
              sx={{
                textDecoration: "none",
                color: "primary.main",
              }}
            >
              Forgot Password?
            </Typography>
          </Stack>
        </Stack>

        {/* Submit Button */}
        <Box>
          <Button
            color="primary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
          >
            Sign In
          </Button>
        </Box>
      </Box>

      {subtitle}
    </>
  );
};

export default AuthLogin;
