import { call, fork, put, take } from "redux-saga/effects";
import { 
  GET_SERVICE_CATEGORIES_REQUEST,
  GetServiceCategoriesRequestAction,
  ServiceCategory 
} from "./types";
import { callRequest } from "../../utils/ApiSauce";
import { API_SERVICE_CATEGORY } from "../../config/WebService";
import { showErrorToast } from "../../services/toastHandler";
import { serviceCategoriesSuccess, serviceCategoriesFailure } from "./actions";

interface ServiceCategoriesResponse {
  data: ServiceCategory[];
  page: number;
}

function* watchGetServiceCategoriesRequest() {
  while (true) {
    const action: GetServiceCategoriesRequestAction = yield take(
      GET_SERVICE_CATEGORIES_REQUEST
    );

    try {
      const response: ServiceCategoriesResponse = yield call(
        callRequest, 
        API_SERVICE_CATEGORY, 
        action.payload
      );

      const { data } = response;

      yield put(serviceCategoriesSuccess(data ?? []));

      if (action.callback) {
        action.callback(data ?? []);
      }
    } catch (err: any) {
      yield put(serviceCategoriesFailure(err.message));
      showErrorToast(err.message);
    }
  }
}

export default function* root() {
  yield fork(watchGetServiceCategoriesRequest);
}
