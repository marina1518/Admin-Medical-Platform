import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function Table({rows,columns}) {
    
  return (
        <DataGrid
        rows={rows}
        columns={columns}
        pageSize={8}
        //checkboxSelection
        disableSelectionOnClick
      />   
  );
}