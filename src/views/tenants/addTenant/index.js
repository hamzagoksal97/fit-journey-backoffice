import React from 'react';
import { CaretRightOutlined } from '@ant-design/icons';
import { Button, Collapse, Flex, Form, Spin, message, theme } from 'antd';
import TenantInformation from './tabs/tenantInformation';
import { useDispatch, useSelector } from 'react-redux';
import { addTenant } from '../../../store/slices/tenantSlice';
import { useNavigate } from 'react-router-dom';
import { OperationClaims } from '../../../constants/operationClaims';
import { hasAnyClaim } from '../../../helpers';

const AddTenantPage = () => {
    const { token } = theme.useToken();
    const [form] = Form.useForm(); const navigate = useNavigate();
    const tenant = useSelector((state) => state.tenant);
    const claims = useSelector(state => state.auth.claims);
    const isLoading = tenant.loading;

    const dispatch = useDispatch();
    const panelStyle = {
        marginBottom: 24,
        background: 'white',
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };


    const getItems = () => [
        {
            key: '1',
            label: 'Bayi Bilgileri',
            children: <TenantInformation />,
            style: panelStyle,
        },
    ];

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();

            const result = await dispatch(addTenant(values)).unwrap();

            if (result?.id) {
                message.success("Bayi başarıyla eklendi.");
                navigate(`/ViewTenant/${result.id}`);
            }
        } catch (error) {
            if (!error?.errorFields) { // If not a validation error
                message.error("Bayi eklenirken hata oluştu.");
            }
        }
    };

    if (isLoading) {
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
                    disabled={!hasAnyClaim(claims, [OperationClaims.Tenant.Create])}
                    loading={tenant.loading}
                    type="primary"
                    onClick={handleSubmit}>
                    Kaydet
                </Button>
            </Flex>
        </Flex>
    );
};


export default AddTenantPage;