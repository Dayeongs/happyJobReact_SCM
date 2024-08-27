import { useRecoilState } from "recoil";
import { ReturnModalStyled } from "./styled";
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useState } from "react";
import { fomatDate } from "../../../../../common/fomatData";
import { IDelivery, IDeliveryMan, IReturnModalProps, IReturnModalResponse, IStorageInfo } from "../../../../../models/interface/Business/ReturnModel";
import { Button } from "../../../../common/Button/Button";
import { DeliveryManApi, FindStorageApi, Return_deliveryInsertApi, Return_deliverySelectApi, Return_findstatusnApi, ReturndeliveryUpdateApi } from "../../../../../api/api";
import { postBusinessApi } from "../../../../../api/postBusinessApi";

export const ReturnModal: FC<IReturnModalProps> = ({ seq, detail }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [cnt, setCnt] = useState<number>();
    const [deliveryMans, setDeliveryMans] = useState<IDeliveryMan[]>([]);
    const [chageDeleveryMan, setChageDeleveryMan] = useState<string>();
    const [storageInfo, setStorageInfo] = useState<IStorageInfo[]>([]);
    const [storage_name, setStorage_name] = useState<string>();
    const [delivery, setDelivery] = useState<IDelivery>();

    useEffect(() => {
        returnModalDetail();
        deliveryMan();
        findStorage();
        return_deliverySelect();
    }, [seq]);

    useEffect(() => {
        if (delivery) {
            setStorage_name(delivery?.storage_name);
            setChageDeleveryMan(delivery?.delivery_name);
        }
    }, [delivery]);

    const returnModalDetail = async () => {
        const postReturnList = await postBusinessApi<IReturnModalResponse>(Return_findstatusnApi.return_findstatusn, {
            seq: seq,
        });

        if (postReturnList) {
            setCnt(postReturnList.cnt);
        }
    };

    const deliveryMan = async () => {
        const postdeliveryMan = await postBusinessApi<IDeliveryMan[]>(DeliveryManApi.deliveryMan, {
            seq: seq,
        });

        if (postdeliveryMan) {
            setDeliveryMans(postdeliveryMan);
        }
    };

    const chageDeliveryMan = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCode = e.target.value;
        const selectedMan = deliveryMans.find((man) => man.name === selectedCode);
        if (selectedMan) {
            setChageDeleveryMan(selectedMan.name);
        }
    };

    const findStorage = async () => {
        const postFindStorage = await postBusinessApi<IStorageInfo[]>(FindStorageApi.findStorage, {
            storage_item_code: detail?.item_code,
        });

        if (postFindStorage) {
            setStorageInfo(postFindStorage);
        }
    };

    const chageStorage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedCode = e.target.value;
        const selectedStorage = storageInfo.find((storage) => storage.storage_code === selectedCode);
        if (selectedStorage) {
            setStorage_name(selectedStorage.storage_name);
        }
    };

    const return_deliverySelect = async () => {
        const postDeliverySelect = await postBusinessApi<IDelivery>(Return_deliverySelectApi.Return_deliverySelect, {
            item_code: detail?.item_code,
            obtain_date: detail?.obtain_date,
            seq: detail?.seq,
        });

        if (postDeliverySelect) {
            setDelivery(postDeliverySelect);
        }
    };

    const save = async () => {
        const postSave = await postBusinessApi<number>(Return_deliveryInsertApi.re_deliveryInsert, {
            delivery_end_loc: delivery?.delivery_end_loc,
            obtain_count: delivery?.obtain_count,
            delivery_name: delivery?.delivery_name,
            item_code: delivery?.item_code,
            storage_name: delivery?.storage_name,
            seq: seq,
        });

        if (postSave) {
            if (postSave === 1) {
                setModal(!modal);
            }
        }
    };

    const update = async () => {
        const postSave = await postBusinessApi<number>(ReturndeliveryUpdateApi.returndeliveryUpdate, {
            delivery_name: chageDeleveryMan,
            storage_name: storage_name,
            delivery_num: delivery?.delivery_num,
        });

        if (postSave) {
            if (postSave === 1) {
                setModal(!modal);
            }
        }
    };

    return (
        <ReturnModalStyled>
            <div className="container">
                <div className="head">
                    <strong>배송지시서 수정</strong>
                    <div
                        className="x"
                        onClick={() => {
                            setModal(!modal);
                        }}
                    >
                        X
                    </div>
                </div>
                <div className="content">
                    <table>
                        <thead>
                            <tr>
                                <th>반품신청일자</th>
                                <th>기업명</th>
                                <th>제품명</th>
                                <th>반품수량</th>
                                <th>배송담당자</th>
                                <th>창고</th>
                                <th>제품번호</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detail ? (
                                <tr>
                                    <td>{fomatDate(detail.return_order_date)}</td>
                                    <td>{detail.cust_name}</td>
                                    <td>{detail.item_name}</td>
                                    <td>{detail.return_count}</td>
                                    <td>
                                        <select name="" id="insert_deliveryName" onChange={chageDeliveryMan}>
                                            <option value={""}>배송담당자</option>
                                            {deliveryMans.length
                                                ? deliveryMans.map((a, i) => {
                                                      return (
                                                          <option value={a.name} key={i}>
                                                              {a.name}
                                                          </option>
                                                      );
                                                  })
                                                : null}
                                        </select>
                                    </td>
                                    <td>
                                        <select name="select_storage" id="select_storage" onChange={chageStorage}>
                                            <option value="">창고선택</option>
                                            {storageInfo
                                                ? storageInfo.map((a, i) => {
                                                      return (
                                                          <option value={a.storage_code} key={i}>
                                                              {a.storage_name}
                                                          </option>
                                                      );
                                                  })
                                                : null}
                                        </select>
                                    </td>
                                    <td>{detail.item_code}</td>
                                </tr>
                            ) : (
                                <></>
                            )}
                        </tbody>
                    </table>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>배송번호</th>
                                    <th>배송일자</th>
                                    <th>제품명</th>
                                    <th>배송수량</th>
                                    <th>배송창고</th>
                                    <th>배송지</th>
                                    <th>배송담당자</th>
                                </tr>
                            </thead>
                            <tbody>
                                {delivery && detail ? (
                                    <tr>
                                        <td>{delivery.delivery_num}</td>
                                        <td>{fomatDate(delivery.delivery_date)}</td>
                                        <td>{detail.item_name}</td>
                                        <td>{delivery.obtain_count}</td>
                                        <td>{storage_name}</td>
                                        <td>{delivery.delivery_end_loc}</td>
                                        <td>{chageDeleveryMan}</td>
                                    </tr>
                                ) : (
                                    <tr></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="buttonDiv">
                        {cnt === 1 ? <Button onClick={update}>수정</Button> : <Button onClick={save}>저장</Button>}
                        <Button
                            onClick={() => {
                                setModal(!modal);
                            }}
                        >
                            닫기
                        </Button>
                    </div>
                </div>
            </div>
        </ReturnModalStyled>
    );
};
