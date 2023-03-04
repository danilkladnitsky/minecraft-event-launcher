const jwt = require("jsonwebtoken");

import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
        
    const { authorization } = request.headers;
    const token: string = authorization.split("Bearer")[1].trim();
    const { id }: { id: number } = jwt.verify(token, process.env.JWT_TOKEN);

    return id;
  }
);
