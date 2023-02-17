import { request, requestConfig, requestConfigXlsxDownload, requestConfigFileUpload } from "./index";


export class BoughtItemsRequest {
    // GET
    getItems(params: any) { return request.get("/api/web/v1/items/bought/", requestConfig(params)); }
    getItemsExcel(params: any) { return request.get("/api/web/v1/items/bought/excel/", requestConfigXlsxDownload(params)); }
    getItemsExcelTemplate() { return request.get("/api/web/v1/items/bought/excel-template/", requestConfigXlsxDownload(null)); }
    getItemsId(id: Number) { return request.get(`/api/web/v1/items/bought/${id}/`, requestConfig(null)); }
    getItemsIdChangelog(id: Number) { return request.get(`/api/web/v1/items/bought/${id}/changelog/`, requestConfig(null)); }

    // POST
    postItems(data: object) { return request.post("/api/web/v1/items/bought/", requestConfig(null), data); }
    postItemsExcel(formData: FormData) { return request.post("/api/web/v1/items/bought/excel/", requestConfigFileUpload(null), formData); }

    // PUT
    putItems(id: Number, data: any) { return request.put(`/api/web/v1/items/bought/${id}/`, requestConfig(null), data) }
    putItemsStatus(id: Number, status: string) {
        const params = new URLSearchParams();
        params.append("status", status);
        return request.put(`/api/web/v1/items/bought/${id}/status/`, requestConfig(params), null);
    }
    putItemsGroup1(id: Number, group: any) {
        const params = new URLSearchParams();
        params.append("group", group);
        return request.put(`/api/web/v1/items/bought/${id}/group-1/`, requestConfig(params), null);
    }
    putItemsProject(id: Number, project: any) {
        const params = new URLSearchParams();
        params.append("project", project);
        return request.put(`/api/web/v1/items/bought/${id}/project/`, requestConfig(params), null);
    }
    putItemsMachine(id: Number, machine: any) {
        const params = new URLSearchParams();
        params.append("machine", machine);
        return request.put(`/api/web/v1/items/bought/${id}/machine/`, requestConfig(params), null);
    }
    putItemsQuantity(id: Number, quantity: any) {
        const params = new URLSearchParams();
        params.append("quantity", quantity);
        return request.put(`/api/web/v1/items/bought/${id}/quantity/`, requestConfig(params), null);
    }
    putItemsPartnumber(id: Number, partnumber: any) {
        const params = new URLSearchParams();
        params.append("partnumber", partnumber);
        return request.put(`/api/web/v1/items/bought/${id}/partnumber/`, requestConfig(params), null);
    }
    putItemsDefinition(id: Number, definition: any) {
        const params = new URLSearchParams();
        params.append("definition", definition);
        return request.put(`/api/web/v1/items/bought/${id}/definition/`, requestConfig(params), null);
    }
    putItemsManufacturer(id: Number, manufacturer: any) {
        const params = new URLSearchParams();
        params.append("manufacturer", manufacturer);
        return request.put(`/api/web/v1/items/bought/${id}/manufacturer/`, requestConfig(params), null);
    }
    putItemsSupplier(id: Number, supplier: any) {
        const params = new URLSearchParams();
        params.append("supplier", supplier);
        return request.put(`/api/web/v1/items/bought/${id}/supplier/`, requestConfig(params), null);
    }
    putItemsNoteGeneral(id: Number, note: any) {
        const params = new URLSearchParams();
        params.append("note", note);
        return request.put(`/api/web/v1/items/bought/${id}/note-general/`, requestConfig(params), null);
    }
    putItemsNoteSupplier(id: Number, note: any) {
        const params = new URLSearchParams();
        params.append("note", note);
        return request.put(`/api/web/v1/items/bought/${id}/note-supplier/`, requestConfig(params), null);
    }
    putItemsDesiredDeliveryDate(id: Number, date: any) {
        const params = new URLSearchParams();
        params.append("date", date);
        return request.put(`/api/web/v1/items/bought/${id}/desired-delivery-date/`, requestConfig(params), null);
    }
    putItemsExpectedDeliveryDate(id: Number, date: any) {
        const params = new URLSearchParams();
        params.append("date", date);
        return request.put(`/api/web/v1/items/bought/${id}/expected-delivery-date/`, requestConfig(params), null);
    }
    putItemsStorage(id: Number, storage: any) {
        const params = new URLSearchParams();
        params.append("storage_place", storage);
        return request.put(`/api/web/v1/items/bought/${id}/storage/`, requestConfig(params), null);
    }

    // DELETE
    deleteItemsId(id: Number) { return request.delete(`/api/web/v1/items/bought/${id}/`, requestConfig(null)) }
}

export const boughtItemsRequest = new BoughtItemsRequest();
