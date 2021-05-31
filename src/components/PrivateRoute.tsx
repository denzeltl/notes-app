import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Redirect, Route } from "react-router-dom";

interface PrivateRouteProps {
    exact: any;
    path: string;
    component: React.ElementType;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const { currentUser }: any = useAuth();
    const routeComponent = (props: any) => (currentUser ? <Component {...props} /> : <Redirect to="/login" />);

    return <Route {...rest} render={routeComponent}></Route>;
};

export default PrivateRoute;
