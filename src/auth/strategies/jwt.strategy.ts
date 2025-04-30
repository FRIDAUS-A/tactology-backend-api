import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { AuthJwtPayload } from "../types/auth-jwt-payload";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(configService: ConfigService, private authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.getOrThrow("JWT_SECRET"),
			ignoreExpiration: false,
		})
	}

	validate(payload: AuthJwtPayload) {
		const { id } = payload.sub;
		const jwtUser = this.authService.validateUser(id);

		return jwtUser;
	}
}


// assess it with req.user