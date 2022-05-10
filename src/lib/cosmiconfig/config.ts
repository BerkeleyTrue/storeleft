import { cosmiconfig } from 'cosmiconfig';
import { CosmiconfigResult } from 'cosmiconfig/dist/types';

import { StoreleftConfig } from '../../types';

const searchRes = cosmiconfig('storeleft').search();

searchRes.then((res: CosmiconfigResult) => {
  console.log(`Config found at ${res?.filepath}`);
});

export const getConfig = async (): Promise<StoreleftConfig> => {
  return searchRes.then((res) => {
    return res?.config || {};
  });
}
