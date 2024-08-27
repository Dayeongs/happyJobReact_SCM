import { FC } from "react";
import { orderModalState } from "../../../../stores/modalState";
import { useRecoilState } from "recoil";
import { ApprovalModalStyled } from "./styled";
import axios, { AxiosResponse } from "axios";

export interface IApprovalOrderModalProps {
    orderSeq?: number;
    onSuccess: () => void;
    setOrderSeq: (orderSeq: undefined) => void;
}

export interface IPostResponse {
    result: string;
}

export const ApprovalOrderModal: FC<IApprovalOrderModalProps> = ({ orderSeq, onSuccess, setOrderSeq }) => {
    const [orderModal, setOrderModal] = useRecoilState<boolean>(orderModalState);

    const handlerOrderUpdate = () => {
        let param = new URLSearchParams();
        param.append("str", "tb_order");
        param.append("seq", orderSeq?.toString() as string);

        axios.post("/executives/approvalYJson", param).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                onSuccess();
            }
        });
    };

    return (
        <ApprovalModalStyled>
            <div className="container">
                <label>승인하시겠습니까?</label>
                <div className={"button-container"}>
                    <button onClick={handlerOrderUpdate}>승인</button>
                    <button onClick={() => setOrderModal(!orderModal)}>취소</button>
                </div>
            </div>
        </ApprovalModalStyled>
    );
};
