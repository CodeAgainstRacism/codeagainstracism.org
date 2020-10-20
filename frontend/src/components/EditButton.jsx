import React from "react";
import {
  Button,
  Grid,
} from "@material-ui/core";

//button functionality will need to be updated once we figure out how to submit things haha
//& if you want to tweak things/fix, feel free too :]

export default function EditButton(props){
    const {enableEdit, setEditFields, handleSave, handleCancel } = props;
    const save = () => {
      setEditFields(false);
      handleSave();
    }
    const cancel = () => {
      setEditFields(false);
      handleCancel();
    }

    return(
      <Grid container direction="row" justify="flex-end">
        { enableEdit ?
          <Button
            style={{margin: "1em 1em"}}
            variant="contained"
            color={"default"}
            onClick={cancel}
            hidden={!enableEdit}
          >
            cancel
          </Button> :
          ``
        }
        {
          enableEdit ?
          <Button
            style={{margin: "1em 0"}}
            variant="contained"
            color={"secondary"}
            onClick={save}
          >
            save
          </Button> :
          <Button
            style={{margin: "1em 0"}}
            variant="contained"
            color={"primary"}
            onClick={() => { setEditFields(true) }}
          >
            edit
          </Button>
        }
      </Grid>
    )
}
