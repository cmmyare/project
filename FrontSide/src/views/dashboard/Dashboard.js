import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import PageContainer from "src/components/container/PageContainer";
import "./Dashboard.css"; // Import the CSS file
import customFetch from "../utilities/customFetch";
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  LinearProgress
} from "@mui/material";
import { 
  IconUsers, 
  IconUserCheck, 
  IconUserCog,
  IconArrowUpRight,
  IconArrowDownRight
} from "@tabler/icons-react";
import Chart from 'react-apexcharts';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalAdmins: 0,
    totalRegularUsers: 0,
    totalStudents: 0,
    recentUsers: [],
    recentStudents: [],
    userGrowth: 0,
    studentGrowth: 0,
    currentUser: null
  });
  const [loading, setLoading] = useState(true);

  // Chart options for User Growth
  const userGrowthOptions = {
    chart: {
      type: 'area',
      toolbar: { show: false },
      sparkline: { enabled: true }
    },
    stroke: { curve: 'smooth', width: 2 },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.2,
        stops: [0, 90, 100]
      }
    },
    colors: ['#4CAF50'],
    tooltip: {
      theme: 'dark'
    }
  };

  // Chart options for Student Registration
  const studentRegistrationOptions = {
    chart: {
      type: 'bar',
      toolbar: { show: false }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        borderRadius: 4
      }
    },
    colors: ['#6B8DD6', '#FF9F43'],
    dataLabels: { enabled: false },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3
    },
    xaxis: {
      categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersResponse, studentsResponse, currentUserResponse] = await Promise.all([
          customFetch.get("users/all-users"),
          customFetch.get("test/reg"),
          customFetch.get("users/current-user")
        ]);
        
        // Count admins and regular users
        const admins = usersResponse.data.filter(user => user.role === 'admin').length;
        const regularUsers = usersResponse.data.filter(user => user.role === 'user').length;
        
        // Calculate growth (mock data - replace with real calculations)
        const userGrowth = ((regularUsers - 80) / 80) * 100;
        const studentGrowth = ((studentsResponse.data.length - 60) / 60) * 100;

        // Get recent users and students (last 5)
        const recentUsers = usersResponse.data.slice(-5).reverse();
        const recentStudents = studentsResponse.data.slice(-5).reverse();
        
        // Store current user data
        const currentUser = currentUserResponse.data.user;

        setStats({
          totalAdmins: admins,
          totalRegularUsers: regularUsers,
          totalStudents: studentsResponse.data.length,
          recentUsers,
          recentStudents,
          userGrowth,
          studentGrowth,
          currentUser
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
        toast.error("Failed to fetch statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Mock data for charts
  const userGrowthSeries = [{
    name: 'Users',
    data: [31, 40, 28, 51, 42, 109, 100]
  }];

  const studentRegistrationSeries = [{
    name: 'Users',
    data: [44, 55, 57, 56, 61, 58, 63]
  }, {
    name: 'Students',
    data: [76, 85, 101, 98, 87, 105, 91]
  }];

  // Function to determine if a user is active based on email match
  const isUserActive = (user) => {
    if (!stats.currentUser || !user.email || !stats.currentUser.email) {
      return false;
    }
    return user.email.toLowerCase() === stats.currentUser.email.toLowerCase();
  };

  if (loading) {
    return (
      <PageContainer title="Dashboard" description="Loading...">
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
          <CircularProgress />
        </Box>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Grid container spacing={3}>
        {/* Stats Cards Row */}
        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ 
            minHeight: 150, 
            display: 'flex', 
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.14), 0 7px 10px -5px rgba(76,175,80,0.4)',
            '&:hover': {
              transform: 'translateY(-5px)',
              transition: 'transform 0.3s ease'
            }
          }}>
            <Box
              sx={{
                position: 'absolute',
                right: -10,
                top: -10,
                opacity: 0.2,
                transform: 'rotate(30deg)'
              }}
            >
              <IconUserCog size={100} color="white" />
            </Box>
            <CardContent sx={{ width: '100%', zIndex: 1 }}>
              <Typography variant="h3" component="div" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                {stats.totalAdmins}
              </Typography>
              <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                Total Admins
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ 
            minHeight: 150, 
            display: 'flex', 
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #6B8DD6 0%, #4B6CB7 100%)',
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.14), 0 7px 10px -5px rgba(107,141,214,0.4)',
            '&:hover': {
              transform: 'translateY(-5px)',
              transition: 'transform 0.3s ease'
            }
          }}>
            <Box
              sx={{
                position: 'absolute',
                right: -10,
                top: -10,
                opacity: 0.2,
                transform: 'rotate(30deg)'
              }}
            >
              <IconUsers size={100} color="white" />
            </Box>
            <CardContent sx={{ width: '100%', zIndex: 1 }}>
              <Typography variant="h3" component="div" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                {stats.totalRegularUsers}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  Regular Users
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgba(255,255,255,0.1)', px: 1, py: 0.5, borderRadius: 1 }}>
                  {stats.userGrowth > 0 ? (
                    <IconArrowUpRight size={16} color="white" />
                  ) : (
                    <IconArrowDownRight size={16} color="white" />
                  )}
                  <Typography variant="caption" sx={{ color: 'white', ml: 0.5 }}>
                    {Math.abs(stats.userGrowth).toFixed(1)}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Card sx={{ 
            minHeight: 150, 
            display: 'flex',
            position: 'relative',
            overflow: 'hidden',
            background: 'linear-gradient(135deg, #FF9F43 0%, #FF7F00 100%)',
            boxShadow: '0 4px 20px 0 rgba(0,0,0,0.14), 0 7px 10px -5px rgba(255,159,67,0.4)',
            '&:hover': {
              transform: 'translateY(-5px)',
              transition: 'transform 0.3s ease'
            }
          }}>
            <Box
              sx={{
                position: 'absolute',
                right: -10,
                top: -10,
                opacity: 0.2,
                transform: 'rotate(30deg)'
              }}
            >
              <IconUserCheck size={100} color="white" />
            </Box>
            <CardContent sx={{ width: '100%', zIndex: 1 }}>
              <Typography variant="h3" component="div" sx={{ mb: 2, color: 'white', fontWeight: 600 }}>
                {stats.totalStudents}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)' }}>
                  Registered Students
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'rgba(255,255,255,0.1)', px: 1, py: 0.5, borderRadius: 1 }}>
                  {stats.studentGrowth > 0 ? (
                    <IconArrowUpRight size={16} color="white" />
                  ) : (
                    <IconArrowDownRight size={16} color="white" />
                  )}
                  <Typography variant="caption" sx={{ color: 'white', ml: 0.5 }}>
                    {Math.abs(stats.studentGrowth).toFixed(1)}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Charts Row */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3 }}>Weekly Registration Overview</Typography>
              <Chart
                options={studentRegistrationOptions}
                series={studentRegistrationSeries}
                type="bar"
                height={350}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3 }}>User Growth Trend</Typography>
              <Chart
                options={userGrowthOptions}
                series={userGrowthSeries}
                type="area"
                height={350}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity Row */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3 }}>Recent Users</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stats.recentUsers.map((user, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'primary.main' }}>
                              {user.name?.charAt(0) || 'U'}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2">{user.name}</Typography>
                              <Typography variant="caption" color="textSecondary">
                                {user.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>{user.role}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box 
                              sx={{ 
                                width: '8px', 
                                height: '8px', 
                                borderRadius: '50%', 
                                bgcolor: isUserActive(user) ? 'success.main' : 'grey.400',
                                mr: 1 
                              }} 
                            />
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                color: isUserActive(user) ? 'success.main' : 'text.secondary'
                              }}
                            >
                              {isUserActive(user) ? 'Active' : 'Inactive'}
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 3 }}>Recent Students</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Student</TableCell>
                      <TableCell>Age</TableCell>
                      <TableCell>Progress</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {stats.recentStudents.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: 'secondary.main' }}>
                              {student.name?.charAt(0) || 'S'}
                            </Avatar>
                            <Box>
                              <Typography variant="subtitle2">{student.name}</Typography>
                              <Typography variant="caption" color="textSecondary">
                                {student.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell>{student.age}</TableCell>
                        <TableCell sx={{ width: '40%' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LinearProgress 
                              variant="determinate" 
                              value={Math.random() * 100} 
                              sx={{ width: '100%', height: 6, borderRadius: 5 }}
                            />
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Dashboard;
