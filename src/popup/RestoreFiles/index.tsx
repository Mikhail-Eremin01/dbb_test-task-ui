import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./styles.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restoreFile } from "../../services/restoreFiles";
import { Button, Spinner } from '@chakra-ui/react'

interface LocationState {
    accessToken: string
    paths: string[]
}

const RestoreFiles: React.FC = () => {
    const [isBtnDisabled, setIsBtnDisabled] = React.useState<boolean>(false);
    const location = useLocation();
    const navigate = useNavigate();
    const locationState = location.state as LocationState;
    const client = useQueryClient();

    const { mutate: restoreFilesMutation, error } = useMutation({
        mutationFn: () => restoreFile(locationState?.accessToken, locationState?.paths),
        async onSuccess() {
            await client.invalidateQueries({ queryKey: ['folders'] });
            await client.invalidateQueries({ queryKey: ['deletedfolders'] });
            setIsBtnDisabled(false);
            navigate(location.pathname + location.search);
        },
        onError() {
            setIsBtnDisabled(false);
        },
    });

    const restoreFiles = () => {
        setIsBtnDisabled(true);
        restoreFilesMutation()
    };

    return (
        <div className="restore-files__container">
            <div className="restore-files__title">Are you sure you want to restore this file?</div>
            <div className="restore-files__divider"></div>
            <div className="restore-files__button-container">
                <Button
                    className="restore-files__btn"
                    onClick={restoreFiles}
                    isDisabled={isBtnDisabled}
                >
                    {
                        isBtnDisabled ?
                        <><Spinner size='sm' /> Loading</> :
                        "Restore"
                    }
                </Button>
            </div>
        </div>
    );
};

export default RestoreFiles;
