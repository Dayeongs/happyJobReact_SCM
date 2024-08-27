export interface IDeliveryList{
    delivery_date:number;
    delivery_end_loc: string;
    delivery_name: string;
    delivery_num: number;
    delivery_start_loc: string;
    delivery_state: string;
    obtain_count: number;
}

export interface IDeliveryListRes{
    list : IDeliveryList[];
    cnt: number;
}