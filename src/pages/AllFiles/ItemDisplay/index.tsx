import { useQuery, UseQueryResult } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { Tooltip } from 'react-tooltip'
import { useNavigate, useParams } from "react-router-dom";
import { getDropboxFiles } from "../../../services/getAllFiles";
import './styles.css'
import 'react-tooltip/dist/react-tooltip.css'

import { ReactComponent as AscIcon } from "../../../img/test.svg";
import { ReactComponent as DeleteIcon } from "../../../img/delete.svg";
import { ReactComponent as PdfIcon } from "../../../img/icon-pdf.svg";

import { countTextFormatter, downloadPDF, formatFileSize, getFileExtension, truncateString } from "../../../misc/common";
import useOnClickOutside from "../../../components/hooks/useOnClickOutside";
import classNames from "classnames";
import { useMediaQuery } from "react-responsive";
import { IFileObject } from "../../../interfaces";

const FullscreenImage = React.lazy(() => import('../../../components/common/FullscreenImage'))

interface IItemDisplay {
    isFolder: boolean
	setShowBtnRemoveObject: React.Dispatch<React.SetStateAction<string>>
	elem: IFileObject
	showBtnRemoveObject: string
	access_token: string
	isPdf: boolean
}

const ItemDisplay: React.FC<IItemDisplay> = ({ isFolder, showBtnRemoveObject, setShowBtnRemoveObject, elem, access_token, isPdf }) => {
	const [image, setImage] = useState<string>('')
	const fullScreenImageRef = React.useRef<HTMLImageElement | null>(null)
    useOnClickOutside(fullScreenImageRef, () => setImage(''))
    const isTablet = useMediaQuery({ query: '(max-width: 1024.98px)' })
    const isMobile = useMediaQuery({ query: '(max-width: 625.98px)' })

	const navigate = useNavigate()
	return(
		<div
			onMouseEnter={() => setShowBtnRemoveObject(elem?.id)}
			onMouseLeave={() => setShowBtnRemoveObject("")}
			className="item-container"
		>
			<Tooltip id="my-tooltip2" style={{ maxWidth:"120px" }}/>
			{ image && <FullscreenImage ref={fullScreenImageRef} url={image} onClose={ () => setImage('') } /> }
			{
				(showBtnRemoveObject === elem?.id || isTablet)
				&&
				<div
					className="btn-delete"
					onClick={() => navigate("#delete-object", {
						state: {
							accessToken: access_token,
							paths: [elem?.path_lower]
						},
					})}
				>
					<DeleteIcon />
				</div>
			}
			<div
				data-tooltip-id="my-tooltip2"
				data-tooltip-content={`${isPdf ? "This file type is available for download only" : ""}`}
				data-tooltip-place="left-start"
				className="item-image"
				onClick={
					() => isFolder ? 
					navigate(`/all-files${elem?.path_lower}`) : 
					!isPdf ?
					setImage(`data:image/${getFileExtension(elem?.name)};base64,${elem.fullImagebase64}`) :
					downloadPDF(elem?.fullImagebase64, elem?.name)
				}
			>
				{
					isFolder ?
					<AscIcon /> :
					isPdf ?
					<PdfIcon /> :
					<img
						src={`data:image/${getFileExtension(elem?.name)};base64,${elem.fullImagebase64}`}
						alt={elem.name}
						className="img"
					/>
				}
			</div>
			<div className="item-description">
				<div className="folder-icon">
					{
						isFolder && !isMobile &&
						<AscIcon />
					}
				</div>
				<div>
					<span>
						{
							isFolder ?
							elem?.name :
							truncateString(elem?.name.split('.').slice(0, -1).join('.'), 10)
						}
					</span>
					<div className="file-info__extension">
						<span>
							{
								isFolder ?
								"Folder" :
								getFileExtension(elem?.name)
							}	
						</span>{" "}
						<span>
							{isFolder && elem?.filesCount}{" "}
							{isFolder && countTextFormatter(elem?.filesCount, ["file", "files", "files"])}
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