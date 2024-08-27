import { custInfoModalState } from "../../../../stores/modalState";
import axios, { AxiosResponse } from "axios";
import { FC, useEffect, useRef, useState } from "react";
import { UserInfoModalStyled } from "./styled";
import { useRecoilState } from "recoil";
import { NONAME } from "dns";

export interface ICustInfoModalProps {
    custId?: number;
    onSuccess: () => void;
    setCustId: (custId: undefined) => void;
}

export interface ICustInfoDetail {
    cust_id: number;
    cust_name: string;
    cust_ph: string;
    cust_person: string;
    cust_person_ph: string;
    cust_email: string;
    cust_zip: string;
    cust_addr: string;
    cust_detail_addr: string;
}

export interface ICustInfoDetailResponse {
    custInfoListDetail: ICustInfoDetail[];
}

export interface IPostResponse {
    result: string;
}

export const CustInfoModal: FC<ICustInfoModalProps> = ({ custId, onSuccess, setCustId }) => {
    const [modal, setModal] = useRecoilState<boolean>(custInfoModalState);
    const [custInfoDetail, setCustInfoDetail] = useState<ICustInfoDetail[]>([]);
    const custID = useRef<HTMLInputElement>(null);
    const custNm = useRef<HTMLInputElement>(null);
    const custPh = useRef<HTMLInputElement>(null);
    const custPerson = useRef<HTMLInputElement>(null);
    const custPersonPh = useRef<HTMLInputElement>(null);
    const custEmail = useRef<HTMLInputElement>(null);
    const custZipCode = useRef<HTMLInputElement>(null);
    const custAddr = useRef<HTMLInputElement>(null);
    const custAddrDetail = useRef<HTMLInputElement>(null);

    useEffect(() => {
        console.log("useeffect: " + custId);
        if (custId) {
            searchDetail();
        }

        return () => {
            setCustId(undefined);
        };
    }, []);

    const searchDetail = () => {
        const param = new URLSearchParams();
        param.append("custId", custId?.toString() as string);

        axios.post("/management/custDetailJson", param).then((res: AxiosResponse<ICustInfoDetailResponse>) => {
            if (res.data.custInfoListDetail) {
                setCustInfoDetail(res.data.custInfoListDetail);
            }
        });
    };

    const handlerSave = () => {
        const param = new URLSearchParams();

        param.append("cust_name", custNm.current?.value.toString() as string);
        param.append("cust_ph", custPh.current?.value.toString() as string);
        param.append("cust_person", custPerson.current?.value.toString() as string);
        param.append("cust_person_ph", custPersonPh.current?.value.toString() as string);
        param.append("cust_email", custEmail.current?.value.toString() as string);
        param.append("cust_zip", custZipCode.current?.value.toString() as string);
        param.append("cust_addr", custAddr.current?.value.toString() as string);
        param.append("cust_detail_addr", custAddrDetail.current?.value.toString() as string);

        axios.post("/management/custSave.do", param).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                onSuccess();
            }
        });
    };

    const handlerUpdate = () => {
        const param = new URLSearchParams();

        param.append("custId", custId?.toString() as string);
        param.append("cust_name", custNm.current?.value.toString() as string);
        param.append("cust_ph", custPh.current?.value.toString() as string);
        param.append("cust_person", custPerson.current?.value.toString() as string);
        param.append("cust_person_ph", custPersonPh.current?.value.toString() as string);
        param.append("cust_email", custEmail.current?.value.toString() as string);
        param.append("cust_zip", custZipCode.current?.value.toString() as string);
        param.append("cust_addr", custAddr.current?.value.toString() as string);
        param.append("cust_detail_addr", custAddrDetail.current?.value.toString() as string);

        axios.post("/management/custUpdate.do", param).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                onSuccess();
            }
        });
    };

    const handlerDelete = () => {
        const param = new URLSearchParams();

        param.append("custId", custId?.toString() as string);

        axios.post("/management/custDelete.do", param).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                onSuccess();
            }
        });
    };

    return (
        <>
            <UserInfoModalStyled>
                <div className="container">
                    <label style={custInfoDetail[0]?.cust_id == null ? { display: "none" } : {}}>
                        기업고객ID :
                        <input type="text" defaultValue={custInfoDetail[0]?.cust_id} ref={custID} disabled></input>
                    </label>
                    <label>
                        기업고객명 :<input type="text" defaultValue={custInfoDetail[0]?.cust_name} ref={custNm}></input>
                    </label>
                    <label>
                        기업고객연락처 :
                        <input type="text" defaultValue={custInfoDetail[0]?.cust_ph} ref={custPh}></input>
                    </label>
                    <label>
                        담당자명 :
                        <input type="text" defaultValue={custInfoDetail[0]?.cust_person} ref={custPerson}></input>
                    </label>
                    <label>
                        담당자연락처 :
                        <input type="text" defaultValue={custInfoDetail[0]?.cust_person_ph} ref={custPersonPh}></input>
                    </label>
                    <label>
                        담당자이메일 :
                        <input type="text" defaultValue={custInfoDetail[0]?.cust_email} ref={custEmail}></input>
                    </label>
                    <label>
                        기업고객우편번호 :
                        <input type="text" defaultValue={custInfoDetail[0]?.cust_zip} ref={custZipCode}></input>
                    </label>
                    <label>
                        기업고객주소 :
                        <input type="text" defaultValue={custInfoDetail[0]?.cust_addr} ref={custAddr}></input>
                    </label>
                    <label>
                        기업고객상세주소 :
                        <input
                            type="text"
                            defaultValue={custInfoDetail[0]?.cust_detail_addr}
                            ref={custAddrDetail}
                        ></input>
                    </label>
                    <div className={"button-container"}>
                        <button onClick={custId ? handlerUpdate : handlerSave}>{custId ? "수정" : "등록"}</button>
                        {custId ? <button onClick={handlerDelete}>삭제</button> : null}

                        <button onClick={() => setModal(!modal)}>나가기</button>
                    </div>
                </div>
            </UserInfoModalStyled>
        </>
    );
};
