import { FC, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { useParams } from "react-router-dom";
import { InquiryReplyModalStyled, InquiryReplyModalTableStyled } from "./styled";
import { Button } from "../../../common/Button/Button";
import { nullCheck } from "../../../../common/nullCheck";
import { postInquiryApi } from "../../../../api/postInquiryApi";
import { InquiryApi } from "../../../../api/api";

export interface IInquiryReplyModalProps {
    onPostSuccess: () => void;
}

export interface IAnswer {
    answer_title: string;
    answer_content: string;
}

export interface IPostResponse {
    result: "success";
}

export const InquiryReplyModal: FC<IInquiryReplyModalProps> = ({ onPostSuccess }) => {
    const [modal, setModal] = useRecoilState(modalState);
    const { inquirySeq } = useParams();

    const defaultValue = { answer_title: "", answer_content: "" };
    const [answer, setAnswer] = useState<IAnswer>(defaultValue);

    // 답변 등록
    const handlerSave = async () => {
        const isValid = nullCheck(checklist);
        if (!isValid) {
            return;
        }

        const postSaveAnswer = await postInquiryApi<IPostResponse>(InquiryApi.saveAnswerJson, { ...answer, seq: inquirySeq });
        if (postSaveAnswer && postSaveAnswer.result === "success") {
            alert("답변이 등록되었습니다.");
            onPostSuccess();
        }
    };

    // 답변 제목, 내용 비어있는지 체크
    const checklist = [
        { inval: answer.answer_title, msg: "제목을 입력해주세요" },
        { inval: answer.answer_content, msg: "내용을 입력해주세요" },
    ];

    return (
        <InquiryReplyModalStyled isOpen={modal} ariaHideApp={false}>
            <div className="wrap">
                <div className="header">답변 등록</div>
                <InquiryReplyModalTableStyled>
                    <colgroup>
                        <col width="25%" />
                        <col width="25%" />
                        <col width="25%" />
                        <col width="25%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>
                                제목 <span>*</span>
                            </th>
                            <td colSpan={3}>
                                <input
                                    type="text"
                                    name="answer_title"
                                    required
                                    onChange={(e) => {
                                        setAnswer({ ...answer, answer_title: e.target.value });
                                    }}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th>
                                내용 <span>*</span>
                            </th>
                            <td colSpan={3}>
                                <textarea
                                    name="answer_content"
                                    required
                                    onChange={(e) => {
                                        setAnswer({ ...answer, answer_content: e.target.value });
                                    }}
                                ></textarea>
                            </td>
                        </tr>
                    </tbody>
                </InquiryReplyModalTableStyled>
                <div className="btn-group">
                    <Button onClick={handlerSave}>저장</Button>
                    <Button onClick={() => setModal(!modal)}>닫기</Button>
                </div>
            </div>
        </InquiryReplyModalStyled>
    );
};
