import { ItemList } from './items/ItemsList';
import { AppHead } from '../components/AppHead';

export const Items = () => {
  return (
    <>
      <AppHead subTitle='items' />
      <ItemList />
    </>
  );
};

export default Items;
