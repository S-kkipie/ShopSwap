export interface Token {
    status: boolean;
    address: string;
    role: string;
    id: number;
    email: string;
    picture: string;
    username: string;
    sub: string;
    iat: number;
    exp: number;
    provider: string;
    city: string;
    country: string;
}
