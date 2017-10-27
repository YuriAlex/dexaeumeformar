import { combineReducers } from 'redux';
import AtividadesReducer from './AtividadesReducer';
import AtivSelectionReducer from './AtivSelectionReducer';
import ClassCheckedReducer from './ClassCheckedReducer';

export default combineReducers(
    {
        atividades: AtividadesReducer,
        atividadeSelectedId: AtivSelectionReducer,
        classChecked: ClassCheckedReducer
    }
);
