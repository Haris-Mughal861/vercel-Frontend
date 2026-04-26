import React, { useEffect, useState, useCallback } from 'react';
import {
  Table, TableHead, TableRow, TableCell, TableBody,
  Paper, Typography, Button
} from '@mui/material';
import httpAction from '../utils/httpAction';
import apis from '../utils/apis';
import useProvideHooks from '../hooks/useProvideHooks';
import toast from 'react-hot-toast';

const RegisteredSellers = () => {
  const { dispatch } = useProvideHooks();
  const [sellers, setSellers] = useState([]);

  const fetchSellers = useCallback(async () => {
    const data = { url: apis().allSellers };
    const result = await dispatch(httpAction(data));
    if (result?.status) {
      setSellers(result.sellers);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchSellers();
  }, [fetchSellers]);

  const handleBlockSeller = async (sellerId) => {
    const data = {
      url: `${apis().blockSeller}?sellerId=${sellerId}`,
      method: 'PUT'
    };
    const result = await dispatch(httpAction(data));
    if (result?.status) {
      toast.success('Seller status updated');
      fetchSellers();
    } else {
      toast.error('Failed to update seller');
    }
  };

  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant="h5" gutterBottom>Registered Sellers</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Email</strong></TableCell>
            <TableCell><strong>Phone</strong></TableCell>
            <TableCell><strong>Shop Name</strong></TableCell>
            <TableCell><strong>Status</strong></TableCell>
            <TableCell><strong>Action</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sellers.map((seller) => (
            <TableRow key={seller._id}>
              <TableCell>{seller.name}</TableCell>
              <TableCell>{seller.email}</TableCell>
              <TableCell>{seller.phone || 'N/A'}</TableCell>
              <TableCell>{seller.shopName || 'N/A'}</TableCell>
              <TableCell>{seller.status || 'Active'}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color={seller.status === 'Blocked' ? 'success' : 'error'}
                  onClick={() => handleBlockSeller(seller._id)}
                >
                  {seller.status === 'Blocked' ? 'Unblock' : 'Block'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default RegisteredSellers;
