import { AppHead } from '../components/AppHead';
import { Layout } from '../components/Layout';
import { Typography } from '@mui/material';

const Index = () => {
  return (
    <>
      <AppHead subTitle='Items'>
        <meta name='description' content='Foo Bar' />
      </AppHead>
      <Layout>
        <Typography>
          Home
        </Typography>
      </Layout>
    </>
  );
};

export default Index;
