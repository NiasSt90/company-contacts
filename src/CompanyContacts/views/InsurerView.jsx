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
import {useRoles} from "../../hooks/useRoles";
import {Link} from "react-router-dom";
import {useConfirmation} from "../../utils/ConfirmationService";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Button from "@material-ui/core/Button";
import {FileDocument} from "../model/FileDocument";
import {useStores} from "../../hooks/useStores";
import DocumentUploader from "./DocumentUploader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import InsurerEditor from "./InsurerEditor";
import {useHistory, useLocation} from "react-router";

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

const InsurerView = observer(({insurer, expanded}) => {
    const classes = useStyles();
    const history = useHistory();
    const { documentModel, insurerModel } = useStores();

    const [selectedInsurer, setSelectedInsurer] = React.useState(undefined);
    const confirmInsurerEditDialog = (values) => {
        selectedInsurer.name = values["name"];
        selectedInsurer.address.street = values["street"];
        selectedInsurer.address.number = values["number"];
        selectedInsurer.address.zipCode = values["zipCode"];
        selectedInsurer.address.city = values["city"];
        selectedInsurer.hints = values["hints"];
        selectedInsurer.imgDataURL = values["imgDataURL"];
        selectedInsurer.visibility = values["visibility"];
        setSelectedInsurer(undefined);
    }
    const cancelInsurerEditDialog = () => {
        setSelectedInsurer(undefined);
    }

    const insertOrUpdateInsurer = () => {
        console.log("insertOrUpdateInsurer", insurer);
        if (insurer.id !== undefined) {
            insurerModel.save(insurer);
        }
        else {
            insurerModel.add(insurer).then(insurer => history.push("/insurer/" + insurer.id));
        }
    }

    const { isManager } = useRoles();
    const confirm = useConfirmation();
    const tryToDeleteInsurer = () => {
        confirm({
            variant: "danger",
            title: `Möchten Sie den Versicherer "${insurer.name}" wirklich löschen?`,
            description: "Die Aktion kann nicht rückgängig gemacht werden...."
        }).then(() => insurerModel.delete(insurer)).then(() => history.push("/"));
    };

    const download = (e, id) => {
        e.preventDefault();
        documentModel.download(id);
    }

    //Dokument-ADD
    const [newDocument, setNewDocument] = React.useState(undefined);
    const handleSaveDocument = (document) => {
        insurer.addDocument(document);
        insurerModel.save(insurer);
        setNewDocument(undefined);
    }
    const handleCancelAddDocument = () => {
        setNewDocument(undefined);
    }
    const handleAddDocument = () => {
        let fileDocument = new FileDocument();
        documentModel.selectDocument(fileDocument);
        setNewDocument(fileDocument)
    }
    //Dokument-DELETE
    const tryToDeleteDocument = (document) => {
        confirm({
            variant: "danger",
            title: `Möchten Sie das Dokument ${document.name} wirklich löschen?`,
            description: "Die Aktion kann nicht rückgängig gemacht werden...."
        }).then(() => {
            if (document.id !== undefined) {
                documentModel.delete(document);
            }
            insurer.delDocument(document);
            insurerModel.save(insurer);
        });
    };



    return <div className={classes.root}>
        <ExpansionPanel defaultExpanded={expanded}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography gutterBottom variant="h5" component="h2">{insurer.name}</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
                <Grid container spacing={2} alignItems="stretch" justify="center">
                    <Grid item xs={12} md={6}>
                        <Card elevation={2}>
                            <CardContent>
                                <div className={classes.section1}>
                                    <Link to={{ pathname: "/insurer/" + insurer.id}}>
                                        {insurer.imgDataURL ?
                                          <Typography component="img" src={insurer.imgDataURL}/> :
                                          <Typography gutterBottom variant="h5" component="h2">{insurer.name}</Typography>
                                        }
                                    </Link>
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
                                {insurer.documents.length > 0 && <>
                                    <Divider/>
                                    <List>{insurer.documents.map((doc, i) =>
                                              <ListItem key={i} component={Link} to={"/download/" + doc.id} button onClick={(e) => download(e, doc.id)}>
                                                  <ListItemIcon>
                                                      {"application/pdf" === doc.contentType ? <PictureAsPdfIcon/> : <CloudDownloadIcon/>}
                                                  </ListItemIcon>
                                                  <ListItemText primary={doc.name}/>
                                                  {isManager() && <ListItemSecondaryAction>
                                                      <IconButton edge="end" onClick={() => tryToDeleteDocument(doc)}><DeleteIcon /></IconButton>
                                                  </ListItemSecondaryAction>
                                                  }
                                              </ListItem>)
                                        }
                                    </List>
                                </>
                            }
                            </CardContent>
                            {isManager() &&
                             <CardActions disableSpacing>
                                 <Button color="primary" startIcon={<EditIcon/>} onClick={() => setSelectedInsurer(insurer)}>Bearbeiten</Button>
                                 <Button color="primary" startIcon={<CloudUploadIcon/>} onClick={handleAddDocument}>Dokument</Button>
                                 {newDocument !== undefined &&
                                  <DocumentUploader open document={newDocument} onSave={handleSaveDocument} onCancel={handleCancelAddDocument}/>
                                 }
                             </CardActions>
                            }
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <InsuranceClassesView model={insurerModel} insurer={insurer}/>
                    </Grid>
                </Grid>
            </ExpansionPanelDetails>
            <Divider/>
            {isManager() &&
             <ExpansionPanelActions>
                 {insurer.id !== undefined && <>
                    <Button color="primary" startIcon={<SaveIcon/>} onClick={insertOrUpdateInsurer}>Speichern</Button>
                    <Button color="primary" startIcon={<DeleteIcon/>} onClick={tryToDeleteInsurer}>Löschen</Button>
                 </>}
                 {insurer.id === undefined && <Button color="primary" startIcon={<SaveIcon/>} onClick={insertOrUpdateInsurer}>Anlegen</Button>}
             </ExpansionPanelActions>
            }
        </ExpansionPanel>

        {selectedInsurer !== undefined &&
         <InsurerEditor open insurer={selectedInsurer} onSave={confirmInsurerEditDialog} onCancel={cancelInsurerEditDialog}/>
        }
    </div>
});

export default InsurerView;