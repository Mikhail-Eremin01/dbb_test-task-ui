import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, FormControl, FormErrorMessage, Spinner } from '@chakra-ui/react'
import "./styles.css";
import { deleteFile } from "../../services/deleteFiles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Input } from '@chakra-ui/react'
import { createNewFolder } from "../../services/createFolder";
import { validateInputCreateFolder } from "../../misc/common";

interface LocationState {
    accessToken: string
    path: string
}

const CreateFolder: React.FC = () => {
    const [isBtnDisabled, setIsBtnDisabled] = useState<boolean>(false);
    const [isInputError, setIsInputError] = useState<boolean>(false);
    // const string = 'Не допускаются следующие символы: < > [ ] \ / : ? * " ' | _ - . , @ ~ !``
    const [value, setValue] = useState('')
    const location = useLocation();
    const navigate = useNavigate();
    const locationState = location.state as LocationState;
    const client = useQueryClient();
    const { mutate: createFolderMutation, error } = useMutation({
        mutationFn: () => createNewFolder(locationState?.accessToken, `${locationState?.path || ""}/${value}` || ""),
        async onSuccess() {
            await client.invalidateQueries({ queryKey: ['deletedfolders'] });
            await client.invalidateQueries({ queryKey: ['folders'] });
            setIsBtnDisabled(false);
        },
        onError() {
            setIsBtnDisabled(false);
        },
    });

    const createFolder = () => {
        setIsBtnDisabled(true);
        if(!validateInputCreateFolder(value)) {
            setIsInputError(true)
        } else {
            setIsInputError(false)
            createFolderMutation()
        }
    };

    return (
        <div className="create-folder__container">
            <div className="create-folder__title">Create a folder</div>
            <div className="create-folder__divider"></div>
            <FormControl isInvalid={isInputError} className="create-folder-input-form">
                <Input
                    isInvalid={isInputError}
                    placeholder='Folder name'
                    value={value}
                    onChange={(event) => setValue(event.target.value)}
                    className="create-folder__input"
                    sx={{
                    "&:focus": {
                        boxShadow: "0 0 0 .5px black",
                        borderColor: "black",
                    }
                    }}
                />
                <FormErrorMessage>
                    Недопустимые символы: &lt; &gt; [ ] \ / : ? * &quot; ' | _ - . , ` @ ~ !
                </FormErrorMessage>
            </FormControl>
            <div className="create-folder__button">
                <Button
                    className="create-folder__btn"
                    onClick={createFolder}
                    isDisabled={isBtnDisabled}
                >
                    {
                        isBtnDisabled ?
                        <><Spinner size='sm' /> Loading</> :
                        "Create"
                    }
                </Button>
            </div>
        </div>
    );
};

export default CreateFolder;
