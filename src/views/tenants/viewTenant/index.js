import React, { useEffect, useState } from 'react';
import { Button, Collapse, Flex, Form, message, Spin, theme } from 'antd';
import TenantInformation from '../addTenant/tabs/tenantInformation';
import { useDispatch, useSelector } from 'react-redux';
import { getTenantById, updateTenant } from '../../../store/slices/tenantSlice';
import { useParams } from 'react-router-dom';
import { hasAnyClaim } from '../../../helpers';
import { OperationClaims } from '../../../constants/operationClaims';
import { CaretRightOutlined } from '@ant-design/icons';

const ViewTenantPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const params = useParams();
  const tenantState = useSelector(state => state.tenant);
  const { token } = theme.useToken();
  const claims = useSelector(state => state.auth.claims);
  const panelStyle = {
    marginBottom: 24,
    background: 'white',
    borderRadius: token.borderRadiusLG,
    border: 'none',
  };

  const [tenant, setTenant] = useState({});

  const fetchTenant = async () => {
    try {
      const result = await dispatch(getTenantById(params?.id)).unwrap();
      console.log(result);
      if (result?.id) {
        setTenant(result);
        form.setFieldsValue({
          ...result,
        });
      }
    } catch (error) {
      setTenant({});
      message.error('Bayi bilgileri yüklenirken hata oluştu');
    }
  };

  useEffect(() => {
    fetchTenant();
  }, []);

  const handleUpdate = () => {
    dispatch(updateTenant(form.getFieldsValue())).unwrap().then((result) => {
      if (result?.id) {
        fetchTenant();
        message.success("Bayi güncellendi");
      } else {
        message.error("Bayi güncellenirken hata oluştu");
      }
    }).catch(() => {
      message.error("Bayi güncellenirken hata oluştu");
    });
  }

  const getItems = () => [
    {
      key: '1',
      label: 'Bayi Bilgileri',
      children: <TenantInformation />,
      style: panelStyle,
    },
  ];

  if (tenantState.isLoading) {
    return <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
      <Spin />
    </Flex>
  }

  return (
    <Flex gap="middle" vertical>
      <Form layout="vertical" form={form}>
        <Collapse
          bordered={false}
          defaultActiveKey={['1']}
          expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
          style={{
            background: "#f5f5f5",
          }}
          items={getItems()}
        />
      </Form>
      <Flex align="center" gap="middle">
        <Button
          disabled={!hasAnyClaim(claims, [OperationClaims.Tenant.Update])}
          loading={tenantState.loading}
          type="primary"
          onClick={handleUpdate}>
          Güncelle
        </Button>
      </Flex>
    </Flex>
  );
};

export default ViewTenantPage;
