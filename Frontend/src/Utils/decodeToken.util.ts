import {jwtDecode} from 'jwt-decode';
import {Settings, DateTime} from "luxon";
import {Token} from "@/Interfaces/Token.ts";

export const tokenDecode = (token: string) => {
    return jwtDecode<Token>(token);
}
export const expToken = (token: string): boolean => {
    Settings.defaultZone = 'America/Bogota';
    Settings.defaultLocale = 'es';
    const { exp} = tokenDecode(token);
    const now = DateTime.now().toMillis();
    return exp! * 1000 <= now;
}