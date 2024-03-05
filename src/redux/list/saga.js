import { call, put, takeLatest} from 'redux-saga/effects';
import { listActons } from './reducer';
import listApis from '../../apis/list';
function* getList({payload:query}) {
    try {
         const data = yield call(listApis.getAll,query);
    yield put(listActons.getListSuccess(data));
    } catch (error) {
       yield put(listActons.getListFailed(error)); 
    }
   
}

function* getListById({payload:id}) {
    try {
         const data = yield call(listApis.getById,id);
    yield put(listActons.getByIdSuccess(data));
    } catch (error) {
       yield put(listActons.getByIdFailed(error)); 
    }
}

export default function* rootSaga() {
    yield takeLatest(listActons.getListRequest, getList);
    yield takeLatest(listActons.getByIdRequest, getListById);
}