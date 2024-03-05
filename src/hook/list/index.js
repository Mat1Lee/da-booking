import { get } from "lodash";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clearQuerySearch, getExistProp, getSelectors, useFetchByParam, useQueryParams } from "../../until";
import { listActons } from "../../redux/list/reducer";
import { useSelector } from "react-redux";


const {
    loadingSelector,
    listSelector,
    getListFailedSelector,
    getByIdLoadingSelector,
    getByIdSelector,
    getByIdFailedSelector,
    // deleteSuccessSelector,
    // deleteFailedSelector,
    // isSubmitLoadingSelector,
    // createSuccessSelector,
    // createFailedSelector,
    // updateSuccessSelector,
    // updateFailedSelector,
    pagingSelector,
  } = getSelectors('list');

export const useProductConfigQueryParams = () => {
    const query = useQueryParams();
    const limit = query.get("limit") || null;
    const page = query.get("page") || null;
    const keyword = query.get("keyword");
    const status = query.get("status");
    // const createSuccess = useSelector(createSuccessSelector);
    // const updateSuccess = useSelector(updateSuccessSelector);
    // const deleteSuccess = useSelector(deleteSuccessSelector);
    return useMemo(() => {
      const queryParams = {
        page,
        limit,
        keyword,
        status,
      };
      return [queryParams];
      //eslint-disable-next-line
    }, [page, limit,status, keyword]);
  };
  
  export const useUpdateProductConfigParams = (
    query,
    listOptionSearch
  ) => {
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const [keyword, setKeyword] = useState(get(query, "keyword"));
    useEffect(() => {
      setKeyword(get(query, "keyword"));
    }, [query]);
    const onParamChange = (param) => {
      // Clear Search Query when change Params
      clearQuerySearch(listOptionSearch, query, param);
  
      if (!param.page) {
        query.page = 1;
      }
  
      // Convert Query and Params to Search Url Param
      const searchString = new URLSearchParams(
        getExistProp({
          ...query,
          ...param,
        })
      ).toString();
  
      // Navigate
      navigate(`${pathname}?${searchString}`);
    };
  
    return [keyword, { setKeyword, onParamChange }];
  };

  export const useGetlistProductConfig = (query) => {
    return useFetchByParam({
      action: listActons.getListRequest,
      loadingSelector: loadingSelector,
      dataSelector: listSelector,
      failedSelector: getListFailedSelector,
      param: query,
    })
}
export const useGetlistProductConfigById = (id) => {
  return useFetchByParam({
    action: listActons.getByIdRequest,
    loadingSelector: getByIdLoadingSelector,
    dataSelector: getByIdSelector,
    failedSelector: getByIdFailedSelector,
    param: id,
  });
};
export const useProductConfigPaging = () => useSelector(pagingSelector);