import React from "react";
import './styles.css'

const Wrapper = React.lazy(() => import('../../components/common/Wrapper'))
const BackToMainPage = React.lazy(() => import("../../components/common/BackToMainPage"));

const Videos: React.FC = () => {
	return(
		<Wrapper>
			<BackToMainPage />
		</Wrapper>
	)
};

export default Videos;