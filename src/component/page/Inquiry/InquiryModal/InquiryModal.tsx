import { FC, useEffect, useState } from "react";
import { InquiryModalStyled, InquiryModalTableStyled } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { Button } from "../../../common/Button/Button";
import { postInquiryApi } from "../../../../api/postInquiryApi";
import { InquiryApi } from "../../../../api/api";
import { loginInfoState } from "../../../../stores/userInfo";
import { nullCheck } from "../../../../common/nullCheck";

export interface IInquiryModalProps {
    onPostSuccess: () => void;
}

export interface IInquiry {
    category_code: string;
    content: string;
    title: string;
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

export const InquiryModal: FC<IInquiryModalProps> = ({ onPostSuccess }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [userInfo] = useRecoilState(loginInfoState);
    const [inquiryCategoryList, setInquiryCategoryList] = useState<IInquriryCategory[]>();

    const defaultValue = { title: "", content: "", category_code: "" };
    const [inquiry, setInquiry] = useState<IInquiry>(defaultValue);

    useEffect(() => {
        if (modal) {
            searchInqurtyCategory();
        }
    }, [modal]);

    const searchInqurtyCategory = async () => {
        const postSearchInquiryCategory = await postInquiryApi<ISearchInquriryCategory>(InquiryApi.listInquiryCategoryJson, {});
        if (postSearchInquiryCategory) {
            setInquiryCategoryList(postSearchInquiryCategory.categoryList);
        }
    };

    const handlerSave = async () => {
        const isValid = nullCheck(checklist);
        if (!isValid) {
            return;
        }

        const postSaveInquiry = await postInquiryApi<IPostResponse>(InquiryApi.saveInquiryJson, { ...inquiry });
        if (postSaveInquiry && postSaveInquiry.result === "success") {
            alert("등록되었습니다.");
            onPostSuccess();
        }
    };

    const checklist = [
        { inval: inquiry.category_code, msg: "카테고리를 선택해주세요" },
        { inval: inquiry.title, msg: "제목을 입력해주세요" },
        { inval: inquiry.content, msg: "내용을 입력해주세요" },
    ];

    return (
        <InquiryModalStyled isOpen={modal} ariaHideApp={false}>
            <div className="wrap">
                <div className="header">1:1 문의 등록</div>
                <InquiryModalTableStyled>
                    <colgroup>
                        <col width="25%" />
                        <col width="25%" />
                        <col width="25%" />
                        <col width="25%" />
                    </colgroup>
                    <tbody>
                        <tr>
                            <th>작성자</th>
                            <td>{userInfo.loginId}</td>
                            <th>
                                카테고리 <span>*</span>
                            </th>
                            <td>
                                <select
                                    defaultValue=""
                                    onChange={(e) => {
                                        setInquiry({ ...inquiry, category_code: e.target.value });
                                    }}
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
                            <th>
                                제목 <span>*</span>
                            </th>
                            <td colSpan={3}>
                                <input
                                    type="text"
                                    name="post_title"
                                    required
                                    onChange={(e) => {
                                        setInquiry({ ...inquiry, title: e.target.value });
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
                                    name="post_text"
                                    required
                                    onChange={(e) => {
                                        setInquiry({ ...inquiry, content: e.target.value });
                                    }}
                                ></textarea>
                            </td>
                        </tr>
                    </tbody>
                </InquiryModalTableStyled>
                <div className="btn-group">
                    <Button onClick={handlerSave}>저장</Button>
                    <Button onClick={() => setModal(!modal)}>닫기</Button>
                </div>
            </div>
        </InquiryModalStyled>
    );
};
