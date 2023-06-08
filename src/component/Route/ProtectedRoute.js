import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";

const ProtectedRoute = ({ element: Element, ...rest }) => {
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    return (
        <Fragment>
            {loading === false && (
                <Routes>
                    <Route
                        {...rest}
                        render={(props) => {
                            if (isAuthenticated === false) {
                                return <Navigate to="/login" replace={true} />;

                            }
                            //using replace keyword ,in stack current page will not be added which is good user experince
                            //after login if he click back button then it will show again
                            //but in account component ,we have to write because that will replace login page


                            // if (isAdmin === true && user.role !== "admin") {
                            //     return <Redirect to="/login" />;
                            // }
                            return <Element {...props} />;
                        }}
                    />
                </Routes>
            )}
        </Fragment>
    );
};

export default ProtectedRoute;
