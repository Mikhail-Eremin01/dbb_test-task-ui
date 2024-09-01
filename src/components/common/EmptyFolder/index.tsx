import React, { useState } from "react"
import { FileUploader } from "react-drag-drop-files"
import "./styles.css";
import { ReactComponent as OopsIcon } from "../../../img/oops.svg";

const EmptyFolder: React.FC = (props) => {


    return (
        <div className="empty-folder-container">
            There are no files in this folder <OopsIcon />
        </div>
    )
}

export default EmptyFolder;