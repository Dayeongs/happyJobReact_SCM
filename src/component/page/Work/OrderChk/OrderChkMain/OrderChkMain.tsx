import {
    StyledTable,
    StyledTd,
    StyledTh,
} from "../../../../common/styled/StyledTable";
import { OrderChkMainStyled } from "./styled";
import { useContext, useEffect, useState } from "react";
import { OrderChkApi } from "../../../../../api/api";
import { OrderChkContext } from "../../../../../api/provider/OrderChkProvider";
import { postOrderChkApi } from "../../../../../api/postOrderChkApi";
import { fomatDate } from "../../../../../common/fomatData";
import {
    ISearchOrderChk,
    ISearchOrderChkList,
} from "../../../../../models/interface/Work/WorkModel";

export const OrderChkMain = () => {
    const searchKeyword = useContext(OrderChkContext);
    const [orderChkList, setOrderChkList] = useState<ISearchOrderChkList[]>();

    useEffect(() => {
        searchOrderChkList();
    }, [searchKeyword]);

    const searchOrderChkList = async () => {
        const postSearchOrderChk = await postOrderChkApi<ISearchOrderChk>(
            OrderChkApi.orderListJson,
            searchKeyword.searchKeyword
        );

        if (postSearchOrderChk) {
            setOrderChkList(postSearchOrderChk?.list);
        }
    };

    return (
        <OrderChkMainStyled>
            <StyledTable>
                <colgroup>
                    <col width="10%" />
                    <col width="10%" />
                    <col width="10%" />
                    <col width="15%" />
                    <col width="5%" />
                    <col width="15%" />
                    <col width="10%" />
                    <col width="5%" />
                    <col width="5%" />
                </colgroup>
                <thead>
                    <tr>
                        <StyledTh size={5}>발주번호</StyledTh>
                        <StyledTh size={5}>발주회사</StyledTh>
                        <StyledTh size={5}>제품명</StyledTh>
                        <StyledTh size={5}>가격</StyledTh>
                        <StyledTh size={5}>개수</StyledTh>
                        <StyledTh size={7}>총액</StyledTh>
                        <StyledTh size={5}>주문날짜</StyledTh>
                        <StyledTh size={13}>임원승인여부</StyledTh>
                        <StyledTh size={15}>입금확인</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {orderChkList && orderChkList?.length > 0 ? (
                        orderChkList.map((a) => {
                            return (
                                <tr key={a.seq}>
                                    <StyledTd>{a.seq}</StyledTd>
                                    <StyledTd>{a.company_name}</StyledTd>
                                    <StyledTd>{a.product_name}</StyledTd>
                                    <StyledTd>
                                        {a.item_price.toLocaleString("ko-KR")}원
                                    </StyledTd>
                                    <StyledTd>
                                        {a.order_count.toLocaleString("ko-KR")}
                                    </StyledTd>
                                    <StyledTd>
                                        {a.total_price.toLocaleString("ko-KR")}
                                        원
                                    </StyledTd>
                                    <StyledTd>
                                        {fomatDate(a.order_date)}
                                    </StyledTd>
                                    <StyledTd>
                                        {a.signYN === "N" ? (
                                            <span style={{ color: "red" }}>
                                                {a.signYN}
                                            </span>
                                        ) : (
                                            <span style={{ color: "blue" }}>
                                                {a.signYN}
                                            </span>
                                        )}
                                    </StyledTd>
                                    <StyledTd>
                                        {a.depositYN === "N" ? (
                                            <span style={{ color: "red" }}>
                                                {a.depositYN}
                                            </span>
                                        ) : (
                                            <span style={{ color: "blue" }}>
                                                {a.depositYN}
                                            </span>
                                        )}
                                    </StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={9}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
        </OrderChkMainStyled>
    );
};
