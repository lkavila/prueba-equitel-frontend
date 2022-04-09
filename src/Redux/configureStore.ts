import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';
import { loadFromLocalStorage, saveToLocalStorage } from './localStorage';

export default function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const store = createStore(
        reducers,
        loadFromLocalStorage(),
        compose(applyMiddleware(sagaMiddleware)),
    );
    sagaMiddleware.run(rootSaga);
    store.subscribe(() => saveToLocalStorage(store.getState()));
    return store;
}