import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"

const Preloader = React.lazy(() => import('../../components/common/Preloader'))

const Auth: React.FC = () => {
	const navigate = useNavigate();
	const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
	const access_token = urlParams.get("access_token") || localStorage.getItem("access_token");

	useEffect(() => {
		if (access_token) {
			localStorage.setItem("access_token", access_token)
			navigate('/all-files')
		} else {
			navigate('/login')
		}
	}, [access_token]);

	return (
		<Preloader />
	);
};

export default Auth;
