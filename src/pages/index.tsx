import { AppHead } from '../components/AppHead';
import { Layout } from '../components/Layout';
import { List } from '../components/Items/List';

const Index = () => {
  return (
    <>
      <AppHead subTitle='Items'>
        <meta name='description' content='Foo Bar' />
      </AppHead>
      <Layout>
        <List />
      </Layout>
    </>
  );
};

export default Index;
