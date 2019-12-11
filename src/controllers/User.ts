import { NextFunction, Request, Response } from 'express';

import getErrorStatusCode from './utils/getErrorStatusCode';
import UserRepository from '../repository/User';

const create = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  try {
    const { body } = req;

    const { id } = await UserRepository.create(body);

    return res.status(201).send({
      id,
    });
  } catch (err) {
    err.status = getErrorStatusCode(err);

    next(err);
  }
};

const read = async (_req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  try {
    const users = await UserRepository.read();

    return res.status(200).send({
      users,
    });
  } catch (err) {
    err.status = getErrorStatusCode(err);

    next(err);
  }
};

const readOne = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  try {
    const { id } = req.params;

    const user = await UserRepository.readOne(id);

    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    return res.status(200).send({
      user,
    });
  } catch (err) {
    err.status = getErrorStatusCode(err);

    next(err);
  }
};

const update = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  try {
    const { id } = req.params;

    const user = await UserRepository.update(id, { ...req.body });

    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    return res.status(200).send({ user });
  } catch (err) {
    err.status = getErrorStatusCode(err);

    next(err);
  }
};

const remove = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
  try {
    const { id } = req.params;

    const user = await UserRepository.delete(id);

    if (!user) {
      return res.status(404).send({ error: 'User not found.' });
    }

    return res.status(200).send({ user });
  } catch (err) {
    err.status = getErrorStatusCode(err);

    next(err);
  }
};

export default {
  create,
  read,
  readOne,
  update,
  delete: remove,
};
