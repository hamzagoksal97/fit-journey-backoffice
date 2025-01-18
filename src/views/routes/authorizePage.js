import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const AuthorizePage = () => {
    let navigate = useNavigate();

    return (
        <Result
            status="403"
            title="403"
            subTitle="Üzgünüz, bu sayfaya erişiminiz yok."
            extra={<Button onClick={() => navigate("/Home")} type="primary">Anasayfa</Button>}
        />
    );
}

export default AuthorizePage;