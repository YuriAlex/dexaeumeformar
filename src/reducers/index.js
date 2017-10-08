import { combineReducers } from 'redux';
import AtividadesReducer from './AtividadesReducer';
import AtivSelectionReducer from './AtivSelectionReducer';

//atividadesReducer
//atvSelectionaReducer

export default combineReducers(
    {
        atividades: AtividadesReducer,
        ativSelection: AtivSelectionReducer
    }
);
