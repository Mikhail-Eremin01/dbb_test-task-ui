import { useQuery, UseQueryResult } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDropboxFiles } from "../../services/getAllFiles";
import './styles.css'

import { getFileExtension } from "../../misc/common";
import ItemDisplay from "./ItemDisplay";
import { IFileObject } from "../../interfaces";
import { Button } from "@chakra-ui/react";

const EmptyFolder = React.lazy(() => import('../../components/common/EmptyFolder'))
const FilesUploader = React.lazy(() => import('../../components/common/FilesUploader'))
const Wrapper = React.lazy(() => import('../../components/common/Wrapper'))
const Preloader = React.lazy(() => import("../../components/common/Preloader"));

const AllFiles: React.FC = () => {
	const navigate = useNavigate();
	const { '*': restOfPath } = useParams();
	const pathSegments = restOfPath?.split('/') || [];
	const folder = pathSegments[pathSegments.length - 1];
	const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
	const access_token = urlParams.get("access_token") || localStorage.getItem("access_token");

	const [showBtnRemoveObject, setShowBtnRemoveObject] = useState<string>("")

	useEffect(() => {
		if (access_token) {
			localStorage.setItem("access_token", access_token);
		}
	}, [access_token]);
	
	const { data, isLoading, error }: UseQueryResult<IFileObject[], Error> = useQuery({
		queryFn: () => getDropboxFiles(access_token || "", restOfPath),
		queryKey: ["folders", folder],
		// staleTime: 60000,
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
			<div className="files-container">
				<div className="upload-bar">
					<Button
						onClick={() => navigate("#create-folder", {state: {
							accessToken: access_token,
							path: restOfPath
						}})}
						className="files-create-folder__btn"
						color={'black'}
					>
						Create folder
					</Button>
					<FilesUploader
						accessToken={access_token}
						paths={[restOfPath || ""]} />
				</div>
				<div className="content-area">
					{
						data?.length === 0 ?
						<EmptyFolder /> :
						data?.map(elem => {
							const isFolder = elem[".tag"] === "folder";
							const isPdf = getFileExtension(elem?.name).toLowerCase() === "pdf"
							return (
								<ItemDisplay
									isPdf={isPdf}
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
			</div>
		</Wrapper>
	)
};

export default AllFiles;