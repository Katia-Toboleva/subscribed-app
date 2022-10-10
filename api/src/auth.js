import jwt from 'jsonwebtoken';
import { mockUsers } from './mocks/mockData.js';

const secret = 'mysecret';

const createToken = ({ id }) => jwt.sign({ id }, secret);

const getUserFromToken = token => {
  try {
    const user = jwt.verify(token, secret);
    return mockUsers.find(mockUser => mockUser.id === user.id);
  } catch (e) {
    return null;
  }
};

/**
 * checks if the user is on the context object
 * continues to the next resolver if true
 * @param {Function} next next resolver function ro run
 */

const authenticated = next => (root, args, context, info) => {
  if (!context.user) {
    throw new Error('not authenticated');
  }

  return next(root, args, context, info);
};

/**
 * checks if the user on the context has the specified role.
 * continues to the next resolver if true
 * @param {String} role enum role to check for
 * @param {Function} next next resolver function to run
 */
 const authorized = (role, next) => (root, args, context, info) => {
  if (context.user.role !== role ) {
    throw new Error(`incorrect privilegies, must be ${role} role`);
  }

  return next(root, args, context, info);
}

export { createToken, getUserFromToken, authenticated, authorized };