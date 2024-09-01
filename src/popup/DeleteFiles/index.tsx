import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Spinner } from '@chakra-ui/react'
import "./styles.css";
import { deleteFile } from "../../services/deleteFiles";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface LocationState {
    accessToken: string
    paths: string[]
}

const DeleteFiles: React.FC = () => {
    const [isBtnDisabled, setIsBtnDisabled] = React.useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();
    const locationState = location.state as LocationState;
    const client = useQueryClient();

    const { mutate: deleteFilesMutation, error } = useMutation({
        mutationFn: () => deleteFile(locationState?.accessToken, locationState?.paths),
        async onSuccess() {
            await client.invalidateQueries({ queryKey: ['deletedfolders'] });
            await client.invalidateQueries({ queryKey: ['folders'] });
            setIsBtnDisabled(false);
            navigate(location.pathname + location.search);
        },
        onError() {
            setIsBtnDisabled(false);
        },
    });

    const deleteFiles = () => {
        setIsBtnDisabled(true);
        deleteFilesMutation()
    };

    return (
        <div className="delete-files__container">
            <div className="delete-files__title">Are you sure you want to delete this folder/file?</div>
            <div className="delete-files__divider"></div>
            <div className="delete-files__button">
                <Button
                    className="delete-files__btn"
                    onClick={deleteFiles}
                    isDisabled={isBtnDisabled}
                >
                    {
                        isBtnDisabled ?
                        <><Spinner size='sm' /> Loading</> :
                        "Delete"
                    }
                </Button>
            </div>
        </div>
    );
};

export default DeleteFiles;
