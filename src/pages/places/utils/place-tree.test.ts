import { findByName, locationsToTree, Node } from './place-tree';

describe('locationsToTree', () => {
  it('should return a tree', () => {
    const items = [
      { location: 'home/bin', _id: 1 },
      { location: 'home/box', _id: 2 },
    ];

    const expected = expect.objectContaining({
      name: '/',
      items: 2,
      children: expect.arrayContaining([
        expect.objectContaining({
          name: 'home',
          items: 2,
          children: expect.arrayContaining([
            expect.objectContaining({ name: 'bin', items: 1, children: [] }),
            expect.objectContaining({ name: 'box', items: 1, children: [] }),
          ]),
        }),
      ]),
    });

    const res = locationsToTree(items) as Node;
    expect(res).toStrictEqual(expected);
  });

  it('should ignore trailing slash and empty space', () => {
    const items = [
      { location: 'home/bin/  ', _id: 1 },
      { location: 'home/box', _id: 2 },
    ];

    const expected = expect.objectContaining({
      name: '/',
      items: 2,
      children: expect.arrayContaining([
        expect.objectContaining({
          name: 'home',
          items: 2,
          children: expect.arrayContaining([
            expect.objectContaining({ name: 'bin', items: 1, children: [] }),
            expect.objectContaining({ name: 'box', items: 1, children: [] }),
          ]),
        }),
      ]),
    });

    const res = locationsToTree(items) as Node;
    expect(res).toStrictEqual(expected);
  });

  it('should ignore leading slash and empty space', () => {
    const items = [
      { location: '  /home/bin/  ', _id: 1 },
      { location: 'home/box', _id: 2 },
    ];

    const expected = expect.objectContaining({
      name: '/',
      items: 2,
      children: expect.arrayContaining([
        expect.objectContaining({
          name: 'home',
          items: 2,
          children: expect.arrayContaining([
            expect.objectContaining({ name: 'bin', items: 1, children: [] }),
            expect.objectContaining({ name: 'box', items: 1, children: [] }),
          ]),
        }),
      ]),
    });

    const res = locationsToTree(items) as Node;
    expect(res).toStrictEqual(expected);
  });

  it('should work with deep nests', () => {
    const items = [
      { location: 'home/closet/shelf/bin/box', _id: 1 },
      { location: 'home/box', _id: 2 },
    ];

    const expected = expect.objectContaining({
      name: '/',
      items: 2,
      children: expect.arrayContaining([
        expect.objectContaining({
          name: 'home',
          items: 2,
          children: expect.arrayContaining([
            expect.objectContaining({
              name: 'closet',
              items: 1,
              children: expect.arrayContaining([
                expect.objectContaining({
                  name: 'shelf',
                  items: 1,
                  children: expect.arrayContaining([
                    expect.objectContaining({
                      name: 'bin',
                      items: 1,
                      children: expect.arrayContaining([
                        expect.objectContaining({
                          name: 'box',
                          items: 1,
                          children: [],
                        }),
                      ]),
                    }),
                  ]),
                }),
              ]),
            }),
            expect.objectContaining({ name: 'box', items: 1, children: [] }),
          ]),
        }),
      ]),
    });

    const res = locationsToTree(items) as Node;
    expect(res).toStrictEqual(expected);
  });

  it('should track item count', () => {
    const items = [
      { location: 'home/closet/graybin', _id: 1 },
      { location: 'home/closet/graybin', _id: 3 },
      { location: 'home/closet/graybin', _id: 4 },
      { location: 'home/box', _id: 2 },
      { location: 'garage/box', _id: 5 },
    ];

    const expected = expect.objectContaining({
      name: '/',
      items: 5,
      children: expect.arrayContaining([
        expect.objectContaining({
          name: 'home',
          items: 4,
          children: expect.objectContaining([
            expect.objectContaining({
              name: 'closet',
              items: 3,
              children: expect.arrayContaining([
                expect.objectContaining({
                  name: 'graybin',
                  children: [],
                  items: 3,
                }),
              ]),
            }),
            expect.objectContaining({ name: 'box', items: 1, children: [] }),
          ]),
        }),
        expect.objectContaining({
          name: 'garage',
          items: 1,
          children: expect.arrayContaining([
            expect.objectContaining({ name: 'box', items: 1, children: [] }),
          ]),
        }),
      ]),
    });

    const res = locationsToTree(items) as Node;
    expect(res).toMatchObject(expected);
  });
});

describe('findByName', () => {
  it('should return a tree if matches', () => {
    const tree = {name: 'a', children: [{name: 'b', children: []}]} as unknown as Node;
    const res = findByName(tree, 'a');
    expect(res).toBe(tree);
  });

  it('should return a child if matches', () => {
    const tree = {name: 'a', children: [{name: 'b', children: []}]} as unknown as Node;
    const res = findByName(tree, 'b');
    expect(res).toBe(tree.children[0]);
  });
})
