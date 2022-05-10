import { AppHead } from '../components/AppHead';
import { ItemList } from '../components/Items/List';
import { Layout } from '../components/Layout';

export const Items = () => {
  return (
    <>
      <AppHead subTitle='items' />
      <Layout>
        <ItemList />
      </Layout>
    </>
  );
};

export default Items;
