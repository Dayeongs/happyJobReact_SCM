import { useContext, useEffect, useState } from "react";
import { StorageApi } from "../../../../api/api";
import { postStorageApi } from "../../../../api/postStorageApi";
import { StyledTable, StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { StorageContext } from "../../../../api/provider/StorageProvider";
import { StorageModal } from "../StorageModal/StorageModal";

// 창고 정보
export interface IStorage {
    storage_code: number;
    storage_loc: string;
    storage_manager: string;
    storage_name: string;
}

// 창고 목록
export interface ISearchStorageList {
    storageList: IStorage[];
}

export const StorageMain = () => {
    const { searchKeyword } = useContext(StorageContext);
    const [storageList, setStorageList] = useState<IStorage[]>();
    const [storageCode, setStorageCode] = useState<number>();
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    useEffect(() => {
        searchStorageList();
    }, [searchKeyword]);

    // 창고 목록 조회
    const searchStorageList = async () => {
        const postSearchStorage = await postStorageApi<ISearchStorageList>(StorageApi.listStorageJson, { searchTitle: searchKeyword });
        if (postSearchStorage) {
            setStorageList(postSearchStorage.storageList);
        }
    };

    const handlerModal = (storageCode: number) => {
        setModal(!modal);
        setStorageCode(storageCode);
    };

    return (
        <>
            <StyledTable>
                <colgroup>
                    <col width="10%" />
                    <col width="20%" />
                    <col width="55%" />
                    <col width="15%" />
                </colgroup>
                <thead>
                    <tr>
                        <StyledTh>번호</StyledTh>
                        <StyledTh>이름</StyledTh>
                        <StyledTh>위치</StyledTh>
                        <StyledTh>담당자</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {storageList && storageList.length > 0 ? (
                        storageList.map((storage) => {
                            return (
                                <tr key={storage.storage_code} onClick={() => handlerModal(storage.storage_code)}>
                                    <StyledTd>{storage.storage_code}</StyledTd>
                                    <StyledTd>{storage.storage_name}</StyledTd>
                                    <StyledTd>{storage.storage_loc}</StyledTd>
                                    <StyledTd>{storage.storage_manager}</StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={4}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <StorageModal storageCode={storageCode}></StorageModal>
        </>
    );
};
