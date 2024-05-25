import express, { Application } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import APP_CONFIG from '@src/config';
import { ServerController } from '@models/types/server-controller';
import userController from '@controllers/user-controller';

const { API } = APP_CONFIG;

const PORT = parseInt(API.PORT as string);
const CONTROLLERS = [userController];

class Server {
  #app: Application;
  #port: number;

  constructor() {
    this.#app = express();
    this.#port = PORT;
    this.#middlewares();
    this.#controllers(CONTROLLERS);
  }

  start() {
    this.#app.listen(this.#port, () => {
      console.log(`Server running on port ${this.#port}`);
    });
  }

  #middlewares() {
    this.#app.use(
      express.json(),
      express.urlencoded({ extended: true }),
      morgan('dev'),
      helmet(),
      cors()
    );
  }

  #controllers(serverControllers: ServerController[]) {
    serverControllers.forEach(([endpoint, route]) =>
      this.#app.use(endpoint, route)
    );
  }
}
export default Server;
