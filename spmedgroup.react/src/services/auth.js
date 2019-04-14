export const usuarioAutenticado = () => localStorage.getItem('usuario-spmed') !== null;

export function sair(props){ 
    localStorage.removeItem('usuario-spmed');
};