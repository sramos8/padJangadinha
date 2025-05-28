import { UserPayload } from '../auth/types';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserPayload;
  }
}
