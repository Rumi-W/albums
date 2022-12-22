import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import AutoSizer from 'react-virtualized-auto-sizer'
import { FixedSizeList } from 'react-window'
import { makeStyles } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import InputBase from '@material-ui/core/InputBase'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'

import { AlbumInfo, AlbumListItem } from '../Album'
import { fetchAlbums, filterAlbums } from '../store/actions'
import { getAlbumItems, getAlbumnPending, getAlbumsSuccess } from '../store/selectors'

import './styles.css'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        paddingTop: theme.spacing(2),
    },
    spinner: {
        width: '100%',
        height: '50vh',
    },
    searchWrap: {
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: theme.spacing(2),
    },
    search: {
        position: 'relative',
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#008fb8',
        zIndex: 4,
    },
    inputRoot: {
        borderRadius: '4px',
        color: 'inherit',
    },
    inputInput: {
        zIndex: 2,
        backgroundColor: 'white',
        padding: theme.spacing(1, 1, 1, 0),
        border: '1px solid #008fb8',
        borderRadius: '4px',
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        '&:hover': {
            borderWidth: '2px',
        },
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}))

const ITEM_HEIGHT = 100

function ErrorFallback({ error, resetErrorBoundary }) {
    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <button type="button" onClick={resetErrorBoundary}>
                Try again
            </button>
        </div>
    )
}

const Albums = () => {
    const dispatch = useDispatch()
    const albumItems = useSelector((state) => getAlbumItems(state))

    const isAlbumsPending = useSelector((state) => getAlbumnPending(state))
    const isAlbumsSuccess = useSelector((state) => getAlbumsSuccess(state))

    const isScreenLgUp = useMediaQuery({ query: '(min-width: 1280px)' })

    const classes = useStyles()
    const [searchKey, setSearchKey] = useState('')
    const [selectedItem, setSelectedItem] = useState((albumItems && albumItems[0]) || {})

    useEffect(() => {
        if (searchKey === '' && !albumItems?.length) {
            dispatch(fetchAlbums())
        }
        /* eslint-disable-next-line */
    }, [])

    useEffect(() => {
        if (albumItems?.length && isScreenLgUp) {
            setSelectedItem((albumItems && albumItems[0]) || {})
        }
    }, [albumItems, isScreenLgUp])

    const showAlbumInfo = useCallback((item) => {
        setSelectedItem(item)
    }, [])

    const debounce = (fn, wait) => {
        let timeout = null

        return (...args) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                fn(...args)
            }, [wait])
        }
    }

    const handleSearch = debounce((key) => {
        dispatch(filterAlbums(key))
    }, 250)

    const handleChange = (e) => {
        const key = e.target.value
        setSearchKey(key)
        handleSearch(key)
    }

    const clearFilter = () => {
        setSearchKey('')
        dispatch(filterAlbums(''))
    }

    // Virtual Window Rows
    // eslint-disable-next-line react/no-unstable-nested-components
    const Rows = React.memo(({ index, style }) => {
        const { id, image, artist, title, link, selected, artistFull, titleFull, price, releaseDate } =
            albumItems[index]

        const item = { id, image, artist, title, link, selected, artistFull, titleFull, price, releaseDate }

        return (
            <div style={{ ...style, width: '100%' }}>
                <AlbumListItem
                    item={item}
                    selected={(selectedItem && selectedItem.id === item.id) || false}
                    maxImgHeight={ITEM_HEIGHT}
                    showAlbumInfo={showAlbumInfo}
                />
            </div>
        )
    })

    return isAlbumsPending && !isAlbumsSuccess ? (
        <Grid container justifyContent="center" alignItems="center" classes={{ root: classes.spinner }}>
            <CircularProgress color="primary" />
        </Grid>
    ) : (
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
            <div>
                <Grid container justifyContent="center" classes={{ root: classes.root }}>
                    <Grid item xs={12}>
                        <div className="page-top-link">
                            <Link className="link" to="/favorites?type=list">
                                Favorite Albums
                            </Link>
                        </div>
                    </Grid>
                    <Grid item xs={12} className="page-title">
                        <div>
                            <Typography variant="h3" align="center" component="div">
                                Top 100 Albums
                            </Typography>
                            <Typography variant="h6" align="center" color="textSecondary" component="div">
                                List in Virtual Window
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} className={classes.searchWrap}>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                onChange={handleChange}
                                value={searchKey}
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <Button size="small" variant="outlined" onClick={clearFilter}>
                            Clear
                        </Button>
                    </Grid>
                </Grid>

                <Grid container spacing={2} className="albums-wrap">
                    {!albumItems ||
                        (albumItems?.length === 0 && (
                            <Grid item xs={12} sm={10} md={8} lg={6} className="albums-list">
                                <Typography variant="h6" align="center">
                                    No items
                                </Typography>
                            </Grid>
                        ))}
                    {albumItems && albumItems.length > 0 && (
                        <Fragment>
                            <Grid item xs={12} sm={10} md={8} lg={6} className="albums-list">
                                <AutoSizer>
                                    {({ height, width }) => (
                                        <FixedSizeList
                                            className="List"
                                            height={height}
                                            itemCount={albumItems.length}
                                            itemSize={ITEM_HEIGHT}
                                            width={width}>
                                            {Rows}
                                        </FixedSizeList>
                                    )}
                                </AutoSizer>
                            </Grid>

                            <Hidden mdDown>
                                <Grid item lg={4} className="album-info">
                                    {selectedItem && selectedItem.artist ? (
                                        <AlbumInfo
                                            image={selectedItem.image}
                                            artistFull={selectedItem.artistFull}
                                            titleFull={selectedItem.titleFull}
                                            price={selectedItem.price}
                                            releaseDate={selectedItem.releaseDate}
                                            link={selectedItem.link}
                                        />
                                    ) : (
                                        <div className="album-info-content">
                                            <Typography align="center" gutterBottom variant="h6" component="div">
                                                No item selected
                                            </Typography>
                                        </div>
                                    )}
                                </Grid>
                            </Hidden>
                        </Fragment>
                    )}
                </Grid>
            </div>
        </ErrorBoundary>
    )
}
export default Albums
