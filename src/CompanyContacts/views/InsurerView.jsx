/*@observer*/
import React from "react";
import {observer} from "mobx-react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import IconButton from "@material-ui/core/IconButton";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import ExpansionPanelActions from "@material-ui/core/ExpansionPanelActions";
import Divider from '@material-ui/core/Divider';
import InsuranceClassesView from "./InsuranceClassesView";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import {makeStyles} from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import InsurerEditor from "./InsurerEditor";
import ConfirmDialog from "./ConfirmDialog";
import {useRoles} from "../../hooks/useRoles";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing(1, 1),
    },
    section1: {
        margin: theme.spacing(3, 2),
    },
    section2: {
        margin: theme.spacing(2),
    },
    section3: {
        margin: theme.spacing(3, 1, 1),
        '& pre': {
            whiteSpace: "pre-wrap"
        }
    },
}));

const InsurerView = observer(({model, insurer}) => {
    const classes = useStyles();
    const { isManager } = useRoles();
    const [insurerEditor, openInsurerEditor] = React.useState(false);
    const [deleteInsurerConfirm, setShowDeleteInsurerConfirm] = React.useState(false);

    const takeInsurerValues = (values) => {
        insurer.name = values["name"];
        insurer.address.street = values["street"];
        insurer.address.number = values["number"];
        insurer.address.zipCode = values["zipCode"];
        insurer.address.city = values["city"];
        insurer.hints = values["hints"];
        insurer.imgDataURL = values["imgDataURL"];
    }
    const view = <Card>
        <CardContent>
            <div className={classes.section1}>
                {insurer.imgDataURL && <Typography component="img" src={insurer.imgDataURL}/>}
                {!insurer.imgDataURL && <Typography gutterBottom variant="h5" component="h2">{insurer.name}</Typography>}
            </div>
            <div className={classes.section2}>
                <Typography variant="body2" color="textSecondary" component="p">
                    <strong>{insurer.address.street} {insurer.address.number}</strong><br/>
                    <strong>{insurer.address.zipCode} {insurer.address.city}</strong><br/>
                </Typography>
            </div>
            <Divider variant="middle"/>
            <div className={classes.section3}>
                <Typography component="pre" gutterBottom>{insurer.hints}</Typography>
            </div>
        </CardContent>
        {isManager() && <>
                <CardActions disableSpacing>
                    <IconButton onClick={() => openInsurerEditor(true)}><EditIcon/></IconButton>
                </CardActions>
                <InsurerEditor insurer={insurer} open={insurerEditor} setOpen={openInsurerEditor} onSave={takeInsurerValues}/>
            </>
        }
    </Card>;
    return <div className={classes.root}>
        <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography gutterBottom variant="h5" component="h2">{insurer.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container>
                    <Grid item xs={12} md={6}>{view}</Grid>
                    <Grid item xs={12} md={6}><InsuranceClassesView insurer={insurer}/></Grid>
                </Grid>
            </ExpansionPanelDetails>
            <Divider/>
            {isManager() &&
             <ExpansionPanelActions>
                 <IconButton color="primary" onClick={() => model.save(insurer)}><SaveIcon/></IconButton>
                 <IconButton onClick={() => setShowDeleteInsurerConfirm(true)}><DeleteIcon/></IconButton>
                 <ConfirmDialog title="Versicherer löschen?" open={deleteInsurerConfirm}
                                setOpen={setShowDeleteInsurerConfirm} onConfirm={() => model.remove(insurer)}>
                     Möchten Sie den Versicherer für {insurer.name} wirklisch löschen?
                 </ConfirmDialog>
             </ExpansionPanelActions>
            }
        </ExpansionPanel>
    </div>
});

export default InsurerView;