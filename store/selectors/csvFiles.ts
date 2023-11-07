import {RootState} from '../configureStore';
import {CSV_REDUCER_NAME} from '../reducers/csv_files';

const csvFiles = (state: RootState) => state[CSV_REDUCER_NAME];

const singleCsvFile = (state: RootState) => csvFiles(state).singleCsvFile;

const allCsvFiles = (state: RootState) => csvFiles(state).allCsvFiles;

const externalFile = (state: RootState) => csvFiles(state).externalFile;

export const csvFilesSelectors = {
    csvFiles,
    singleCsvFile,
    allCsvFiles,
    externalFile,
};
