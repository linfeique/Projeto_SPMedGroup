export const usuarioAutenticado = () => localStorage.getItem('usuario-spmed') !== null;

export function sair(){ 
    localStorage.removeItem('usuario-spmed');
};