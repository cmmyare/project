import React, { useState } from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { Link, useNavigate,redirect } from 'react-router-dom';
import axios from 'axios'; // Import axios for API calls
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import customFetch from "../../utilities/customFetch";
import { toast } from "react-toastify"; 

const AuthRegister = ({ title, subtitle, subtext }) => {
    const navigate = useNavigate();
    // State for form fields
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        email: '',
        password: '',
        location: ''
    });

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        try {
            const response = await customFetch.post("auth/register", formData); 
            //onsole.log("Registration Success:", response.data);
            toast.success("Registration successful!"); // Show success toast
            navigate("/login", { replace: true }); // Redirect using useNavigate
        } catch (error) {
            //console.error("Registration Error:", error.response?.data?.msg || error.message);
            toast.error(error?.response?.data?.msg || "An error occurred!");
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

            <Box component="form" onSubmit={handleSubmit}> {/* Form wrapper */}
                <Stack mb={3}>
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="name" mb="5px">
                        Name
                    </Typography>
                    <CustomTextField id="name" value={formData.name} onChange={handleChange} variant="outlined" fullWidth />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="lastName" mb="5px" mt="25px">
                        Last Name
                    </Typography>
                    <CustomTextField id="lastName" value={formData.lastName} onChange={handleChange} variant="outlined" fullWidth />
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="location" mb="5px" mt="25px">
                        Location
                    </Typography>
                    <CustomTextField id="location" value={formData.location} onChange={handleChange} variant="outlined" fullWidth />
                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="email" mb="5px" mt="25px">
                        Email Address
                    </Typography>
                    <CustomTextField id="email" value={formData.email} onChange={handleChange} variant="outlined" fullWidth />

                    <Typography variant="subtitle1" fontWeight={600} component="label" htmlFor="password" mb="5px" mt="25px">
                        Password
                    </Typography>
                    <CustomTextField id="password" value={formData.password} onChange={handleChange} type="password" variant="outlined" fullWidth />

                   
                </Stack>

                {/* Submit Button */}
                <Button type="submit" color="primary" variant="contained" size="large" fullWidth>
                    Sign Up
                </Button>
            </Box>

            {subtitle}
        </>
    );
};

export default AuthRegister;
