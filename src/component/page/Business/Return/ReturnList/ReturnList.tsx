import { StyledTable, StyledTd, StyledTh } from "../../../../common/styled/StyledTable";
import { ReturnListStyled } from "./styled";
import { useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { useEffect, useState } from "react";
import { fomatDate } from "../../../../../common/fomatData";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { Protal } from "../../../../common/potal/Portal";
import { ReturnModal } from "../ReturnModal/ReturnModal";
import { IReturnList, IReturnListResponse } from "../../../../../models/interface/Business/ReturnModel";
import { postBusinessApi } from "../../../../../api/postBusinessApi";
import { BusinessReturnApi } from "../../../../../api/api";

export const ReturnList = () => {
    const { search } = useLocation();
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [returnList, setReturnList] = useState<IReturnList[]>([]);
    const [returnCnt, setReturnCnt] = useState<number>(1);
    const [currentParam, setCurrentParam] = useState<number | undefined>();
    const [seq, setSeq] = useState<number>(0);
    const [detail, setDetail] = useState<IReturnList>();

    useEffect(() => {
        searchObtainList();
    }, [search]);

    const searchObtainList = async (cpage?: number) => {
        cpage = cpage || 1;
        const searchParam = new URLSearchParams(search);

        searchParam.append("currentPage", cpage.toString());
        searchParam.append("pageSize", "10");

        const postReturnList = await postBusinessApi<IReturnListResponse>(BusinessReturnApi.returnListJson, {
            searchTitle: searchParam.get("searchTitle"),
            searchStDate: searchParam.get("searchStDate"),
            searchEdDate: searchParam.get("searchEdDate"),
            currentPage: cpage,
            pageSize: 5,
        });

        if (postReturnList) {
            setReturnList(postReturnList.list);
            setReturnCnt(postReturnList.totalCnt);
            setCurrentParam(cpage);
        }
    };

    const openModal = (seq: number) => {
        setModal(!modal);
        setSeq(seq);
    };
    const moneyFormat = (price: number) => {
        const formattedNumber = price.toLocaleString("en-US");

        return `${formattedNumber} 원`;
    };

    return (
        <ReturnListStyled>
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={9}>반품신청일</StyledTh>
                        <StyledTh size={6}>제품명</StyledTh>
                        <StyledTh size={5}>수량</StyledTh>
                        <StyledTh size={11}>금액</StyledTh>
                        <StyledTh size={10}>담당자</StyledTh>
                        <StyledTh size={8}>고객명</StyledTh>
                        <StyledTh size={7}>은행명</StyledTh>
                        <StyledTh size={9}>계좌번호</StyledTh>
                        <StyledTh size={9}>완료일</StyledTh>
                        <StyledTh size={6}>지시서</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {returnList.length > 0 ? (
                        returnList.map((a, i) => {
                            return (
                                <tr key={i}>
                                    <StyledTd>{fomatDate(a.return_order_date)}</StyledTd>
                                    <StyledTd>{a.item_name}</StyledTd>
                                    <StyledTd>{a.return_count}</StyledTd>
                                    <StyledTd>{moneyFormat(a.return_count * a.item_price)}</StyledTd>
                                    <StyledTd>{a.refund_bank_name}</StyledTd>
                                    <StyledTd>{a.cust_name}</StyledTd>
                                    <StyledTd>{a.refund_bank}</StyledTd>
                                    <StyledTd>{a.refund_bank_num}</StyledTd>
                                    {a.return_processing_date ? <StyledTd>{fomatDate(a.return_processing_date)}</StyledTd> : <StyledTd></StyledTd>}
                                    <StyledTd>
                                        <button
                                            onClick={() => {
                                                openModal(a.seq);
                                                setDetail(a);
                                            }}
                                        >
                                            작성
                                        </button>
                                    </StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <></>
                    )}
                </tbody>
            </StyledTable>
            {<PageNavigate totalItemsCount={returnCnt} onChange={searchObtainList} itemsCountPerPage={10} activePage={currentParam as number}></PageNavigate>}
            {modal ? (
                <Protal>
                    <ReturnModal seq={seq} detail={detail} />
                </Protal>
            ) : null}
        </ReturnListStyled>
    );
};
