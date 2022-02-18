const { JWT_SECRET, JWT_EXPIRATION, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRATION } = process.env;
const defaultSecret = `|gzD>JXX&hOBI9?r1YV:?.Ty>fOa+[%BENl4(qCR0VQ;P#1d7?ocp_pU?;yu>}`;
const defaultRefreshSecret = `pIn=<e@-|nT4nPCE9afBV*xc9FBftlUJoJqAB_saF/hTfj2EF0tXAatxA.A%@]BW`;

export const JwtSecret = JWT_SECRET || defaultSecret;
export const JwtExpireDuration = JWT_EXPIRATION || '30d';
export const JwtRefreshTokenSecret = JWT_REFRESH_SECRET || defaultRefreshSecret;
export const JwtRefreshExpireDuration = JWT_REFRESH_EXPIRATION || '120d';
