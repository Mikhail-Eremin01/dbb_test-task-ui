import React from "react";
import './styles.css'
import { Spinner } from '@chakra-ui/react'

const Preloader: React.FC = () => {
	return(
		<div className="preloader-container">
			<Spinner
				color='#A0C4FF'
				size='xl'
				speed='0.75s'
			/>
		</div>
	)
};

export default Preloader;