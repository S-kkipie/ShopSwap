export interface Token {
    status: boolean;
    address:  string;
    role:     string;
    id:       number;
    email:    string;
    username: string;
    sub:      string;
    iat:      number;
    exp:      number;
}
