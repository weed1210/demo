import { createFeatureSelector } from "@ngrx/store";
import { JwtPayload } from "../models/jwt-payload.model";

export const selectMember = createFeatureSelector<Readonly<JwtPayload>>('member');