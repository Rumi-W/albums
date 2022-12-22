import React from 'react'
import Typography from '@material-ui/core/Typography'

const AlbumInfo = ({ image, artistFull, titleFull, price, releaseDate, link }) => {
    return (
        <div className="album-info-content">
            <div>
                <img alt="cover" src={image} />
            </div>
            <Typography align="center" gutterBottom variant="h5" component="div">
                {artistFull}
            </Typography>
            <Typography align="center" gutterBottom variant="h5" component="div">
                {titleFull}
            </Typography>
            <Typography variant="subtitle1" component="div">
                Price: {price}
            </Typography>
            <Typography variant="subtitle1" component="div">
                Release: {releaseDate}
            </Typography>
            <a className="album-link" href={link} target="_blank" rel="noreferrer">
                Go to Music
            </a>
        </div>
    )
}

export default AlbumInfo
