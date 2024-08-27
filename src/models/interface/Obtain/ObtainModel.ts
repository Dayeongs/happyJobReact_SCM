export interface IObtainModalProps{
    seq: number;
}

export interface IDeliveryMan{
    name:string;
}

export interface IStorageInfo{
    inventory_count:number;
    storage_code:string;
    storage_name:string;
}

export interface IFindDeliveryStatus{
    delivery_num?:number;
    delivery_date?:number;
    item_name?: string;
    obtain_count?:number;
    storage_name?:string;
    storage_loc?:string;
    delivery_end_loc?: string;
    delivery_name?:string;
    status?:string;
}

export interface findstatusJsonResponse{
    list: IFindDeliveryStatus;
    status?: number;
}export interface IObtainList{
    addr:string;
    cust_name:string;
    depositYN:string;
    inventory_count: number;
    item_code: string;
    item_name:string;
    obtain_count: number;
    obtain_date:number;
    seq: number;
}

export interface IObtainDetail{
    addr:string;
    cust_name:string;
    depositYN:string;
    inventory_count: number;
    item_code: string;
    item_name:string;
    obtain_count: number;
    obtain_date:number;
    seq: number;
}

export interface IObtainListJsonResponse{
    list: IObtainList[];
    obtainListCnt :number;
}