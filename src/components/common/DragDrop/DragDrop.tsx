import React, { ReactElement, useState } from "react"
import { FileUploader } from "react-drag-drop-files"
import { JsxElement } from "typescript"
import { convertFileToBase64 } from "../../../misc/common";


interface IDragDrop {
    children: ReactElement
    multiple?: boolean
    classes?: string
    types?: string[]
    handleChange: Function
    sizeError?: Function
    maxSize?: number
}

const DragDrop: React.FC<IDragDrop> = (props) => {
    const [fileAdded, setFileAdded] = useState(null);

    const addFile = async(file: File) => {
        props.handleChange(file)
        setFileAdded(null)
    }

    return (
        <FileUploader
            maxSize = {props.maxSize}
            fileOrFiles={fileAdded}
            handleChange={addFile}
            name="file"
            multiple={props.multiple}
            types={props.types}
            children={props.children}
            onSizeError = {props.sizeError}
            classes = {props.classes}
        />
    )
}

export default DragDrop;