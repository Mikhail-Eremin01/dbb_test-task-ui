import React from "react";
import "./styles.css";
import { Button } from "@chakra-ui/react";


const Login: React.FC = () => {
	const handleAuth = () => window.location.href = "http://localhost:4000/auth";

	return (
		<div className="authorization__container">
			<p className="authorization__title">Please, log in via Dropbox</p>
			<Button
				onClick={() => handleAuth()}
				className="back-to-main-page__btn"
			>
				Authorize with Dropbox
			</Button>
		</div>
	);
};

export default Login;
