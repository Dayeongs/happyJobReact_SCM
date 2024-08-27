import { useContext, useEffect, useState } from "react";
import { StyledTable, StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import { InquiryContext } from "../../../../api/provider/InquiryProvider";
import { postInquiryApi } from "../../../../api/postInquiryApi";
import { InquiryApi } from "../../../../api/api";
import { PageNavigate } from "../../../common/pageNavigation/PageNavigate";
import { fomatDate } from "../../../../common/fomatData";
import { useNavigate } from "react-router-dom";
import { InquiryModal } from "../InquiryModal/InquiryModal";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";

export interface IInquiry {
    seq: string;
    loginID: string;
    post_title: string;
    post_text: string;
    post_date: number;
    category_code: string;
    category_name: string;
    answer_title: string;
    answer_text: string;
    answer_date: string;
}

export interface ISearchInquriry {
    inquiryList: IInquiry[];
    inquiryCnt: number;
}

export const InquiryMain = () => {
    const { searchKeyword } = useContext(InquiryContext);
    const [inquiryList, setInquiryList] = useState<IInquiry[]>();
    const [totalCnt, setTotalCnt] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>();
    const navigate = useNavigate();
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    useEffect(() => {
        searchInquiry();
    }, [searchKeyword]);

    const searchInquiry = async (cpage?: number) => {
        cpage = cpage || 1;
        const postSearchInquiry = await postInquiryApi<ISearchInquriry>(InquiryApi.listInquiryJson, {
            ...searchKeyword,
            currentPage: cpage,
            pageSize: 15,
        });
        if (postSearchInquiry) {
            setInquiryList(postSearchInquiry.inquiryList);
            setTotalCnt(postSearchInquiry.inquiryCnt);
            setCurrentPage(cpage);
        }
    };

    const onPostSuccess = () => {
        setModal(!modal);
        searchInquiry();
    };

    return (
        <>
            <StyledTable>
                <colgroup>
                    <col width="10%" />
                    <col width="45%" />
                    <col width="15%" />
                    <col width="15%" />
                    <col width="15%" />
                </colgroup>
                <thead>
                    <tr>
                        <StyledTh>번호</StyledTh>
                        <StyledTh>제목</StyledTh>
                        <StyledTh>분류</StyledTh>
                        <StyledTh>날짜</StyledTh>
                        <StyledTh>작성자</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {inquiryList && inquiryList.length > 0 ? (
                        inquiryList.map((inquiry) => {
                            return (
                                <tr
                                    key={inquiry.seq}
                                    onClick={() => {
                                        // seq는 number 타입, navigate는 문자열 URL 경로를 사용하므로, 숫자를 문자열로 변환해야 한다.
                                        // `${inquiry.seq}` 또는 inquiry.seq.toString()을 사용하여 문자열로 변환한다.
                                        navigate(`${inquiry.seq}`);
                                    }}
                                >
                                    <StyledTd>{inquiry.seq}</StyledTd>
                                    <StyledTd>{inquiry.post_title}</StyledTd>
                                    <StyledTd>{inquiry.category_name}</StyledTd>
                                    <StyledTd>{fomatDate(inquiry.post_date)}</StyledTd>
                                    <StyledTd>{inquiry.loginID}</StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={5}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <PageNavigate totalItemsCount={totalCnt} onChange={searchInquiry} itemsCountPerPage={15} activePage={currentPage as number}></PageNavigate>
            <InquiryModal onPostSuccess={onPostSuccess}></InquiryModal>
        </>
    );
};
