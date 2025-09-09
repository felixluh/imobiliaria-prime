export type TipoUsuario = 'cliente' | 'corretor';

export interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    tipo: TipoUsuario;
}