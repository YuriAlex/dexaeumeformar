export const selectAtividade = (atividadeId) => {
    return {
        type: 'select_atividade',
        payload: atividadeId
    };
};
