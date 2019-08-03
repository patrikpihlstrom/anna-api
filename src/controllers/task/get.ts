import { Response, Request } from "express";
import * as request from "request-promise-native";
import { getNamespace } from "../../helpers/task";

class Get {
  index = async (req: Request, res: Response) => {
    const namespace = await getNamespace(req);
    if (typeof namespace == "string" && namespace.length > 0) {
      const uri = "http://tasks.annahub.se/?namespace=";
      try {
        const tasks = await request.get({ uri: uri + namespace });
        return res.status(200).send(JSON.stringify(tasks, null, 3));
      } catch (e) {
        return res
          .status(404)
          .send("unable to find a task package under the provided namespace");
      }
    } else {
      return res.status(400).send("provide a namespace");
    }
  };
}

export default new Get();
