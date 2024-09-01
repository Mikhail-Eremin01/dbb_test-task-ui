import React, { useState } from "react";
import { useLocation } from "react-router-dom";

import "./styles.css";
import { Page, Document, pdfjs  } from "react-pdf";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//     'pdfjs-dist/legacy/build/pdf.worker.min.mjs',
//     import.meta.url,
// ).toString();

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.mjs',
    import.meta.url,
    ).toString();

interface LocationState {
    base64File: string
    type: "pdf" | "jpeg" | "png" | "jpg"
    name: string
}

const ShowFile: React.FC = () => {
    const location = useLocation();
    const locationState = location.state as LocationState;
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const regex = /^data:image\/PDF;base64,dataapplication\/pdfbase64/;
    const updatedPdf = `${locationState?.base64File?.replace(regex, '')}`

    function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
      setNumPages(numPages);
    }
    
    return (
        <div className="">
            {
                locationState?.type === "pdf" ?
                <div className="show-file__pdf">
                    <Document file={`data:application/pdf;base64,${updatedPdf}`} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document>
                    <p>
                        Page {pageNumber} of {numPages}
                    </p>
                </div> :
                <div className="show-file__img-container">
                    <img
                        src={locationState.base64File}
                        alt={locationState.name}
                        className="show-file__img"
                    />
                </div>
            }
        </div>
    );
};

export default ShowFile;
