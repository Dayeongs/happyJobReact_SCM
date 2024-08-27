import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { InquiryDetailMainStyled, InquiryDetailMainStyledTable } from "./styled";
import { ContentBox } from "../../../common/ContentBox/ContentBox";
import { Button } from "../../../common/Button/Button";
import { StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import { InquiryDetailReply } from "../InquiryDetailReply/InquiryDetailReply";
import { postInquiryApi } from "../../../../api/postInquiryApi";
import { InquiryApi } from "../../../../api/api";
import { useRecoilState } from "recoil";
import { loginInfoState } from "../../../../stores/userInfo";
import { modalState } from "../../../../stores/modalState";
import { InquiryReplyModal } from "../InquiryReplyModal/InquiryReplyModal";

export interface IInquiry {
    answer_date?: string;
    answer_text?: string;
    answer_title?: string;
    category_code?: string;
    category_name?: string;
    loginID?: string;
    post_count?: number;
    post_date?: string;
    post_text?: string;
    post_title?: string;
    seq?: number;
}

export interface IInquiryAnswer {
    answer_date: string;
    answer_text: string;
    answer_title: string;
    seq: number;
}

export interface ISearchInquriry {
    inquiryDetail: IInquiry;
    answerDetail: IInquiryAnswer;
}

export interface IInquriryCategory {
    category_code: string;
    category_name: string;
}

export interface ISearchInquriryCategory {
    categoryList: IInquriryCategory[];
}

export interface IPostResponse {
    result: "success";
}

export const InquiryDetailMain = () => {
    const { inquirySeq } = useParams();
    const [userInfo] = useRecoilState(loginInfoState);
    const [inquiryDetail, setInquiryDetail] = useState<IInquiry>();
    const [inquiryAnswer, setInquiryAnswer] = useState<IInquiryAnswer>();
    const [readOnly, setReadOnly] = useState<boolean>(true);
    const navigate = useNavigate();
    const [inquiryCategoryList, setInquiryCategoryList] = useState<IInquriryCategory[]>();
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    useEffect(() => {
        searchInquiryDetail();
        searchInquiryCategory();
    }, []);

    const searchInquiryDetail = async () => {
        const postSearchInquiryDetail = await postInquiryApi<ISearchInquriry>(InquiryApi.detailInquiryJson, { seq: inquirySeq });
        if (postSearchInquiryDetail) {
            if (postSearchInquiryDetail.inquiryDetail) setInquiryDetail(postSearchInquiryDetail.inquiryDetail);
            if (postSearchInquiryDetail.answerDetail) setInquiryAnswer(postSearchInquiryDetail.answerDetail);
        }
    };

    const searchInquiryCategory = async () => {
        const postSearchInquiryCategory = await postInquiryApi<ISearchInquriryCategory>(InquiryApi.listInquiryCategoryJson, {});
        if (postSearchInquiryCategory) {
            setInquiryCategoryList(postSearchInquiryCategory.categoryList);
        }
    };

    const handlerUpdate = async () => {
        const postUpdateInquiry = await postInquiryApi<IPostResponse>(InquiryApi.updateInquiryJson, { ...inquiryDetail, title: inquiryDetail?.post_title, content: inquiryDetail?.post_text });
        if (postUpdateInquiry && postUpdateInquiry.result === "success") {
            alert("수정이 완료되었습니다.");
            setReadOnly(true);
        }
    };

    const handlerDelete = async () => {
        if (!window.confirm("삭제 하시겠습니까?")) {
            return false;
        }

        const postDeleteInquiry = await postInquiryApi<IPostResponse>(InquiryApi.deleteInquiryJson, { seq: inquirySeq });
        if (postDeleteInquiry && postDeleteInquiry.result === "success") {
            alert("삭제되었습니다.");
            navigate("/react/board/inquiry.do", { replace: true });
        }
    };

    const handlerModal = () => {
        setModal(!modal);
    };

    const onPostSuccess = () => {
        setModal(!modal);
        searchInquiryDetail();
    };

    const handlerCancel = () => {
        setReadOnly(true);
        window.location.reload();
    };

    return (
        <>
            <InquiryDetailMainStyled>
                <ContentBox>1:1 문의 상세</ContentBox>
                {readOnly ? <Button onClick={() => navigate(-1)}>뒤로가기</Button> : null}
                {readOnly && !inquiryAnswer && inquiryDetail?.loginID === userInfo.loginId ? (
                    <div className="btn-group" style={{ marginTop: -63, paddingRight: 5 }}>
                        <Button onClick={handlerDelete}>삭제</Button>
                        <Button
                            onClick={() => {
                                setReadOnly(false);
                            }}
                        >
                            수정
                        </Button>
                    </div>
                ) : null}
                {!readOnly && !inquiryAnswer && inquiryDetail?.loginID === userInfo.loginId ? (
                    <div style={{ marginTop: -62, paddingRight: 5 }}>
                        <Button onClick={handlerCancel}>취소</Button>
                        <Button onClick={handlerUpdate}>수정</Button>
                    </div>
                ) : null}

                <InquiryDetailMainStyledTable>
                    <colgroup>
                        <col width="25%" />
                        <col width="25%" />
                        <col width="25%" />
                        <col width="25%" />
                    </colgroup>
                    <tr>
                        <th>작성자</th>
                        <td>{inquiryDetail?.loginID}</td>
                        <th>카테고리</th>
                        <td>
                            <select
                                value={inquiryDetail?.category_code || ""}
                                onChange={(e) => {
                                    setInquiryDetail({ ...inquiryDetail, category_code: e.target.value });
                                }}
                                disabled={readOnly}
                            >
                                <option value="" disabled>
                                    선택
                                </option>
                                {inquiryCategoryList && inquiryCategoryList.length > 0
                                    ? inquiryCategoryList.map((inquiryCategory) => {
                                          return (
                                              <option key={inquiryCategory.category_code} value={inquiryCategory.category_code}>
                                                  {inquiryCategory.category_name}
                                              </option>
                                          );
                                      })
                                    : null}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>제목</th>
                        <td colSpan={3}>
                            <input
                                type="text"
                                defaultValue={inquiryDetail?.post_title}
                                onChange={(e) => setInquiryDetail({ ...inquiryDetail, post_title: e.target.value })}
                                readOnly={readOnly ? true : false}
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td colSpan={3}>
                            <textarea
                                defaultValue={inquiryDetail?.post_text}
                                onChange={(e) => setInquiryDetail({ ...inquiryDetail, post_text: e.target.value })}
                                readOnly={readOnly ? true : false}
                            ></textarea>
                        </td>
                    </tr>
                </InquiryDetailMainStyledTable>
                {readOnly && !inquiryAnswer && userInfo.userType === "C" ? <Button onClick={handlerModal}>답변달기</Button> : null}
                {inquiryAnswer ? <InquiryDetailReply inquiryAnswer={inquiryAnswer} /> : <span>* 답변 미등록 상태입니다.</span>}
                <InquiryReplyModal onPostSuccess={onPostSuccess}></InquiryReplyModal>
            </InquiryDetailMainStyled>
        </>
    );
};
