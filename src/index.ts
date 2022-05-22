import express, { Express, Request, Response } from 'express';
import path, { resolve } from 'path'
import history from 'connect-history-api-fallback';
import dotenv from 'dotenv';
import debug from 'debug';
import http from 'http';
import {before, after} from './configure';

debug('app:server')

dotenv.config();

const app: Express = express();
const server = http.createServer(app)
const port: String = process.env.PORT || "3000";

// API
before(app);
after(app, server);

const publicPath = resolve(__dirname, '../client/dist');
const staticConf = { maxAge: '1s', etag: false };

app.use(history());
app.use(express.static(publicPath, staticConf));

app.get('/', (req: Request, res: Response) => {
  res.render(path.join(__dirname + '/client/dist/index.html'))
});


server.listen(port, () => debug.log(`⚡️[server]: Server is running at http://localhost:${port}`));