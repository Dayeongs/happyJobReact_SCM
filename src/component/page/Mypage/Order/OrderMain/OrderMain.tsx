import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { fomatDate } from "../../../../../common/fomatData";

export interface IOrderList {
    seq: number;
    item_code: string;
    item_name: string;
    obtain_date: number;
    obtain_count: number;
    item_price: number;
    delivery_date: number;
    returnYN: string;
}

export interface IOrderListJsonResponse {
    orderCnt: number;
    orderList: IOrderList[];
}

export const OrderMain = () => {
    const { search } = useLocation();
    const [orderList, setOrderList] = useState<IOrderList[]>([]);
    const [listCount, setListCount] = useState<number>(0);
    const [currentParam, setCurrentParam] = useState<number | undefined>();

    useEffect(() => {
        searchOrderList();
    }, [search]);

    const searchOrderList = (cpage?: number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        searchParam.append("cpage", cpage.toString());
        searchParam.append("pageSize", "5");

        axios.post("/mypage/orderHistoryJson.do", searchParam).then((res: AxiosResponse<IOrderListJsonResponse>) => {
            setOrderList(res.data.orderList);
            setListCount(res.data.orderCnt);
            setCurrentParam(cpage);
        });
    };

    const returnBtn = (seq?: Number) => {

    }

    return (
        <>
            총 갯수 : {listCount} 현재 페이지 : {currentParam}
            <StyledTable>
                <colgroup>
                    <col width="10%" />
                    <col width="25%" />
                    <col width="15%" />
                    <col width="10%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="10%" />
                </colgroup>
                <thead>
                    <tr>
                        <StyledTh>제품코드</StyledTh>
                        <StyledTh>제품명</StyledTh>
                        <StyledTh>주문일</StyledTh>
                        <StyledTh>주문수량</StyledTh>
                        <StyledTh>금액</StyledTh>
                        <StyledTh>배송일</StyledTh>
                        <StyledTh>반품여부</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {orderList.length > 0 ? (
                        orderList?.map((a) => {
                            return (
                                <tr key={a.seq}>
                                    <StyledTd>{a.item_code}</StyledTd>
                                    <StyledTd>{a.item_name}</StyledTd>
                                    <StyledTd>{fomatDate(a.obtain_date)}</StyledTd>
                                    <StyledTd>{a.obtain_count}</StyledTd>
                                    <StyledTd>{(a.obtain_count * a.item_price).toLocaleString("ko-kr")} 원</StyledTd>
                                    <StyledTd>{a.delivery_date ? fomatDate(a.delivery_date) : '배송 전'}</StyledTd>
                                    <StyledTd>{a.returnYN}</StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={7}>데이터가 없습니다.</StyledTd>
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
