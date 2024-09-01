import { useQuery, UseQueryResult } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDeletedFiles } from "../../services/getDeletedFiles";
import './styles.css'
import { IDeletedItem } from "../../interfaces";

const ItemDisplay = React.lazy(() => import('./ItemDisplay'))
const EmptyFolder = React.lazy(() => import('../../components/common/EmptyFolder'))
const Wrapper = React.lazy(() => import('../../components/common/Wrapper'))
const Preloader = React.lazy(() => import('../../components/common/Preloader'))

const DeletedFiles: React.FC = () => {
	const navigate = useNavigate();
	const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
	const access_token = urlParams.get("access_token") || localStorage.getItem("access_token");
	const [showBtnRemoveObject, setShowBtnRemoveObject] = useState<string>("")
	const { '*': restOfPath } = useParams();
	const pathSegments = restOfPath?.split('/') || [];
	const folder = pathSegments[pathSegments.length - 1];
	
	const { data, isLoading, error }: UseQueryResult<IDeletedItem[], Error> = useQuery({
		queryFn: () => getDeletedFiles(access_token || "", restOfPath),
		queryKey: ["deletedfolders", folder],
		retry: 1
	});

	useEffect(() => {
		if (
			error?.message === "Access token is required" ||
			error?.message === "Access token is invalid or expired" ||
			error?.message === "Error checking token validity"
		) {
			navigate('/login');
		}
	},[error])

	if (isLoading) {
		return <Preloader />;
	}

	return(
		<Wrapper>
			<div className="deleted-files__main-container">
				{
					data?.length === 0 ?
					<EmptyFolder /> :
					data?.map(elem => {
						const isFolder = elem.type === "folder";
						return (
							<ItemDisplay
								isFolder={isFolder}
								setShowBtnRemoveObject={setShowBtnRemoveObject}
								elem={elem}
								showBtnRemoveObject={showBtnRemoveObject}
								access_token={access_token} 
							/>
						)
					})
				}
			</div>
		</Wrapper>
	)
};

export default DeletedFiles;
