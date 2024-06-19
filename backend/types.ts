import { Request } from 'express';

export interface IData {
  email?: string;
  number?: string;
}

export type RequestWithBody<T> = Request<{}, {}, T>;
