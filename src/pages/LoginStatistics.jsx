import React, { useEffect, useState, useCallback } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Paper, Typography, TableContainer
} from '@mui/material';
import httpAction from '../utils/httpAction';
import apis from '../utils/apis';
import useProvideHooks from '../hooks/useProvideHooks';
import toast from 'react-hot-toast';

const LoginStatistics = () => {
  const { dispatch } = useProvideHooks();
  const [logins, setLogins] = useState([]);

  const fetchLogins = useCallback(async () => {
    const data = { url: apis().allLogins };
    const result = await dispatch(httpAction(data));
    if (result?.status) {
      const filteredLogs = result.logs.filter(log => log.role !== 'admin');
      setLogins(filteredLogs);
    } else {
      toast.error('Failed to fetch login stats');
    }
  }, [dispatch]);

  useEffect(() => {
    fetchLogins();
  }, [fetchLogins]);

  return (
    <Paper sx={{ padding: { xs: 1.5, sm: 2, md: 3 }, overflow: 'hidden' }}>
      <Typography variant="h5" gutterBottom>User Login Statistics</Typography>
      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table size="small">
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
                <TableCell sx={{ minWidth: 220 }}>{log.email}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{log.role}</TableCell>
                <TableCell sx={{ whiteSpace: 'nowrap' }}>{new Date(log.timestamp).toLocaleString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LoginStatistics;
