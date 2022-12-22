import React, { memo, useEffect, useRef, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        paddingBottom: theme.spacing(1),
        margin: theme.spacing(1),
    },
    contentWrap: {
        width: '96%',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'hidden',
        justifyContent: 'flex-start',
    },
    contentTop: {
        width: '96%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        [theme.breakpoints.only('xs')]: {
            width: '100%',
            display: 'flex ',
            flexDirection: 'column',
        },
    },
    imageWrap: {
        width: '30%',
        [theme.breakpoints.only('sm')]: {
            width: '60%',
        },
        [theme.breakpoints.only('xs')]: {
            width: '100%',
        },
    },
    image: {
        width: '100%',
        [theme.breakpoints.only('xs')]: {
            width: '100px',
        },
    },
    content: {
        padding: theme.spacing(0, 1),
        width: '70%',
        textOverflow: 'ellipsis',
        [theme.breakpoints.only('xs')]: {
            display: 'none',
        },
    },
    iconFavorite: {
        padding: 0,
        position: 'absolute',
        right: 4,
        top: 4,
        [theme.breakpoints.only('xs')]: {
            position: 'absolute',
            bottom: 4,
            right: 4,
        },
    },
    heartIconFilled: {
        color: 'red',
    },
    albumTitle: {
        fontWeight: 700,
        [theme.breakpoints.only('xs')]: {
            fontSize: '0.9rem',
        },
    },
    actionWrap: {
        padding: theme.spacing(2, 1),
        display: 'flex',
        flexDirection: 'column',
        [theme.breakpoints.only('xs')]: {
            display: 'none',
        },
    },
}))

const Album = ({ item, height, breakpoint }) => {
    const ref = useRef(null)
    const [contentHeight, setContentHeight] = useState(height)
    const [contentWidth, setContentWidth] = useState(null)
    const classes = useStyles()

    useEffect(() => {
        if (ref && ref.current) {
            ref.current.focus()
            setContentHeight(ref.current.parentNode.clientHeight)
        }
    }, [height])

    useEffect(() => {
        if (ref && ref.current) {
            ref.current.focus()
            setContentWidth(ref.current.parentNode.clientWidth)
        }
    }, [breakpoint])

    return (
        <div ref={ref} className={classes.root} style={{ height: contentHeight || 'auto', width: 'auto' }}>
            <div
                className={classes.contentWrap}
                style={{ height: contentHeight ? contentHeight - 10 : 'atuo', width: contentWidth - 10 || 'auto' }}>
                <div className={classes.contentTop}>
                    <div className={classes.imageWrap}>
                        <img className={classes.image} alt="cover" src={item.image} />
                    </div>
                    <div className={classes.content}>
                        <Typography className={classes.albumTitle} variant="body2" component="div">
                            {item.artistFull}
                        </Typography>
                        <Typography variant="body2" component="div">
                            {item.titleFull}
                        </Typography>
                    </div>
                </div>
                <div className={classes.actionWrap}>
                    <Typography variant="body2" component="div">
                        Price: {item.price}
                    </Typography>
                    <Typography variant="body2" component="div">
                        Release: {item.releaseDate}
                    </Typography>
                    <a href={item.link} target="_blank" size="small" color="primary" rel="noreferrer">
                        <Typography variant="body2">Go to Music </Typography>
                    </a>
                </div>
            </div>
        </div>
    )
}

const propEqual = (prevProps, nextProps) =>
    prevProps.item === nextProps.item &&
    prevProps.height === nextProps.height &&
    prevProps.breakpoint === nextProps.breakpoint

const memorizedAlbum = memo(Album, propEqual)

export default memorizedAlbum
