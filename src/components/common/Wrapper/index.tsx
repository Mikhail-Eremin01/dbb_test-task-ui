import React from 'react'

import './styles.css'

const Header = React.lazy(() => import('../Header'))

interface IWrapperProps {
    children?: React.ReactNode
}

const Wrapper: React.FC<IWrapperProps> = props => {
    return (
        <div className="wrapper">
            <Header/>
            <div className="wrapper__content">
                {props.children}
            </div>
        </div>
    )
}

export default Wrapper
