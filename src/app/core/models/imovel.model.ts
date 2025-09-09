export interface Imovel {
    id?: number;
    titulo: string;
    corretorId: number;
    tipo: string;
    cidade: string;
    preco: number;
    descricao: string;
    imagemUrl: string;
}