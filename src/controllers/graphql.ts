import { prisma } from "../../prisma/generated/prisma-client";
import { Response, Request } from "express";

class Graphql {
  index = async (req: Request, res: Response) => {
    try {
      if (req.query.variables in ["null", "", null]) {
        return res.send(
          JSON.stringify(await prisma.$graphql(req.body.query, null))
        );
      } else {
        return res.send(
          JSON.stringify(
            await prisma.$graphql(req.body.query, req.body.variables)
          )
        );
      }
    } catch (e) {
      return res.send(JSON.stringify(e));
    }
  };
}

export default new Graphql();
