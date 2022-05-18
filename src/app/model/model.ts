
/**
 * Modelo para el objeto usuario
 */
export interface UserI {
    name: string;
    age: number;
    email: string;
    uid: string;
    password: string;
    roles: 'usuario' | 'admin';
}