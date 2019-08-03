import { Request } from "express";

export function validate(str: string): string | boolean {
  const notAllowed = "!\"'\\@£$|[]≈±#€%&/()=?`´;:,.*¨ \n\t";
  for (let i = 0; i < str.length; ++i) {
    let c = str[i];
    if (notAllowed.indexOf(c) > -1) {
      return false;
    }
  }

  return str;
}

export function getNamespace(req: Request): string | boolean {
  if (req.params.namespace != null && typeof req.params.namespace == "string") {
    return this.validate(req.params.namespace);
  }
  if (req.body.namespace != null && typeof req.body.namespace == "string") {
    return this.validate(req.body.namespace);
  }
  if (req.query.namespace != null && typeof req.query.namespace == "string") {
    return this.validate(req.query.namespace);
  }

  return false;
}
