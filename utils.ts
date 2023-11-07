import {GridColDef} from "@mui/x-data-grid";

export const extractColumns = (content: any) => {
    const columns: GridColDef[] = content.length > 0
        ? Object.keys(content[0]).map((key) => ({
            field: key,
            headerName: key.replace(/_/g, ' ').replace(/^\w/, (c) => c.toUpperCase()), // Make headers more readable
            width: 150,
            editable: true,
        }))
        : [];
    return columns;
}
