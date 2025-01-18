import React from "react";
import { OperationClaims } from "../constants/operationClaims";
import { useSelector } from "react-redux";
import AuthorizePage from "../views/routes/authorizePage";

const RouteGuard = ({ claimsRequired, children }) => {
    const userClaims = useSelector((state) => state.auth.claims);
    claimsRequired.push(OperationClaims.TenantAdmin);
    claimsRequired.push(OperationClaims.GeneralAdmin);

    const hasAccess = claimsRequired.some((claim) => userClaims.includes(claim));

    if (!hasAccess) {
        return <AuthorizePage />
    }


    return children;
};

export default RouteGuard;