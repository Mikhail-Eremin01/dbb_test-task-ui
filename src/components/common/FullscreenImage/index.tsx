import React from 'react'

import './styles.css'

interface IFullscreenImageProps {
    url: string
    onClose(): void
}

type ImageRef = HTMLImageElement | null

const FullscreenImage = React.forwardRef<ImageRef, IFullscreenImageProps>((props, ref) => {
    return (
        <div className="fullscreen-image">
            <img ref={ref} className="fullscreen-image__image" src={props.url} alt="" />
            <div className="fullscreen-image__close" onClick={ () => props.onClose()}></div>
        </div>
    )
})

export default FullscreenImage
