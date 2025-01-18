import React from 'react';
import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import { Card, Col, Row, Statistic, Grid } from 'antd';

const { useBreakpoint } = Grid;

const HomePage = () => {
    const screens = useBreakpoint();

    return (
        <Row gutter={[16, 16]} justify="center">
            {/* <Col xs={24} sm={12} md={8} lg={6}>
                <Card bordered={false}>
                    <Statistic
                        title="Toplam Üye Sayısı"
                        value={11}
                        valueStyle={{
                            color: '#3f8600',
                        }}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={6}>
                <Card bordered={false}>
                    <Statistic
                        title="Toplam Paket Sayısı"
                        value={9}
                        precision={2}
                        valueStyle={{
                            color: '#3f8600',
                        }}
                    />
                </Card>
            </Col> */}
        </Row>
    );
};

export default HomePage;
