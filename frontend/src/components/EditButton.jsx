import React from "react";
import {
  Button,
  Grid,
} from "@material-ui/core";

export default function EditButton(props){
    const {enableEdit, setEditFields, sendPut } = props;
    return(
      <Grid container direction="row" justify="flex-end">
        { enableEdit ?
          <Button
            style={{margin: "1em 1em"}}
            variant="contained"
            color={"default"}
            onClick={() => (setEditFields(false))}
            hidden={!enableEdit}
          >
            cancel
          </Button> : ``
        }
        <Button
          style={{margin: "1em 0"}}
          variant="contained"
          color={ enableEdit ? "secondary" : "primary"}
          onClick={() => (enableEdit ? sendPut() : setEditFields(true))}
        >
          { enableEdit ? `save`:`edit` }
        </Button>
      </Grid>
    )
}
