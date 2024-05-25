import User from '@src/models/classes/User.class';

export function getNewUser(user: User): User {
  const entries = Object.entries(user);
  const newEntries = entries.filter(
    ([key]) => !['id', 'status', 'createdate'].includes(key)
  );
  const newUser = Object.fromEntries(newEntries) as User;
  return newUser;
}
