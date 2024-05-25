import express from 'express';
import * as service from '@services/user-service';
import * as response from '@network/response';
// import User from '@models/classes/User.class';
import { ServerController } from '@models/types/server-controller';
import { getNewUser } from '@utilities/service-utils';

const router = express.Router();

router.get('/list', async (_req, res) => {
  const operation = 'Users list';
  try {
    const users = await service.listUsers();

    response.success({
      res,
      msg: `${operation} successfully.`,
      data: users,
    });
  } catch (error) {
    console.error({ error });
    response.error({ msg: `Error in ${operation}`, data: error });
  }
});

router.get('/detail/:id', async (req, res) => {
  const operation = 'User detail';
  const id = parseInt(req.params.id);
  try {
    const [user] = await service.detailUser(id);
    console.log({ user });
    if (!user)
      response.error({
        res,
        msg: 'User not found.',
        status: 404,
      });

    response.success({
      res,
      msg: `${operation} successfully.`,
      data: user,
    });
  } catch (error) {
    console.error({ error });
    response.error({ res, msg: `Error in ${operation}`, data: error });
  }
});

router.post('/add', async (req, res) => {
  const operation = 'Add user';
  const newUser = getNewUser(req.body);
  try {
    await service.addUser(newUser);
    response.success({
      res,
      msg: `${operation} successfully.`,
      data: newUser,
    });
  } catch (error) {
    console.error({ error });
    response.error({ res, msg: `Error in ${operation}`, data: error });
  }
});

const userController: ServerController = ['/api/user', router];

export default userController;
