import { message } from "antd";
import { forIn, get, groupBy, keys } from "lodash";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export const getExistProp = (data) => {
    const result = Object.keys(data).reduce((nextData, key) => {
      if (data[key]) {
        return {
          ...nextData,
          [key]: data[key],
        };
      }
  
      return nextData;
    }, {});
  
    return result;
  };

  export const clearQuerySearch = (
    listOptionSearch,
    query,
    param
  ) => {
    // group listOptionSearch by value
    const groupByKey = groupBy(listOptionSearch, (e) => get(e, "value"));
    // loop query to remove all query in listOptionSearch  except param
    forIn(query, (values, key, obj) => {
      if (groupByKey[key] && keys(param)?.some((e) => groupByKey[e])) {
        obj[key] = null;
      }
    });
  };

  export const getPaging = (response) => ({
    current: response.page,
    pageSize: response.limit,
    total: response.totalDocs,
  });
  export const useQueryParams = () => {
    return new URLSearchParams(useLocation().search);
  };
  export const getSelectors = (moduleName) => {
    const getSelector = (key) => (state) => state[moduleName][key];
  
    return {
      loadingSelector: getSelector('isLoading'),
      listSelector: getSelector('list'),
      getListFailedSelector: getSelector('getListFailed'),
  
      getByIdLoadingSelector: getSelector('isGetByIdLoading'),
      getByIdSelector: getSelector('byId'),
      getByIdFailedSelector: getSelector('getByIdFailed'),
  
      deleteSuccessSelector: getSelector('deleteSuccess'),
      deleteFailedSelector: getSelector('deleteFailed'),
  
      isSubmitLoadingSelector: getSelector('isSubmitLoading'),
      createSuccessSelector: getSelector('createSuccess'),
      createFailedSelector: getSelector('createFailed'),
  
      updateSuccessSelector: getSelector('updateSuccess'),
      updateFailedSelector: getSelector('updateFailed'),
      pagingSelector: getSelector('paging')
    };
  };
  export const useSuccess = (
    successSelector,
    mess,
    onSuccess
  ) => {
    //   const {onNotify} = useNotificationStore();
    const success = useSelector(successSelector);
    useEffect(() => {
      if (success) {
        if (mess) {
          message?.success(mess)
        }
  
        if (onSuccess) {
          onSuccess(success)
        }
      }
    }, [success, mess, onSuccess]);
  };
  
  export const useFailed = (
    failedSelector,
    mess,
    onFailed,
    mute = false
  )=> {
    const failed = useSelector(failedSelector);
    // const {onNotify} = useNotificationStore();
    useEffect(() => {
      if (failed && !mute) {
          message?.error(
          mess || failed?.response?.data?.message || 'Something went wrong!',
        );
      }
  
      if (onFailed) onFailed(failed);
    }, [failed, mess, mute, onFailed]);
  };
  export const useFetchByParam = (props)=> {
    const {
      action,
      dataSelector,
      failedSelector,
      loadingSelector,
      param,
      muteOnFailed,
      actionUpdate,
      reFetch,
    } = props;
  
    const dispatch = useDispatch();
    const data = useSelector(dataSelector);
    const isLoading = useSelector(loadingSelector);
  
    useEffect(() => {
      if (param) dispatch(action(param));
    }, [dispatch, action, param,reFetch]);
  
    useFailed(failedSelector, undefined, undefined, muteOnFailed);
  
    const useUpdateData = (dataUpdate) => {
      if (actionUpdate && typeof actionUpdate === 'function') {
        dispatch(actionUpdate(dataUpdate));
      }
    };
  
    return [data, isLoading, useUpdateData];
  };