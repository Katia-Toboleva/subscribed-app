import jwt from 'jsonwebtoken';

const secret = 'mysecret';

const createToken = ({ id, role }) => jwt.sign({ id, role }, secret);

const getUserFromToken = async (token, prisma) => {
  try {
    const userFromToken = jwt.verify(token, secret);
    const user = await prisma.user.findUnique({
      where: {
        id: userFromToken.id,
      }
    });
    return user;
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
 const authorized = (role, next) => async (root, args, context, info) => {
  if (context.user.role !== role ) {
    throw new Error(`incorrect privilegies, must be ${role} role`);
  }

  return next(root, args, context, info);
}

export { createToken, getUserFromToken, authenticated, authorized };