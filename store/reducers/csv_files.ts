import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {csvFilesActions} from '../actions/csv_files';
import {CsvFile, CsvFilesList} from "../types/csv_files";

interface CsvFilesState {
    singleCsvFile: CsvFile | null;
    allCsvFiles: CsvFilesList | null;
    externalFile: any | null;
}


const initialState: CsvFilesState = {
    singleCsvFile: null,
    allCsvFiles: null,
    externalFile: null,
};

export const CSV_REDUCER_NAME = 'csvFiles';

const csvSlice = createSlice({
    name: CSV_REDUCER_NAME,
    initialState,
    reducers: {
        setSingleCsvFile: (state, action: PayloadAction<CsvFile | null>) => {
            state.singleCsvFile = action.payload;
        },
        setAllCsvFiles: (state, action: PayloadAction<CsvFilesList | null>) => {
            state.allCsvFiles = action.payload;
        },
    },
    extraReducers: builder => {

        // SINGLE FILE
        builder.addCase(csvFilesActions.fetchSingleCsvFile.pending, state => {
        });
        builder.addCase(csvFilesActions.fetchSingleCsvFile.fulfilled, (state, action) => {
            state.singleCsvFile = action.payload;
        });
        builder.addCase(csvFilesActions.fetchSingleCsvFile.rejected, state => {
            state.singleCsvFile = null;
        });

        // ALL FILES
        builder.addCase(csvFilesActions.fetchAllCsvFiles.pending, state => {
        });
        builder.addCase(csvFilesActions.fetchAllCsvFiles.fulfilled, (state, action) => {
            state.allCsvFiles = action.payload;
        });
        builder.addCase(csvFilesActions.fetchAllCsvFiles.rejected, (state, action) => {
        });
        // UPLOAD FILE

        builder.addCase(csvFilesActions.uploadFile.pending, state => {
        });
        builder.addCase(csvFilesActions.uploadFile.fulfilled, (state, action) => {
            debugger;
            state.allCsvFiles = [action.payload, ...state.allCsvFiles ?? []];
        });
        builder.addCase(csvFilesActions.uploadFile.rejected, (state, action) => {

            }
        );

        // FETCH EXTERNAL FILE

        builder.addCase(csvFilesActions.fetchExternalFile.pending, state => {

        });
        builder.addCase(csvFilesActions.fetchExternalFile.fulfilled, (state, action) => {
            state.externalFile = [action.payload];
        });
        builder.addCase(csvFilesActions.fetchExternalFile.rejected, (state, action) => {

        });

    },
});

export const csvSliceAction = csvSlice.actions;

export default csvSlice.reducer;
