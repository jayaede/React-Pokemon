import pdffile from './OfferLetter-Infy.pdf';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import React, { useState } from 'react';
import './pdf.css'
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import ArrowLeftRoundedIcon from '@mui/icons-material/ArrowLeftRounded';
import ArrowRightRoundedIcon from '@mui/icons-material/ArrowRightRounded';
import ZoomOutRoundedIcon from '@mui/icons-material/ZoomOutRounded';
import ZoomInRoundedIcon from '@mui/icons-material/ZoomInRounded';
import ZoomOutMapRoundedIcon from '@mui/icons-material/ZoomOutMapRounded';
import HeightRoundedIcon from '@mui/icons-material/HeightRounded';

function Displaypdf() {
    const [numPages, setNumPages] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(0.7);
    const [paginated, setPDFPaginated] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <div >
            <div className="Card">
                <fieldset className='content'>
                    <div className='header'>
                        {paginated && numPages > 1 &&
                            <div style={{ display: 'flex' }}>
                                <button disabled={currentPage === 1} className="button" variant={'outlined'} color="primary" size="small" onClick={() => setCurrentPage(1)}>
                                    <SkipPreviousRoundedIcon fontSize={'medium'} />
                                </button>
                                <button disabled={currentPage === 1} className="button" variant={'outlined'} size="small" color="primary">
                                    <ArrowLeftRoundedIcon onMouseDown={() => setCurrentPage(currentPage - 1)} fontSize={'medium'} />
                                </button>
                                <div style={{ marginTop: "2px", marginRight: "5px" }}>
                                    Page {currentPage}/{numPages}
                                </div>
                                <button disabled={currentPage >= numPages} className="button" variant={'outlined'} size="small" color="primary" onClick={() => setCurrentPage(currentPage + 1)}>
                                    <ArrowRightRoundedIcon fontSize={'medium'} />
                                </button>
                                <button className="button" variant={'outlined'} size="small" color="primary" onClick={() => setCurrentPage(numPages)}>
                                    <SkipNextRoundedIcon fontSize={'medium'} />
                                </button>
                            </div>
                        }
                        <div style={{ display: 'flex', marginLeft: '20px' }}>
                            <button className="button" variant={'outlined'} size="small" color="primary" onClick={() => setZoomLevel(zoomLevel - 0.1)}>
                                <ZoomOutRoundedIcon />
                            </button>
                            <button className="button" variant={'outlined'} size="small" color="primary" onClick={() => setZoomLevel(zoomLevel + 0.1)}>
                                <ZoomInRoundedIcon />
                            </button>
                            <button className="button" variant={'outlined'} size="small" color="primary" onClick={() => setZoomLevel(0.7)}>
                                <ZoomOutMapRoundedIcon />
                            </button>
                            {numPages > 1 && (
                                <button className="button" variant={'outlined'} size="small" color="primary" onClick={() => setPDFPaginated(!paginated)} >
                                    <HeightRoundedIcon style={{ transform: `${paginated ? "rotate(90deg)" : ""}` }}/>
                                </button>
                            )}
                        </div>
                    </div>
                </fieldset>
                <hr />
                <fieldset className='content'>
                    <div>
                        <Document file={pdffile} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
                            {!paginated && (
                                Array.apply(null, Array(numPages))
                                    .map((x, i) => i + 1)
                                    .map(page =>
                                        <Page width={1165} scale={zoomLevel} pageNumber={page} />
                                    )
                            )}
                            {paginated && (
                                <Page width={1165} scale={zoomLevel} pageNumber={currentPage} />
                            )}

                        </Document>
                    </div>
                </fieldset>
            </div >
        </div >
    )
}
export default Displaypdf