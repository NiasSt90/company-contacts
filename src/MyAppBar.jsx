import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Switch from "@material-ui/core/Switch";
import RefreshIcon from "@material-ui/icons/Refresh";
import MoreIcon from "@material-ui/icons/MoreVert";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {fade} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from "@material-ui/core/Snackbar";
import {observer} from "mobx-react";
import LinearProgress from "@material-ui/core/LinearProgress";
import {useRoles} from "./hooks/useRoles";

const useStyles = makeStyles(theme => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}))

const MyAppBar = observer(({model, darkState, handleThemeChange}) => {
    const classes = useStyles();
    const {authenticated, login, logout} = useRoles();
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    return <div className={classes.grow}>
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton}
                            color="inherit"><MenuIcon/></IconButton>
                <Typography className={classes.title} variant="h6" noWrap>Versicherungs -
                    Ansprechpartner</Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}><SearchIcon/></div>
                    <InputBase onChange={(e) => model.search(e.target.value)}
                               placeholder="Search…"
                               classes={{
                                   root: classes.inputRoot,
                                   input: classes.inputInput,
                               }}
                    />
                </div>
                <div className={classes.grow}/>
                <div className={classes.sectionDesktop}>
                    <Switch checked={darkState} onChange={handleThemeChange}/>
                    <IconButton edge="end" onClick={() => model.load()} color="inherit"><RefreshIcon/></IconButton>
                    {!authenticated() && <IconButton edge="end" onClick={() => login()} color="inherit"><LockOpenIcon/></IconButton>}
                    {authenticated() && <IconButton edge="end" onClick={() => logout()} color="inherit"><LockIcon/></IconButton>}
                </div>
                <div className={classes.sectionMobile}>
                    <IconButton onClick={handleMobileMenuOpen} color="inherit">
                        <MoreIcon/>
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
        {model.state === "pending" && <LinearProgress variant="indeterminate" color="secondary" />}
        <Snackbar
            open={model.messageState}
            onClose={() => model.resetMessageState()}
            autoHideDuration={6000}>
            <MuiAlert elevation={6} variant="filled" onClose={() => model.resetMessageState()} severity={model.messageSeverity}>
                {model.message ? model.message.toString() : ""}
            </MuiAlert>
        </Snackbar>
    </div>
})

export default MyAppBar;