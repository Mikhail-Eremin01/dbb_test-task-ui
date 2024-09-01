import React from "react"
import DragDrop from "../DragDrop/DragDrop";
import './styles.css'
import { convertFileToBase64 } from "../../../misc/common";
import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { uploadFile } from "../../../services/uploadFiles";
import TemporaryMessage from "../TemporaryMessage";
import { Spinner } from "@chakra-ui/react";

interface IFilesUploader {
    accessToken: string
    paths: string[]
}
const maxFileSize = 5000000

const FilesUploader: React.FC<IFilesUploader> = ({ accessToken, paths }) => {
    const fileTypes = ["JPG", "PNG", "JPEG", "PDF", "GIF"]
    const [isFileError, setIsFileError] = React.useState<string>("")
    
    const client = useQueryClient();
    type UploadParams = {
        accessToken: string;
        paths: string[];
        base64Files: string[];
        name: string
    };

    type UploadError = {
        message: string;
    };

    const { mutate: uploadFilesMutation, error, status }: 
    UseMutationResult<void, UploadError, UploadParams> = useMutation<void, UploadError, UploadParams>({
        mutationFn: ({ accessToken, paths, base64Files, name }) => uploadFile(accessToken, paths, base64Files, name),
        async onSuccess() {
            await client.invalidateQueries({ queryKey: ['folders'] });
        },
        onError(error) {
            if(error?.message === "this file exists at such path") {
                setIsFileError("this file exists at such path")
            }
        },
    });

    const upload = async (files: File) => {
        const arrayOfFiles = [files]
        const normalSizeOfFiles = arrayOfFiles.every(el => {
            return el.size < maxFileSize
        })
        if(!normalSizeOfFiles) {
            setIsFileError("The maximum file size is 5 MB.")
        } else {
            const base64File = await convertFileToBase64(arrayOfFiles[0]);

            setIsFileError("")
            uploadFilesMutation({
                accessToken,
                paths,
                base64Files: [base64File],
                name: arrayOfFiles[0].name
            })
        }
        
    }

    const children_DragDrop = 
    <div className='files-uploader__dragdrop-container'>
        <div className='files-uploader__dragdrop-text'>
            <p className='files-uploader__dragdrop-title'>
                <span className='files-uploader__dragdrop-title-click'> Select a file</span> or drag it here
            </p>
            <p className='files-uploader__dragdrop-subtitle'>Support png, jpeg, jpg, gif or pdf files <span style={{textDecoration: "underLine"}}>up to 5 MB.</span></p>
        </div>
    </div>

    return (
            <div className='files-uploader'>
                <div className="files-uploader__subtitle">
                    {
                        status === "pending" ?
                        <div className="files-uploader__subtitle-loading">
                            <div>File is loading</div> 
                            <Spinner
                                color='#A0C4FF'
                                size='md'
                                speed='0.75s'
                            />
                        </div> : 
                        status === "success" ?
                        <TemporaryMessage /> :
                        ""
                    }
                </div>
                <DragDrop
                    handleChange={upload}
                    multiple = {false}
                    types = {fileTypes}
                    children = {children_DragDrop}
                />
                {
                    isFileError &&
                    <div className='files-uploader__alert-size-error'>
                        <div>*</div>
                        <div className='files-uploader__alert-size-error-text'>
                            <div>{isFileError}</div>
                        </div>
                    </div>
                }
            </div>
    )
}

export default FilesUploader;