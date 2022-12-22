import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogActions from '@material-ui/core/DialogActions'
import MuiDialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
import { useTheme, withStyles } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const CustomModalDialog = withStyles((theme) => ({
    container: {
        alignItems: 'center',
    },
    root: {
        [theme.breakpoints.only('xs')]: {
            width: '100%',
            height: '98%',
            '@media (orientation: landscape)': {
                height: '90%',
            },
        },
    },
    paper: {
        width: '50%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
            width: '60%',
        },
        [theme.breakpoints.down('sm')]: {
            width: '80%',
        },
        [theme.breakpoints.only('xs')]: {
            width: '100%',
            height: 'auto',
            minHeight: '350px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '@media (orientation: landscape)': {
                height: '90%',
            },
        },
    },
}))(Dialog)

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        width: '90%',
        [theme.breakpoints.only('xs')]: {
            '@media (orientation: landscape)': {
                marginTop: '20px',
            },
        },
    },
}))(MuiDialogContent)

const DialogActions = withStyles((theme) => ({
    root: {
        width: '90%',
        margin: 0,
        padding: theme.spacing(1, 2),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
}))(MuiDialogActions)

const Transition = React.forwardRef((props, ref) => {
    return <Slide direction="up" ref={ref} {...props} />
})

const ModalDialog = ({ open, closeModal, children }) => {
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.only('xs'))

    return (
        <div>
            <CustomModalDialog fullScreen={fullScreen} open={open} TransitionComponent={Transition} maxWidth="lg">
                <DialogContent dividers>{children}</DialogContent>
                <DialogActions>
                    <Button onClick={closeModal} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </CustomModalDialog>
        </div>
    )
}

export default ModalDialog
