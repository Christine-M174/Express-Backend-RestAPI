import { User, UserStore } from '../../models/user';

const store = new UserStore();
let user1: User;
let user2: User;

describe('Tests the User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have an edit method', () => {
    expect(store.edit).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('should have a deleteAll method', () => {
    expect(store.deleteAll).toBeDefined();
  });

  it('should have an authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('adds a user with the create method', async () => {
    user1 = await store.create({
      user_name: 'jessy',
      first_name: 'jey',
      last_name: 'boles',
      password: 'makedecision'
    });

    expect(user1.user_name).toEqual('jessy');
    expect(user1.first_name).toEqual('jey');
    expect(user1.last_name).toEqual('boles');

    user2 = await store.create({
      user_name: 'tonaa',
      first_name: 'martine',
      last_name: 'mokhtar',
      password: 'bluesky'
    });

    expect(user2.user_name).toEqual('tonaa');
    expect(user2.first_name).toEqual('martine');
    expect(user2.last_name).toEqual('mokhtar');
  });

  it('edits a user with the edit method', async () => {
    const id = user2.id;
    user2 = await store.edit({
      id: id,
      user_name: 'tonaa',
      first_name: 'mark',
      last_name: 'mokhtar',
      password: 'bluesky'
    });

    expect(user2.user_name).toEqual('tonaa');
    expect(user2.first_name).toEqual('mark');
    expect(user2.last_name).toEqual('mokhtar');
  });

  it('returns a list of all users with the index method', async () => {
    const result = await store.index();

    expect(result.length).toEqual(2);

    expect(result[0].user_name).toEqual('jessy');
    expect(result[0].first_name).toEqual('jey');
    expect(result[0].last_name).toEqual('boles');

    expect(result[1].user_name).toEqual('tonaa');
    expect(result[1].first_name).toEqual('mark');
    expect(result[1].last_name).toEqual('mokhtar');
  });

  it('shows a user with the show method', async () => {
    let result = await store.show(user1.id as unknown as string);
    if (Array.isArray(result)) {
      result = result[0];
    }

    expect(result.user_name).toEqual('jessy');
    expect(result.first_name).toEqual('jey');
    expect(result.last_name).toEqual('boles');
  });

  it('validates the user with the authenticate method (valid params)', async () => {
    const result = await store.authenticate('tonaa', 'bluesky');

    expect(result).not.toBeNull();
    if (result) {
      expect(result.user_name).toEqual('tonaa');
      expect(result.first_name).toEqual('mark');
      expect(result.last_name).toEqual('mokhtar');
    }
  });

  it('rejects the user with the authenticate method (invalid params)', async () => {
    const result = await store.authenticate('popo', 'mmmmmmmmopo');

    expect(result).toBeNull();
  });

  it('deletes a user with the delete method', async () => {
    await store.delete(user1.id as unknown as string);
    const result = await store.index();

    expect(result.length).toEqual(1);
    expect(result[0].user_name).toEqual('tonaa');
    expect(result[0].first_name).toEqual('mark');
    expect(result[0].last_name).toEqual('mokhtar');
  });

  it('deletes all users with the deleteAll method', async () => {
    await store.deleteAll();
    const result = await store.index();

    expect(result.length).toEqual(0);
  });

  // Clean up
  afterAll(async () => {
    await store.deleteAll();
  });
});