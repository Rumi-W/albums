import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { makeStyles } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import HeartIconFilled from '@material-ui/icons/Favorite'
import HeartIcon from '@material-ui/icons/FavoriteBorder'

import { AlbumModal } from '../Modal'
import { addFavoriteAlbum, removeFavoriteAlbum, toggleFavorite } from '../store/actions'

const useStyles = makeStyles((theme) => ({
    listItemWrap: {
        height: '97%',
        width: '100%',
    },
    contentWrap: {
        height: '100%',
        width: '100%',
        display: 'flex ',
        flexDirection: 'row',
    },
    root: {
        padding: 0,
        width: '100%',
        height: '100%',
        border: '1px #e2e2e2 solid',
        boxShadow: 'none',
        borderRadius: 0,
        '&:hover': {
            backgroundColor: 'rgba(230, 246, 247, 0.7)',
        },
        '&:focus, &:active, &.active': {
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
            backgroundColor: 'rgb(230, 246, 247)',
            webkitTransform: 'scale(0.99)',
            mozTtransform: 'scale(0.99)',
            oTransform: 'scale(0.99)',
            transform: 'scale(0.99)',
        },
    },
    contentWrapInner: {
        height: '100%',
        display: 'flex ',
        flexDirection: 'row',
    },
    media: {
        width: '100%',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(0, 2),

        textOverflow: 'ellipsis',
        [theme.breakpoints.only('xs')]: {
            display: 'flex ',
            flexDirection: 'column',
            width: '100%',
            height: '70%',
        },
    },
    albumTitle: {
        fontWeight: 700,
        fontSize: '1.2rem',
        [theme.breakpoints.only('xs')]: {
            fontSize: '0.9rem',
        },
    },
    link: {
        display: 'block',
        [theme.breakpoints.only('xs')]: {
            display: 'none',
        },
    },
    action: {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'flex-start',
        [theme.breakpoints.only('xs')]: {
            paddingRight: theme.spacing(2),
        },
    },
    icon: {
        padding: 0,
    },
    heartIconFilled: {
        color: 'red',
    },
}))

const AlbumListItem = ({ item, selected, maxImgHeight, showAlbumInfo }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [openModal, setOpenModal] = useState(false)
    const isScreenLgUp = useMediaQuery({ query: '(min-width: 1280px)' })

    const handleClickFavorite = useCallback(
        (e) => {
            e.stopPropagation()
            if (item.id === '') return

            if (item.selected) {
                dispatch(removeFavoriteAlbum(item.id))
            } else {
                const itemCopy = { ...item }
                itemCopy.selected = true
                dispatch(addFavoriteAlbum(itemCopy))
            }
            dispatch(toggleFavorite(item.id))
        },
        [item, dispatch]
    )

    const handleClickFavorite2 = (e) => {
        e.stopPropagation()
        if (item.id === '') return

        if (item.selected) {
            dispatch(removeFavoriteAlbum(item.id))
        } else {
            const itemCopy = { ...item }
            itemCopy.selected = true
            dispatch(addFavoriteAlbum(itemCopy))
        }
        dispatch(toggleFavorite(item.id))
    }

    const handleCardClick = () => {
        if (!isScreenLgUp) {
            setOpenModal((prev) => !prev)
        } else {
            showAlbumInfo(item)
        }
    }

    const closeModal = () => {
        setOpenModal(false)
    }

    return (
        <div className={classes.listItemWrap}>
            <Card
                className={classes.root}
                onClick={handleCardClick}
                style={{ backgroundColor: selected ? 'rgb(230, 246, 247)' : 'none' }}>
                <Grid container className={classes.contentWrap}>
                    <Grid item xs={10} sm={9} className={classes.contentWrapInner}>
                        <CardMedia
                            className={classes.media}
                            style={{ height: maxImgHeight, width: maxImgHeight }}
                            component="img"
                            alt="Cover Image"
                            title="Cover Image"
                            image={item.image}
                        />
                        <CardContent classes={{ root: classes.content }}>
                            <Typography className={classes.albumTitle} variant="caption">
                                {item.artist}
                            </Typography>
                            <Typography variant="caption">{item.title}</Typography>
                        </CardContent>
                    </Grid>

                    <Grid item xs={2} sm={3}>
                        <CardActions className={classes.action}>
                            <a href={item.link} className={classes.link} target="_blank" rel="noreferrer">
                                Go to Music
                            </a>
                            <IconButton className={classes.icon} onClick={handleClickFavorite}>
                                {item.selected ? (
                                    <HeartIconFilled className={classes.heartIconFilled} />
                                ) : (
                                    <HeartIcon />
                                )}
                            </IconButton>
                        </CardActions>
                    </Grid>
                </Grid>
            </Card>
            {openModal && (
                <AlbumModal
                    openModal={openModal}
                    image={item.image}
                    link={item.link}
                    selected={item.selected}
                    artistFull={item.artistFull}
                    titleFull={item.titleFull}
                    price={item.price}
                    releaseDate={item.releaseDate}
                    closeModal={closeModal}
                    handleClickFavorite={handleClickFavorite}
                />
            )}
        </div>
    )
}

export default AlbumListItem
