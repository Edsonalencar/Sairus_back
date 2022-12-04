import { Router, Request, Response, NextFunction } from "express";
import shortid from "shortid";
import { MongoModelURL } from "../models/mongoMoldels/ulr.model";
import { StatusCodes } from "http-status-codes";
import ForbbidenError from "../models/error/forbidden.error";

const userRoute = Router();

// Rehister
userRoute.post(
  "/user",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      if (!email || email === " ") {
        throw new ForbbidenError("email não Informado");
      }
      if (!password || password === " ") {
        throw new ForbbidenError("password não Informada");
      }

      const user = await MongoModelURL.findOne({ email });

      if (user) {
        throw new ForbbidenError("o email já esta em uso");
      }

      const hash = shortid.generate();

      const newUser = await MongoModelURL.create({ hash, email, password });

      res.status(StatusCodes.OK).json(newUser);
    } catch (error) {
      next(error);
    }
  }
);

// Login
userRoute.get(
  "/user",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user = await MongoModelURL.findOne({ email, password });

      if (!user) {
        throw new ForbbidenError("Usuario não encontrado");
      }

      res.status(StatusCodes.OK).json(user);
    } catch (error) {
      next(error);
    }
  }
);

// Consulta por codigo
userRoute.get(
  "/user/:hash",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { hash } = req.params;

      const user = await MongoModelURL.findOne({ hash });

      if (!user) {
        throw new ForbbidenError("Usuario não encontrado");
      }

      const { dados_pessoais, dados_saude, dados_endereco } = user;

      res
        .status(StatusCodes.OK)
        .json({ dados_pessoais, dados_saude, dados_endereco });
    } catch (error) {
      next(error);
    }
  }
);

// Consulta todos os usuarios cadastrados
userRoute.get(
  "/users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await MongoModelURL.find();

      res.status(StatusCodes.OK).json(users);
    } catch (error) {
      next(error);
    }
  }
);

// Atualiza dados usuario
userRoute.post(
  "/user/data",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { hash, data } = req.body;

      await MongoModelURL.findOneAndUpdate({ hash }, data);
      const user = await MongoModelURL.findOne({ hash });

      if (!user) {
        throw new ForbbidenError("Erro ao atualizar dados");
      }

      const { dados_pessoais, dados_saude, dados_endereco } = user;

      res
        .status(StatusCodes.OK)
        .json({ dados_pessoais, dados_saude, dados_endereco });
    } catch (error) {
      next(error);
    }
  }
);

export default userRoute;
