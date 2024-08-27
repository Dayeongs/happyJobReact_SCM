/* Common */
export interface ISearch {
    searchTitle: string;
    searchStDate: string;
    searchEdDate: string;
    searchSelect: string;
}

export const defaultSearchValue = {
    searchTitle: "",
    searchStDate: "",
    searchEdDate: "",
    searchSelect: "",
};

/* OrderChk */
export interface ISearchOrderChkList {
    company_name: string;
    depositYN: string;
    item_price: number;
    order_count: number;
    order_date: number;
    product_name: string;
    seq: number;
    signYN: string;
    total_price: number;
}

export interface ISearchOrderChk {
    list: ISearchOrderChkList[];
}

/* OrderChk-OrderChkSearch */
