import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './styles.css'

import { ReactComponent as DeleteIcon } from "../../../img/delete.svg";
import { ReactComponent as FolderIcon } from "../../../img/test.svg";
import { ReactComponent as RestoreIcon } from "../../../img/restore-icon3.svg";

import { formatFileSize, truncateString } from "../../../misc/common";
import classNames from "classnames";
import { Tooltip } from "react-tooltip";
import { useMediaQuery } from "react-responsive";
import { IDeletedItem } from "../../../interfaces";

interface IItemDisplay {
    isFolder: boolean
	setShowBtnRemoveObject: React.Dispatch<React.SetStateAction<string>>
	elem: IDeletedItem
	showBtnRemoveObject: string
	access_token: string
}

const ItemDisplay: React.FC<IItemDisplay> = ({ isFolder, showBtnRemoveObject, setShowBtnRemoveObject, elem, access_token }) => {	
	const navigate = useNavigate()
	const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1024.98px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 625.98px)' })

	return(
		<div
			onMouseEnter={() => setShowBtnRemoveObject(elem?.path_lower)}
			onMouseLeave={() => setShowBtnRemoveObject("")}
			className="deleted-files__container"
		>
			<Tooltip id="my-tooltip3" style={{ maxWidth:"150px" }} delayHide={10} />
			<Tooltip id="my-tooltip4" delayHide={30} />
			{
				(showBtnRemoveObject === elem?.path_lower || isTabletOrMobile) && !isFolder
				&&
				<div
					data-tooltip-id="my-tooltip4"
					data-tooltip-content={"Restore"}
					data-tooltip-place="left-end"
					data-tooltip-variant="dark"
					className="deleted-files__restore-btn"
					onClick={() => navigate("#restore-file", {
						state: {
							accessToken: access_token,
							paths: [elem?.path_lower]
						},
					})}
				>
					<RestoreIcon/>
				</div>
			}
			<div
				data-tooltip-id="my-tooltip3"
				data-tooltip-content={`${isFolder ? "At the moment you can only restore files located in the main directory" : ""}`}
				data-tooltip-place="left-end"
				data-tooltip-variant="dark"
				className={classNames("deleted-files__icon", {
					"deleted-files__icon--unclickable": isFolder,
				})}
			>
				{
					isFolder ?
					<FolderIcon /> :
					<DeleteIcon />
				}
			</div>
			<div className="deletedFiles_folder_main-description">
				<div className="deleted-files__icon-wrapper">
					{
						isFolder && !isMobile &&
						<FolderIcon />
					}
				</div>
				<div className="deleted-files__info">
					<span className="deleted-files__name">
						{
							isFolder ?
							elem?.name :
							truncateString(elem?.name.split('.').slice(0, -1).join('.'), 10)
						}
					</span>
					<div className="deleted-files__extension">
						<span>
							{
								isFolder ?
								"Folder" :
								elem?.name.split('.').at(-1).toUpperCase()
							}	
						</span>{" "}
						<span>
							{
								!isFolder && 
								<>
									{formatFileSize(elem?.size)}
								</>
							}
						</span>
					</div>
				</div>
			</div>
		</div>
	)
};

export default ItemDisplay;