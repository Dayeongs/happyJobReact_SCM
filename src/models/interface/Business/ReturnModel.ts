export interface IReturnModalProps{
    seq : number;
    detail? : IReturnList;
}

export interface IReturnModalResponse{
    list : IReturnDetailList;
    cnt : number;
}

export interface IReturnDetailList{
    cust_id:number;
    item_code:string;
    refund_bank:string;
    refund_bank_name:string;
    refund_bank_num: string;
    return_count: number;
    return_order_date: number;
    seq:number;
    signYN:string;
    storage_code:string;
}

export interface IDeliveryMan{
    name:string;
}

export interface IStorageInfo{
    inventory_count:number;
    storage_code:string;
    storage_name:string;
}

export interface IDelivery{
    delivery_date:number;
    delivery_end_loc: string;
    delivery_name: string;
    delivery_num: number;
    delivery_state: string;
    item_code: string;
    obtain_count: number;
    seq: number;
    storage_code:string;
    storage_name: string;
}
export interface IReturnList{
    storage_loc:string;
    storage_detail_loc:string;
    obtain_date:number;
    cust_addr:string;
    cust_detail_addr:string;
    seq:number
    storage_code:string;
    cust_name:string;
    item_code:string;
    item_name:string;
    return_count:number;
    item_price:number;
    return_order_date:number;
    return_processing_date:number;
    signYN:string;
    refund_bank:string;
    refund_bank_num:number;
    refund_bank_name:string;
}

export interface IReturnListResponse{
    list: IReturnList[]
    totalCnt:number;
}
