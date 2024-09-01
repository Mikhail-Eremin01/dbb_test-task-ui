import React from "react";
import { useNavigate } from "react-router-dom";
import './styles.css'

import { ReactComponent as OopsIcon } from "../../../img/oops.svg";
import { Button } from "@chakra-ui/react";

const BackToMainPage: React.FC = () => {
	const navigate = useNavigate();

	return(
		<div className="back-to-main-page__container">
			<OopsIcon />
			<Button
				onClick={() => navigate("/all-files")}
				className="back-to-main-page__btn"
			>
				Back to the main page
			</Button>
		</div>
	)
};

export default BackToMainPage;