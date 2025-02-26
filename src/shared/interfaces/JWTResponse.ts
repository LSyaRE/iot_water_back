/**
 * Interfaz utiliaria para tipar la response del JWT
 * @author  Jonas Villacis <javillacis@luminesway.com>
 * @version 1.0 28-03-2025
 *
 */
export interface JWTResponse {
  sub: number;
  username: string;
  iat: number;
  exp: number;
}
