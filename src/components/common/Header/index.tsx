import React, { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useMediaQuery } from 'react-responsive';
import 'react-tooltip/dist/react-tooltip.css'
import { Tooltip } from 'react-tooltip'

import { ReactComponent as VideoIcon } from "../../../img/video.svg";
import { ReactComponent as BoxIcon } from "../../../img/box.svg";
import { ReactComponent as PhotoIcon } from "../../../img/photo.svg";
import { ReactComponent as DocsIcon } from "../../../img/docs.svg";
import { ReactComponent as DeletedFilesIcon } from "../../../img/deleted-files.svg";

import { Button } from "@chakra-ui/react";

import './styles.css'
import useOnClickOutside from '../../hooks/useOnClickOutside';

const Header: React.FC = () => {
    const navigate = useNavigate();
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 625.98px)' })
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const menuRef = useRef<HTMLDivElement | null>(null)
    useOnClickOutside(menuRef, () => setIsMenuOpen(false))
    
    const tabs = [
        {value: "All files", path: "/all-files", icon: <BoxIcon />, implemented: true},
        {value: "Deleted files", path: "/deleted-files", icon: <DeletedFilesIcon />, implemented: true},
        {value: "Photos", path: "/photos", icon: <PhotoIcon />, implemented: false},
        {value: "Docs", path: "/documents", icon: <DocsIcon />, implemented: false},
        {value: "Videos", path: "/videos", icon: <VideoIcon />, implemented: false},
    ]

    const logout = () => {
        localStorage.removeItem('access_token')
        navigate('/login')
    }

    return (
        <div className="header">
            {isMenuOpen && isTabletOrMobile && <div className='header__overlay' />}
            <Tooltip id="my-tooltip" style={{ maxWidth:"120px", zIndex: 10 }}/>
            <div className="header__top">
                {!isTabletOrMobile && 
                    <div className="header__menu">
                        {tabs.map((el, i) => 
                            <NavLink
                                key={i}
                                className="header__menu-item"
                                to={el?.path}
                                data-tooltip-id="my-tooltip"
                                data-tooltip-content={`${!el?.implemented ? "Not implemented" : "" }`}
                                data-tooltip-place="bottom"
                            >
                                {el['icon']} {el?.value}
                            </NavLink>)
                        }                
                    </div>
                }
                { isTabletOrMobile && 
                    <div onClick={() => setIsMenuOpen(!isMenuOpen)} className='header__burger-btn'>
                        <span className='header__burger-btn-line'/>
                    </div>
                }
                {
                    isMenuOpen && isTabletOrMobile &&
                    <div ref={menuRef} className="header__burger-menu-wrapper">
                        <div className='header__burger-menu' onClick={ e => e.stopPropagation() } >
                            <div className="header__burger-menu-list">
                                {tabs.map((el, i) => 
                                    <NavLink
                                        key={i}
                                        className="header__menu-item"
                                        to={el?.path}
                                        data-tooltip-id="my-tooltip"
                                        data-tooltip-content={`${!el?.implemented ? "Not implemented" : "" }`}
                                        data-tooltip-place="bottom"
                                    >
                                        {el['icon']} {el?.value}
                                    </NavLink>)
                                }
                            </div>
                        </div>
                    </div>
                }
                <Button
                    onClick={() => logout()}
                    className="logout__btn"
                >
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default Header