import { Rol, UserModel } from './userModel.model';

export type LoginModel = {
  result:           Result;
  token:            string;
  parametrizations: number[];
  loggedIn:         boolean;
}

export type Result = {
  usuario: UserModel;
}

export interface LoggedUser {
  usuario:       string;
  nombre:        string;
  acceso:        number;
  vigente:       boolean;
  Rol:           Rol;
  imageUrl:      string;
  cliente:       string;
  codigoCliente: string;
}