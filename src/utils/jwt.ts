import jwt from "jsonwebtoken";

export const generateJWT = () => {
  const data = {
    name: "juampi",
    credit_card: "1234567890",
    password: "secret",
  };

  const token = jwt.sign(data, process.env.JWT_SECRET, {
    expiresIn: "180d",
  });
  return token;
};
