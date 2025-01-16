import jwt, { Secret } from "jsonwebtoken";
import config from "../config";

const generateToken = async (payload: { userId: string }, secret: Secret) => {
  const token = jwt.sign(payload, secret, {
    expiresIn: "1d",
  });
  return token;
};

const getUserInfoFromToken = async (token: string) => {
  try {
    const userData = jwt.verify(token, config.jwt.secret as string) as {
      userId: string;
    };

    return userData;
  } catch (error) {
    return null;
  }
};

export const jwtHelper = {
  generateToken,
  getUserInfoFromToken,
};
