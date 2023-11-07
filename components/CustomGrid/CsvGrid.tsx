import React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import {extractColumns} from "../../utils";

interface CsvGridProps {
  content: Record<string, string | number>[];
}

const CsvGrid: React.FC<CsvGridProps> = ({ content }) => {
  // Prepare columns dynamically from the keys of the first object in content
  const columns = extractColumns(content);

  // Prepare rows and add an id for each row which is required by DataGrid
  const rows: GridRowsProp = content.map((item, index) => ({
    id: index,
    ...item,
  }));

  return (
    <div style={{ height: '100%', width: '90vw' }}>
      <DataGrid rows={rows} columns={columns}/>
    </div>
  );
};

export default CsvGrid;
