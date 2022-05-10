import {
  Grid,
  Stack,
  Typography,
  Button,
  Card,
  CardHeader,
  CardContent,
  CardActions,
} from '@mui/material';

interface Props {
  itemId: string;
}

export const ViewItem = ({}: Props) => {
  return (
    <Stack mb='8em'>
      <Grid container mb='2em'>
        <Grid item xs={12} md={3}>
          <Typography variant='h4'>View</Typography>
        </Grid>
        <Grid item xs={12} md={9}>
          <Stack direction='row' spacing={2}>
            <Button variant='contained' color='success'>
              Save
            </Button>
            <Button variant='contained' color='error'>
              Delete
            </Button>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack direction='row' spacing={2}>
            <Button variant='outlined' color='info'>
              Duplicate
            </Button>
            <Button variant='outlined' color='info'>
              Add Another
            </Button>
          </Stack>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} lg={6} xl={14} mb='2em'>
          <Card>
            <CardHeader title='Group' />
            <CardContent>
              <CardActions>
                <form>
                  <Grid container>
                    <Grid item xs={12} sm={6} xl={4}>Fields</Grid>
                  </Grid>
                </form>
              </CardActions>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
};
