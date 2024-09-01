import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { ChakraProvider } from '@chakra-ui/react'
import Auth from "./pages/Auth";

const CreateFolder = React.lazy(() => import("./popup/CreateFolder"));
const DeleteObject = React.lazy(() => import("./popup/DeleteFiles"));
const RestoreFiles = React.lazy(() => import("./popup/RestoreFiles"));
const ShowFile = React.lazy(() => import("./popup/ShowFile"));

const Preloader = React.lazy(() => import("./components/common/Preloader"));

const Photos = React.lazy(() => import("./pages/Photos"));
const Documents = React.lazy(() => import("./pages/Documents"));
const Videos = React.lazy(() => import("./pages/Videos"));
const Login = React.lazy(() => import("./pages/Login"));
const AllFiles = React.lazy(() => import("./pages/AllFiles"));
const DeletedFiles = React.lazy(() => import("./pages/DeletedFiles"));

const Popup = React.lazy(() => import("./components/common/Popup"));

const App: React.FC = () => {

	return (
		<div className="App">
            <ChakraProvider>
                <BrowserRouter>
                    <React.Suspense fallback={<Preloader />}>
                        <Routes>
                            <Route
                                path={"/"}
                                element={<Auth />}
                            />
                            <Route
                                path={"/all-files"}
                                element={<AllFiles />}
                            />
                            <Route
                                path={"all-files/*"}
                                element={<AllFiles />}
                            />
                            <Route
                                path={"/deleted-files"}
                                element={<DeletedFiles />}
                            />
                            <Route
                                path={"/deleted-files/*"}
                                element={<DeletedFiles />}
                            />
                            <Route
                                path={"/login"}
                                element={<Login />}
                            />
                            <Route
                                path={"/videos"}
                                element={<Videos />}
                            />
                            <Route
                                path={"/photos"}
                                element={<Photos />}
                            />
                            <Route
                                path={"/documents"}
                                element={<Documents />}
                            />
                        </Routes>
                    </React.Suspense>
                    <Location />
                </BrowserRouter>
            </ChakraProvider>
		</div>
	);
};

const Location: React.FC = () => {
    const location = useLocation();

    const renderPopup = (hash) => {
        switch (hash) {
            case "#delete-object":
                return <div><DeleteObject /></div>;
            case "#restore-file":
                return <div><RestoreFiles /></div>;
            case "#show-file":
                return <div><ShowFile /></div>;
            case "#create-folder":
                return <div><CreateFolder /></div>;
            default:
                return "";
        }
    };
    const hashList = [
        "#delete-object",
        "#restore-file",
        "#show-file",
        "#create-folder"
    ];

    if (hashList.includes(location.hash)) {
        return (
            <React.Suspense fallback={""}>
                <Popup>
                    {renderPopup(location.hash)}
                </Popup>
            </React.Suspense>
        );
    }

    return <></>;
};

export default App;
