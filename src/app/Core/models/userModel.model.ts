import { TokenModel } from './tokenModel.model';

export interface UserModel {
  usuario: string;
  nombre: string;
  Rol: Rol;
  vigente: boolean;
  usuarioMedico: boolean;
  medico?: string | null;
  procedencia?: string;
  email: string;
  pruebasEspeciales?: boolean;
  inicio?: string;
  cliente: string;
  imageUrl: string;
  codigoCliente?: string | null;
}
export type Rol = {
  Rol: number;
  Nombre: string;
  Vigente: boolean;
  Permisos: string[];
};

export interface UsuarioLogueado {
  cliente: {
    codigoCliente: string;
    nombre: string;
    vigente: boolean;
    idVersion: number;
    versionFront: string;
    versionBack: string;
    local: boolean;
  };
  usuario: UserModel;
  token: TokenModel;
}
