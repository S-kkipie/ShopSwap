export interface GoogleCredential {
    aud:           string;
    azp:           string;
    email:         string;
    emailVerified: boolean;
    exp:           number;
    familyName:    string;
    givenName:     string;
    iat:           number;
    iss:           string;
    jti:           string;
    name:          string;
    nbf:           number;
    picture:       string;
    sub:           string;
}
