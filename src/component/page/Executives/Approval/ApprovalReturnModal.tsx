import { FC } from "react";
import { returnModalState } from "../../../../stores/modalState";
import { useRecoilState } from "recoil";
import { ApprovalModalStyled } from "./styled";
import axios, { AxiosResponse } from "axios";

export interface IApprovalReturnModalProps {
    returnSeq?: number;
    onSuccess: () => void;
    setReturnSeq: (returnSeq: undefined) => void;
}

export interface IPostResponse {
    result: string;
}

export const ApprovalReturnModal: FC<IApprovalReturnModalProps> = ({ returnSeq, onSuccess, setReturnSeq }) => {
    const [returnModal, setReturnModal] = useRecoilState<boolean>(returnModalState);

    const handlerReturnUpdate = () => {
        let param = new URLSearchParams();
        param.append("str", "tb_return");
        param.append("seq", returnSeq?.toString() as string);

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
                    <button onClick={handlerReturnUpdate}>승인</button>
                    <button onClick={() => setReturnModal(!returnModal)}>취소</button>
                </div>
            </div>
        </ApprovalModalStyled>
    );
};
