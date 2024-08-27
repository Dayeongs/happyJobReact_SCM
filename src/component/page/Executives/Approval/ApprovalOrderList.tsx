import { useEffect, useState } from "react";
import { StyledTable, StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import { PageNavigate } from "../../../common/pageNavigation/PageNavigate";
import axios, { AxiosResponse } from "axios";
import { Protal } from "../../../common/potal/Portal";
import { ApprovalOrderModal } from "./ApprovalOrderModal";
import { useRecoilState } from "recoil";
import { orderModalState } from "../../../../stores/modalState";
import { ApprovalButtonStyled } from "./styled";

// 발주승인 리스트
export interface IOrderList {
    product_name: string;
    order_date: string;
    order_count: number;
    company_name: string;
    provide_value: number;
    sum: number;
    signYN: string;
    seq: number;
}

export interface IOrderListResponse {
    orderListCount: number;
    orderList: IOrderList[];
}

export const ApprovalOrderList = () => {
    const [orderList, setOrderList] = useState<IOrderList[]>([]);
    const [orderListCount, setOrderListCount] = useState<number>(0);
    const [orderModal, setOrderModal] = useRecoilState<boolean>(orderModalState);
    const [orderSeq, setOrderSeq] = useState<number>();
    const [currentParam, setCurrentParam] = useState<number | undefined>();
    const [selectedOption, setSelectedOption] = useState<string | undefined>("");

    useEffect(() => {
        searchOrderList();
    }, []);

    const searchOrderList = (cpage?: number, signYN?: string) => {
        cpage = cpage || 1;
        signYN = signYN || "";
        const searchParam = new URLSearchParams();

        searchParam.append("cpage", cpage.toString());
        searchParam.append("pageSize", "5");
        searchParam.append("signYN", signYN);

        axios.post("/executives/orderApprovalJson", searchParam).then((res: AxiosResponse<IOrderListResponse>) => {
            setOrderList(res.data.orderList);
            setOrderListCount(res.data.orderListCount);
            setCurrentParam(cpage);
        });
    };

    const handlerEvent = (signYN?: string) => {
        setSelectedOption(signYN);
        searchOrderList(1, signYN);
    };

    const handlerModal = (seq?: number) => {
        setOrderModal(!orderModal);
        setOrderSeq(seq);
    };

    const postSuccess = () => {
        setOrderModal(!orderModal);
        searchOrderList();
    };

    return (
        <>
            <div className={"orderRadioBt"} style={{ textAlign: "right", marginRight: 10 }}>
                <label>
                    <input
                        type="radio"
                        name="orderRadio"
                        onChange={() => handlerEvent("")}
                        checked={selectedOption === ""}
                    />
                    전체
                </label>
                <label>
                    <input
                        type="radio"
                        name="orderRadio"
                        onChange={() => handlerEvent("Y")}
                        checked={selectedOption === "Y"}
                    />
                    승인
                </label>
                <label>
                    <input
                        type="radio"
                        name="orderRadio"
                        onChange={() => handlerEvent("N")}
                        checked={selectedOption === "N"}
                    />
                    미승인
                </label>
            </div>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={15}>고객명</StyledTh>
                        <StyledTh size={20}>제품명</StyledTh>
                        <StyledTh size={15}>제품 공급가</StyledTh>
                        <StyledTh size={10}>개수</StyledTh>
                        <StyledTh size={20}>총액</StyledTh>
                        <StyledTh size={10}>주문날짜</StyledTh>
                        <StyledTh size={10}>승인여부</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {orderList.length > 0 ? (
                        orderList?.map((a) => {
                            return (
                                <tr key={a.seq}>
                                    <StyledTd>{a.company_name}</StyledTd>
                                    <StyledTd>{a.product_name}</StyledTd>
                                    <StyledTd>{a.provide_value.toLocaleString()}원</StyledTd>
                                    <StyledTd>{a.order_count.toLocaleString()}</StyledTd>
                                    <StyledTd>{a.sum.toLocaleString()}원</StyledTd>
                                    <StyledTd>{a.order_date}</StyledTd>
                                    <StyledTd>
                                        <ApprovalButtonStyled>
                                            <button
                                                disabled={a.signYN === "Y"}
                                                onClick={() => handlerModal(a.seq)}
                                                className={a.signYN === "Y" ? "disabled-button" : "enabled-button"}
                                            >
                                                {a.signYN === "Y" ? "승인완료" : "승인대기"}
                                            </button>
                                        </ApprovalButtonStyled>
                                    </StyledTd>
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
                totalItemsCount={orderListCount}
                onChange={searchOrderList}
                itemsCountPerPage={5}
                activePage={currentParam as number}
            ></PageNavigate>
            {orderModal ? (
                <Protal>
                    <ApprovalOrderModal
                        orderSeq={orderSeq}
                        onSuccess={postSuccess}
                        setOrderSeq={setOrderSeq}
                    ></ApprovalOrderModal>
                </Protal>
            ) : null}
        </>
    );
};
