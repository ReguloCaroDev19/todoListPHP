import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...props }) => {
	const isAuthenticated = !!localStorage.getItem("csrf_token");

	return isAuthenticated ? (
		<Route {...props} element={<Element />} />
	) : (
		<Navigate to="/login" replace />
	);
};

export default PrivateRoute;
