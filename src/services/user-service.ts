import * as repository from '@repositories/user-repository';
import User from '@src/models/classes/User.class';

export function listUsers() {
  return repository.list();
}

export function detailUser(id: number) {
  return repository.detail(id);
}

export function addUser(newUser: User) {
  return repository.add(newUser);
}

export function deleteUser(id: number) {
  return repository.remove(id);
}
