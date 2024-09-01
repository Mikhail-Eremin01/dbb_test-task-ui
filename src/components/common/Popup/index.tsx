import React from "react";
import classNames from "classnames";
import { useReactiveVar } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import useOnClickOutside from "../../hooks/useOnClickOutside";

import "./styles.css";

interface IPopupProps {
    children?: React.ReactNode;
    overflow?: boolean;
}

const Popup: React.FC<IPopupProps> = (props) => {
    const wrapRef = React.useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const isTabletOrMobile = useMediaQuery({ query: "(max-width: 767.98px)" });

    useOnClickOutside(wrapRef, () => close());

    const close = () => {
        navigate(location.pathname + location.search);
    };

    return (
        <div
            className={classNames("popup", {
                "popup--overflow": props?.overflow,
            })}
        >
            <div className="popup__overlay"></div>
            <div
                ref={wrapRef}
                className={"popup__wrap"}
            >
                <div
                    onClick={() => close()}
                    className="popup__close"
                />
                {props.children}
            </div>
        </div>
    );
};

export default Popup;
