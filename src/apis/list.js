import { get } from "lodash";
import requester from "~/api/requester";

const listApis = {
    getAll: (query) => requester.get(`/api/v1/product-group`, query),
    getAllPublic: () => requester.get(`/api/v1/product-group-all`),
    getById: (id) =>  requester.get(`/api/v1/product-group/${id}`),
    create: (data) => requester.post(`/api/v1/product-group`, data),
    update: (data) => requester.put(`/api/v1/product-group/${get(data,'id')}`, data),
    delete: (id) => requester.delete(`/api/v1/product-group/${id}`),
}
export default listApis;
