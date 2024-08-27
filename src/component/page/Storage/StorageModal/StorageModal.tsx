import { useRecoilState } from "recoil";
import { StorageModalStyled, StorageTableStyled } from "./styled";
import { modalState } from "../../../../stores/modalState";
import { Button } from "../../../common/Button/Button";
import { FC, useEffect, useState } from "react";
import { postStorageApi } from "../../../../api/postStorageApi";
import { StorageApi } from "../../../../api/api";
import { addComma } from "../../../../common/addComma";
import { StyledTd, StyledTh } from "../../../common/styled/StyledTable";

export interface IStorageDetail {
    item_code: string;
    storage_name: string;
    item_price: string;
    inventory_count: string;
    item_name: string;
}

export interface ISearchStorageDetailList {
    storageDetailList: IStorageDetail[];
}

export interface IStorageModalProps {
    storageCode?: number;
}

export const StorageModal: FC<IStorageModalProps> = ({ storageCode }) => {
    const [storageDetailList, setStorageDetailList] = useState<IStorageDetail[]>();
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    useEffect(() => {
        if (modal && storageCode) searchStorageDetail(storageCode);
    }, [modal]);

    const searchStorageDetail = async (storageCode: number) => {
        const postSearchStorageDetail = await postStorageApi<ISearchStorageDetailList>(StorageApi.detailStorageJson, { storage_code: storageCode });
        if (postSearchStorageDetail) {
            setStorageDetailList(postSearchStorageDetail.storageDetailList);
        }
    };

    return (
        <StorageModalStyled isOpen={modal} ariaHideApp={false}>
            <div className="wrap">
                <div className="header">창고 상세</div>
                <StorageTableStyled>
                    <colgroup>
                        <col width="25%" />
                        <col width="25%" />
                        <col width="25%" />
                        <col width="25%" />
                    </colgroup>
                    <thead>
                        <tr>
                            <StyledTh>창고 이름</StyledTh>
                            <StyledTh>상품 이름</StyledTh>
                            <StyledTh>상품 가격</StyledTh>
                            <StyledTh>상품 개수</StyledTh>
                        </tr>
                    </thead>
                    <tbody>
                        {storageDetailList && storageDetailList.length > 0 ? (
                            storageDetailList.map((storageDetail) => {
                                return (
                                    <tr key={storageDetail.item_code}>
                                        <StyledTd>{storageDetail.storage_name}</StyledTd>
                                        <StyledTd>{storageDetail.item_name}</StyledTd>
                                        <StyledTd style={{ textAlign: "right", paddingRight: 10 }}>{addComma(storageDetail.item_price)} 원</StyledTd>
                                        <StyledTd style={{ textAlign: "right", paddingRight: 10 }}>{addComma(storageDetail.inventory_count)} 개</StyledTd>
                                    </tr>
                                );
                            })
                        ) : (
                            <tr>
                                <td colSpan={4}>데이터가 없습니다.</td>
                            </tr>
                        )}
                    </tbody>
                </StorageTableStyled>
                <div className="btn-group" style={{ paddingTop: 15 }}>
                    <Button height={40} onClick={() => setModal(!modal)}>
                        닫기
                    </Button>
                </div>
            </div>
        </StorageModalStyled>
    );
};
