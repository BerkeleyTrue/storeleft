import { Layout } from './Layout';
import { ItemList } from './items/ItemsList';
import { AppHead } from '../components/AppHead';

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
