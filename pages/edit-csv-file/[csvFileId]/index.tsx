import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react';

import { useRouter } from 'next/router';
import { csvFilesActions } from '../../../store/actions/csv_files';
import { useAppDispatch } from '../../../store/configureStore';
import { csvFilesSelectors } from '../../../store/selectors/csvFiles';
import { useSelector } from 'react-redux';
import CsvGrid from '../../../components/CustomGrid/CsvGrid';
import EnrichmentForm from '../../../components/EnrichmentForm/EnrichmentForm';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';

const EditCsvFile = () => {
  const router = useRouter();
  const rawId = router.query.csvFileId;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  const csvFile = useSelector(csvFilesSelectors.singleCsvFile);
  const [enrichFormOpen, setEnrichFormOpen] = useState<boolean>(false);

  console.log(csvFile);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id !== undefined) {
      dispatch(csvFilesActions.fetchSingleCsvFile(id));
    }
  }, [id]);

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Edit CSV File
      </Typography>
      {enrichFormOpen && id ? (
        <EnrichmentForm content={csvFile?.content} fileId={id} />
      ) : (
        <Button variant="contained" color="primary" onClick={() => setEnrichFormOpen(true)}>
          Enrich my file
        </Button>
      )}
      {csvFile?.content && <CsvGrid content={csvFile?.content} />}
    </div>
  );
};

export default EditCsvFile;
