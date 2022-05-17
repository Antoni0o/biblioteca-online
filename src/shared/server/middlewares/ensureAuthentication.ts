import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { AppError } from "../../errors/AppError"; 
import auth from "../../../utils/auth"; 
import { AuthRequest } from "../../../@types/express"; 

export async function ensureAuthentication(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if(!authHeader) {
    throw new AppError("Você precisa estar logado para utilizar essa funcionalidade!", 401)
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: id } = verify(token, auth.jwt.secret);

    req.user = {
      id: Number(id),
    };

    next();
  } catch(err) {
    throw new AppError(`Token Inválido, ${err.message}`, 401)
  }
}