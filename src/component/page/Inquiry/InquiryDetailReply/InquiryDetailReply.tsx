import { FC } from "react";
import { ContentBox } from "../../../common/ContentBox/ContentBox";
import { StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import { InquiryDetailReplyStyled, InquiryDetailReplyStyledTable } from "./styled";

export interface IInquiryAnswer {
    answer_date: string;
    answer_text: string;
    answer_title: string;
    seq: number;
}

export interface IInquiryReplyModalProps {
    inquiryAnswer: IInquiryAnswer;
}

export const InquiryDetailReply: FC<IInquiryReplyModalProps> = ({ inquiryAnswer }) => {
    return (
        <InquiryDetailReplyStyled>
            <ContentBox>답변</ContentBox>
            <InquiryDetailReplyStyledTable>
                <colgroup>
                    <col width={223} />
                    <col width={670} />
                </colgroup>
                <tr className="trTtile">
                    <StyledTh>제목</StyledTh>
                    <StyledTd>{inquiryAnswer.answer_title}</StyledTd>
                </tr>
                <tr>
                    <StyledTh>내용</StyledTh>
                    <StyledTd style={{ paddingTop: 15 }}>{inquiryAnswer.answer_text}</StyledTd>
                </tr>
            </InquiryDetailReplyStyledTable>
        </InquiryDetailReplyStyled>
    );
};
