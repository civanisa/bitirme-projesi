export class JwtResponse {
    id: bigint;
    accessToken: string;
    type: string;
    username: string;
    authorities: string[];
}
