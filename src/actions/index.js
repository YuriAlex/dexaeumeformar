export const selectAtividade = (atividadeId) => {
    
    return {
        type: 'select_atividade',
        payload: atividadeId
    };
};

export const selectClass = (doneClass) => {
    
    return{ 
        type:'select_class',
        payload: doneClass
    };
};
