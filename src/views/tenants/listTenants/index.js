import { Button, Flex, message, Popconfirm, Space, Spin, Table, Tooltip } from "antd";
import React, { useRef, useState } from "react";
import { useTenants } from "../../../hooks/useTenants";
import {
    EyeOutlined,
    DeleteOutlined
} from "@ant-design/icons";
import { getColumnSearchProps, hasAnyClaim } from "../../../helpers";
import { OperationClaims } from "../../../constants/operationClaims";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteTenant } from "../../../store/slices/tenantSlice";

const ListTenantsPage = () => {
    const { tenants, loading, refetchTenants } = useTenants();
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const dispatch = useDispatch();
    const search = (dataIndex) => getColumnSearchProps(dataIndex, searchInput, searchText, setSearchText, searchedColumn, setSearchedColumn);
    const claims = useSelector(state => state.auth.claims);
    const navigate = useNavigate();

    const handleDelete = (id) => {
        dispatch(deleteTenant(id)).unwrap().then((result) => {
            if (result?.id) {
                refetchTenants();
                message.success("Bayi başarıyla silindi.");
            } else {
                message.error("Bayi silinirken hata oluştu.");
            }
        }).catch((error) => {
            message.error("Bayi silinirken hata oluştu.");
        });
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'Studio Adı',
            dataIndex: 'name',
            key: 'name',
            ...search('name'),
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: 'İlgili Kişi',
            dataIndex: 'owner',
            key: 'owner',
            ...search('owner'),
        },
        {
            title: 'Telefon',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            ...search('phoneNumber'),
            sorter: (a, b) => a.phoneNumber.localeCompare(b.phoneNumber),
        },
        {
            title: "",
            key: "action",
            render: (record) => (
                <Space size="middle">
                    <Tooltip title="Bayi Görüntüle">
                        <Button
                            type="primary"
                            shape="circle"
                            disabled={!hasAnyClaim(claims, [OperationClaims.Tenant.View])}
                            onClick={() => navigate(`/ViewTenant/${record.id}`)}
                            icon={<EyeOutlined />}
                        />
                    </Tooltip>
                    <Popconfirm title="Bayi Sil" onConfirm={() => handleDelete(record.id)}>
                        <Button
                            type="primary"
                            danger
                            shape="circle"
                            disabled={!hasAnyClaim(claims, [OperationClaims.Tenant.Delete])}
                            icon={<DeleteOutlined />}
                        />
                    </Popconfirm>
                </Space>
            ),
        },
    ];





    if (loading) {
        return <Flex justify="center" align="center" style={{ minHeight: '100vh' }}>
            <Spin />
        </Flex>
    }
    return (
        <Flex gap="middle" vertical>
            <Flex align="center" gap="middle">
                <Button disabled={!hasAnyClaim(claims, [OperationClaims.Tenant.Create])}
                    loading={loading} type="primary" onClick={() => navigate("/AddTenant")} >
                    Bayi Ekle
                </Button>
            </Flex>
            <Table rowKey={"id"} scroll={{ x: 800 }} loading={loading} dataSource={tenants} columns={columns} />
        </Flex>
    )

}

export default ListTenantsPage