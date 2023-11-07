import {createAsyncThunk} from '@reduxjs/toolkit';

import {csvServices} from '../services/csv_files';
import {EnrichFileArgs} from "../types/csv_files";

const fetchAllCsvFiles = createAsyncThunk('csv_files/FetchAllCsvFiles', async () => {
    return await csvServices.fetchAllCsvFiles();
});

const fetchSingleCsvFile = createAsyncThunk(
    'csv_files/FetchSingleCsvFile',
    async (fileId: string | number) => {
        return await csvServices.fetchSingleCsvFile(fileId);
    },
);

const fetchExternalFile = createAsyncThunk(
    'csv_files/fetchExternalFile',
    async (apiLink: string) => {
        return await csvServices.fetchExternalFile(apiLink);
    },
);


const uploadFile = createAsyncThunk(
    'csv_files/uploadFile',
    async (file: any) => {
        return await csvServices.uploadFile(file);
    }
);

const enrichFile = createAsyncThunk(
    'csv_files/enrichFile',
    async ({selectedColumn, apiResponseColumn, fileId, externalFile}: EnrichFileArgs) => {
        return await csvServices.enrichFile(selectedColumn, apiResponseColumn, fileId, externalFile);
    }
);


export const csvFilesActions = {
    fetchAllCsvFiles,
    fetchSingleCsvFile,
    uploadFile,
    fetchExternalFile,
    enrichFile,
};
