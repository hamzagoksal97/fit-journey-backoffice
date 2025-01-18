import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTenants } from '../store/slices/tenantSlice';

export const useTenants = () => {
  const dispatch = useDispatch();
  const [tenants, setTenants] = useState([]);
  const { loading } = useSelector((state) => state.tenant);

  const fetchTenants = () => {
    dispatch(getTenants()).unwrap()
      .then((data) => {
        setTenants(data?.items || []);
      })
      .catch(() => {
        setTenants([]);
      });
  };

  useEffect(() => {
    fetchTenants();
  }, [dispatch]);

  return {
    tenants,
    loading,
    refetchTenants: fetchTenants
  };
}; 