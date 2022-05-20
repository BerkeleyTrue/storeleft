import * as R from 'remeda';
import { defaultTo } from '../../../lib/remeda/defaultTo';

export type Node = {
  name: string;
  parentName: string;
  items: number;
  children: Node[];
};

export const isNode = (n: Node | Node[]): n is Node => !Array.isArray(n);

export function locationsToTree<T extends { location?: string }, B = boolean>(
  items: T[],
  hasParent?: B,
  parent?: string,
): B extends true ? Node[] : Node;

export function locationsToTree<T extends { location?: string }, B = boolean>(
  items: T[],
  hasParent?: B,
  parentName?: string
): Node[] | Node {
  parentName = parentName || '/';
  const temp = R.pipe(
    items,
    R.groupBy(({ location }) => location?.trim() || '/'),
    R.toPairs,
    R.map(([location, items]) => {
      const paths = R.compact(location.split('/'));
      const rootName = paths[0] || 'N/A';
      const subPath = paths.slice(1).join('/');

      let children: Node[] = [];
      // not a leaf node
      if (paths.length > 1) {
        children = R.pipe(
          items,
          defaultTo([] as unknown as typeof items),
          R.map(() => {
            return {
              location: subPath,
            };
          }),
          <N>(items: N[]): Node[] => locationsToTree<N>(items, true, rootName) as Node[],
        );
      }

      const thisNode = {
        parentName,
        name: rootName,
        items: items.length,
        children: children,
      };
      return thisNode as Node;
    }),
    R.groupBy(({ name }) => name),
    R.toPairs,
  );

  const nodes = R.pipe(
    temp,
    R.map(
      ([name, children]) =>
        ({
          name,
          parentName,
          items: R.pipe(
            children,
            R.map(({ items }) => items),
            R.reduce((x, y) => x + y, 0),
          ),
          children: R.pipe(
            children,
            R.map(R.prop('children')),
            R.reduce(R.concat, []),
          ),
        } as Node),
    ),
  );

  return hasParent
    ? nodes
    : {
        parentName: 'space-time',
        name: parentName,
        items: R.pipe(
          nodes,
          R.map(({ items }) => items),
          R.reduce((x, y) => x + y, 0),
        ),
        children: nodes,
      };
}

function visitBfs(n: Node, visiter: (n: Node) => Node | void): Node | void {
  const res = visiter(n);
  if (res) {
    return res;
  }

  const children = n.children;
  return children.reduce<Node | void>((acc, n, idx) => {
    if (acc) {
      return acc;
    }
    if (idx === children.length + 1) {
      if (!children[0]) {
        return;
      }
      return visitBfs(children[0], visiter);
    }
    return visitBfs(n, visiter);
  }, undefined);
}

export function findByName(n: Node, name: string): Node | void {
  if (n.name === name) {
    return n;
  }

  return visitBfs(n, (n) => {
    if (n.name === name) {
      return n;
    }
  });
}
