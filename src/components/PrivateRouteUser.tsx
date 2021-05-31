import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Redirect, Route } from "react-router-dom";

interface PrivateRouteUserProps {
    path: string;
    component: React.ElementType;
}

const PrivateRouteUser: React.FC<PrivateRouteUserProps> = ({ component: Component, ...rest }) => {
    const { currentUser }: any = useAuth();
    const routeComponent = (props: any) => (!currentUser ? <Component {...props} /> : <Redirect exact to="/" />);

    return <Route {...rest} render={routeComponent}></Route>;
};

export default PrivateRouteUser;
