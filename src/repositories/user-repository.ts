import * as db from '@database/mysql';
import User from '@src/models/classes/User.class';

const TABLE = 'users';

export function list() {
  return db.list<User>(TABLE);
}

export function detail(id: number) {
  return db.detail<User>(TABLE, id);
}

export function add(user: User) {
  return db.add<User>(TABLE, user);
}

export function remove(id: number) {
  return db.remove(TABLE, id);
}
