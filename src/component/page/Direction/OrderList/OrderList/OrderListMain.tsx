import { useLocation } from "react-router-dom";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { fomatDate } from "../../../../../common/fomatData";

export interface IOrderList{
    item_code: string;
    item_name: string;
    order_company: string;
    order_date: number;
    order_count: number;
}

export interface IOrderListJsonResponse {
    listCount: number;
    orderList: IOrderList[];
}


export const OrderListMain = () => {
    const { search } = useLocation();
    const [orderList, setOrderList] = useState<IOrderList[]>([]);
    const [listCount, setListCount] = useState<number>(0);
    const [currentParam, setCurrentParam] = useState<number | undefined>();

    useEffect(() => {
        searchOrderList();
    }, [search]);


    const searchOrderList = (cpage?:number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        searchParam.append('cpage', cpage.toString());
        searchParam.append('pageSize', '5');

        axios.post('/direction/orderListJson.do', searchParam).then((res: AxiosResponse<IOrderListJsonResponse>) => {
            setOrderList(res.data.orderList);
            setListCount(res.data.listCount);
            setCurrentParam(cpage);
        })

    };


    return (
        <>
            총 갯수 : {listCount} 현재 페이지 : {currentParam}
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={14}>제품번호</StyledTh>
                        <StyledTh size={30}>제목</StyledTh>
                        <StyledTh size={20}>발주업체</StyledTh>
                        <StyledTh size={20}>날짜</StyledTh>
                        <StyledTh size={20}>수량</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {orderList.length > 0 ? (
                        orderList?.map((a) => {
                            return (
                                <tr>
                                    <StyledTd>{a.item_code}</StyledTd>
                                    <StyledTd>{a.item_name}</StyledTd>
                                    <StyledTd>{a.order_company}</StyledTd>
                                    <StyledTd>{fomatDate(a.order_date)}</StyledTd>
                                    <StyledTd>{a.order_count}</StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={3}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <PageNavigate
                totalItemsCount={listCount}
                onChange={searchOrderList}
                itemsCountPerPage={5}
                activePage={currentParam as number}
            ></PageNavigate>
        </>
    );

};