/**
 * Funciones utilitarias que nos permiten agregar mensajes personalizados en las validaciones
 * @author  Jonas Villacis <javillacis@luminesway.com>
 * @version 1.0 28-03-2025
 *
 */
export const isEmptyMessage = (field: string) =>
  `El campo ${field} no debe estar vacio.`;
export const isEmailMessage = () => `Debe ser un correo válido`;
export const isStringMessage = (field: string) =>
  `El campo ${field} deben ser de tipo caracteres`;
export const minLengthMessage = (field: string, length: number) =>
  `El campo ${field} deben tener al menos ${length} caracteres`;
