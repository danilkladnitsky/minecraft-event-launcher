import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import { Roles } from "src/const";

const jwt = require("jsonwebtoken");


@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }
    
    validateRequest(request) {
        const { authorization } = request.headers;
        
        if (!authorization) {
            return false;
        }

        const token: string = authorization.split("Bearer")[1].trim();
        
        try{
            const { role }: { role: Roles } = jwt.verify(token, process.env.JWT_TOKEN);
            
            if (role === "admin") return true;
            return false;
        }catch(err){
            return false;
        }
    }
}
