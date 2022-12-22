import React from 'react'
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import HeartIconFilled from '@material-ui/icons/Favorite'
import HeartIcon from '@material-ui/icons/FavoriteBorder'

import ModalDialog from './ModalDialog'

const useStyles = makeStyles((theme) => ({
    card: {
        [theme.breakpoints.up('sm')]: {
            paddingTop: '4px',
            '&:last-child': {
                paddingBottom: 0,
            },
        },
    },
    cardWrap: {
        height: '100%',
        width: '100%',
        display: 'flex ',
        flexDirection: 'row',
        boxShadow: 'none',
        [theme.breakpoints.only('xs')]: {
            height: '90%',
            flexDirection: 'column',
            alignItems: 'center',
            '@media (orientation: landscape)': {
                marginTop: '20px',
                height: 'auto',
            },
        },
    },
    media: {
        width: '180px',
        height: '180px',
    },
    albumTitle: {
        fontWeight: 700,
        fontSize: '1.2rem',
        [theme.breakpoints.only('xs')]: {
            fontSize: '0.9rem',
        },
    },
    icon: {
        position: 'absolute',
        right: 1,
        top: 0,
    },
    heartIconFilled: {
        color: 'red',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
}))

const AlbumModal = ({
    handleClickFavorite,
    closeModal,
    openModal,
    image,
    link,
    selected,
    artistFull,
    titleFull,
    price,
    releaseDate,
}) => {
    const classes = useStyles()

    const handleClickHeartIcon = (e) => {
        e.preventDefault()
        handleClickFavorite(e)
    }

    return (
        <ModalDialog open={openModal} closeModal={closeModal}>
            <Card className={classes.cardWrap}>
                <CardMedia
                    className={classes.media}
                    component="img"
                    alt="Cover Image"
                    title="Cover Image"
                    image={image}
                />
                <IconButton className={classes.icon} onClick={handleClickHeartIcon}>
                    {selected ? <HeartIconFilled className={classes.heartIconFilled} /> : <HeartIcon />}
                </IconButton>

                <CardContent classes={{ root: classes.card }}>
                    <div className={classes.content}>
                        <div>
                            <Typography className={classes.albumTitle} variant="h4">
                                {artistFull}
                            </Typography>
                            <Typography variant="body1">{titleFull}</Typography>
                        </div>
                        <div>
                            <Typography variant="body2">
                                Price: {price}; Release date: {releaseDate}
                            </Typography>
                            <a href={link} target="_blank" size="small" color="primary" rel="noreferrer">
                                <Typography variant="body2">Go to Music </Typography>
                            </a>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </ModalDialog>
    )
}

export default AlbumModal
