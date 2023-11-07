import type { NextPage } from 'next';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import { csvFilesSelectors } from '../store/selectors/csvFiles';
import { useCallback, useEffect } from 'react';
import { csvFilesActions } from '../store/actions/csv_files';
import { useAppDispatch } from '../store/configureStore';
import { useRouter } from 'next/router';
import { useDropzone } from 'react-dropzone';

const Home: NextPage = () => {
  const dispatch = useAppDispatch();
  const allCsvFiles = useSelector(csvFilesSelectors.allCsvFiles);
  const router = useRouter();

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: acceptedFiles => {
      acceptedFiles.forEach((file: any) => {
        const reader = new FileReader();
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
          dispatch(csvFilesActions.uploadFile(file));
        };
        reader.readAsArrayBuffer(file);
      });
    },
  });

  useEffect(() => {
    dispatch(csvFilesActions.fetchAllCsvFiles());
  }, []);
  const handleEditFile = (fileId: string) => {
    router.push(`/edit-csv-file/${fileId}`);
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            CSV Editor
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              CSV Enrichment Hub
            </Typography>
            <div {...getRootProps()} className="dropzone">
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Upload, enrich, and preview your CSV files all in one place. Elevate your data
              effortlessly with additional insights fetched from selected APIs. Your simplified path
              from data to decisions starts here.
            </Typography>
            <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center"></Stack>
          </Container>
        </Box>
        {allCsvFiles !== null && allCsvFiles.length > 0 && (
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {allCsvFiles.map((csv: any) => (
                <Grid item key={csv.fileId} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: '56.25%',
                      }}
                      image="https://source.unsplash.com/random?csv"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {csv?.name}
                      </Typography>
                      <Typography></Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" onClick={() => handleEditFile(csv.id)}>
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'ligtBlue', p: 6 }} component="footer">
        <Typography variant="subtitle1" align="center" color="text.secondary" component="p">
          Delve deeper into your data journey. Reach out for support, learn more about our platform,
          or connect with our community. Your path to enriched insights extends beyond the screen.{' '}
        </Typography>
      </Box>
      {/* End footer */}
    </>
  );
};

export default Home;
