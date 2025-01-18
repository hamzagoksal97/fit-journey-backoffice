import React from 'react';
import { Form, Input, Row, Col } from 'antd';

const TenantInformation = () => {
    return (
        <>
            <Row gutter={[16, 16]}>
                <Form.Item
                    label="Id"
                    name="id"
                    hidden
                >
                    <Input placeholder="Id" />
                </Form.Item>
                <Col xs={24} sm={12} md={8}>
                    <Form.Item
                        label="Studio Adı"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Studio Adı alanı zorunludur.',
                            },
                            {
                                type: 'string',
                                message: 'Studio Adı alanı metin tipinde olmalıdır.',
                            },
                        ]}
                    >
                        <Input placeholder="Studio Adı" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Form.Item
                        label="İlgili Kişi"
                        name="owner"
                        rules={[
                            {
                                required: true,
                                message: 'İlgili Kişi alanı zorunludur.',
                            },
                            {
                                type: 'string',
                                message: 'İlgili Kişi alanı metin tipinde olmalıdır.',
                            },
                        ]}
                    >
                        <Input placeholder="İlgili Kişi" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Form.Item
                        label="İlgili Kişi Telefonu"
                        name="phoneNumber"
                        rules={[
                            {
                                required: true,
                                message: 'İlgili Kişi Telefonu alanı zorunludur.',
                            },
                            {
                                type: 'string',
                                message: 'İlgili Kişi Telefonu alanı metin tipinde olmalıdır.',
                            },
                        ]}
                    >
                        <Input placeholder="İlgili Kişi Telefonu" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Email alanı zorunludur.',
                            },
                            {
                                type: 'email',
                                message: 'Geçerli bir email adresi giriniz.',
                            }
                        ]}
                    >
                        <Input placeholder="ornek@email.com" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Form.Item
                        label="Adres"
                        name="address"
                        rules={[
                            {
                                required: true,
                                message: 'Adres alanı zorunludur.',
                            },
                            {
                                type: 'string',
                                message: 'Adres alanı metin tipinde olmalıdır.',
                            },
                        ]}
                    >
                        <Input placeholder="Adres" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Form.Item
                        label="Konum Latitude"
                        name="latitude"
                        rules={[
                            {
                                required: true,
                                message: 'Konum Latitude alanı zorunludur.',
                            },
                            {
                                pattern: /^-?([1-8]?\d(\.\d+)?|90(\.0+)?)$/,
                                message: 'Geçerli bir latitude değeri giriniz (Örn: 40.1234567)',
                            }
                        ]}
                    >
                        <Input placeholder="Örn: 40.1234567" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={12} md={8}>
                    <Form.Item
                        label="Konum Longitude"
                        name="longitude"
                        rules={[
                            {
                                required: true,
                                message: 'Konum Longitude alanı zorunludur.',
                            },
                            {
                                pattern: /^-?((1[0-7]\d(\.\d+)?)|([1-9]?\d(\.\d+)?)|180(\.0+)?)$/,
                                message: 'Geçerli bir longitude değeri giriniz (Örn: 29.1234567)',
                            }
                        ]}
                    >
                        <Input placeholder="Örn: 29.1234567" />
                    </Form.Item>
                </Col>
            </Row>

        </>
    );
};

export default TenantInformation;