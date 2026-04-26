import React, { useEffect, useState } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Paper, Typography
} from '@mui/material';
import httpAction from '../utils/httpAction';
import apis from '../utils/apis';
import useProvideHooks from '../hooks/useProvideHooks';
import toast from 'react-hot-toast';

const LoginStatistics = () => {
  const { dispatch } = useProvideHooks();
  const [logins, setLogins] = useState([]);

  const fetchLogins = async () => {
    const data = { url: apis().allLogins };
    const result = await dispatch(httpAction(data));
    if (result?.status) {
      const filteredLogs = result.logs.filter(log => log.role !== 'admin');
      setLogins(filteredLogs);
    } else {
      toast.error('Failed to fetch login stats');
    }
  };

  useEffect(() => {
    fetchLogins();
  }, [dispatch]);

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>User Login Statistics</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Role</strong></TableCell>
            <TableCell><strong>Login Time</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logins.map((log, index) => (
            <TableRow key={index}>
              <TableCell>{log.email}</TableCell>
              <TableCell>{log.role}</TableCell>
              <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default LoginStatistics;
