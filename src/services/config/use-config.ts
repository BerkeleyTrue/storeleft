import useSWR from 'swr';
import axios from 'axios';
import { StoreleftConfig } from '../../types';

const fetcher = () => axios.get('/api/config').then((res) => res.data);

export const useConfig = () => {
  const res = useSWR<StoreleftConfig>('config', fetcher);
  return {
    ...res,
    config: res.data
  };
}
