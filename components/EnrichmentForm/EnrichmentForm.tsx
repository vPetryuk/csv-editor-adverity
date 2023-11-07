import React, {useState} from 'react';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Box,
} from '@mui/material';
import {extractColumns} from "../../utils";
import {useAppDispatch} from "../../store/configureStore";
import {csvFilesActions} from "../../store/actions/csv_files";
import {csvFilesSelectors} from "../../store/selectors/csvFiles";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";

type EnrichmentFormProps = {
    content: any;
    fileId: string;
};

const EnrichmentForm: React.FC<EnrichmentFormProps> = ({content, fileId}) => {
    const [apiLink, setApiLink] = useState<string>('');
    const [selectedColumn, setSelectedColumn] = useState<string>('');
    const [apiResponseColumn, setApiResponseColumn] = useState<string>('');
    const dispatch = useAppDispatch();
    const externalFile = useSelector(csvFilesSelectors.externalFile);
    const router = useRouter();


    const columns = extractColumns(content);
    const columnsFromExFile = externalFile ? extractColumns(externalFile[0]) : [];

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(csvFilesActions.enrichFile({selectedColumn, apiResponseColumn, fileId, externalFile}));
        router.back();
    };

    const handleLoadExternalFile = () => {
        dispatch(csvFilesActions.fetchExternalFile(apiLink));
    }

    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': {m: 1, width: '25ch'},
                '& .MuiButton-root': {m: 1},
                '& .MuiFormControl-root': {m: 1, minWidth: 120},
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
        >
            <div>
                <TextField
                    required
                    id="api-link-input"
                    label="API Link"
                    value={apiLink}
                    onChange={(e) => setApiLink(e.target.value)}
                />
                <Button onClick={() => handleLoadExternalFile()} variant="contained">
                    Load external file
                </Button>
            </div>
            {externalFile &&
                <>
                    <div>
                        <FormControl fullWidth>
                            <InputLabel id="select-column-label">Select Column</InputLabel>
                            <Select
                                labelId="select-column-label"
                                id="select-column"
                                value={selectedColumn}
                                label="Select Column"
                                onChange={(e) => setSelectedColumn(e.target.value as string)}
                            >
                                {columns.map((column: any) => (
                                    <MenuItem key={column.field} value={column.field}>
                                        {column.field}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl fullWidth>
                            <InputLabel id="api-response-column-label">API Response Column</InputLabel>
                            <Select
                                labelId="api-response-column-label"
                                id="api-response-column"
                                value={apiResponseColumn}
                                label="API Response Column"
                                onChange={(e) => setApiResponseColumn(e.target.value as string)}
                            >
                                {columnsFromExFile.map((column: any) => (
                                    <MenuItem key={column.field} value={column.field}>
                                        {column.field}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <Button variant="contained" type="submit">
                            Enrich
                        </Button>
                    </div>
                </>
            }

        </Box>
    );
};

export default EnrichmentForm;
