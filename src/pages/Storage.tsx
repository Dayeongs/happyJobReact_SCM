import { StorageProvider } from "../api/provider/StorageProvider";
import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { StorageMain } from "../component/page/Storage/StorageMain/StorageMain";
import { StorageSearch } from "../component/page/Storage/StorageSearch/StorageSearch";

export const Storage = () => {
    return (
        <StorageProvider>
            <ContentBox>창고 현황</ContentBox>
            <StorageSearch />
            <StorageMain />
        </StorageProvider>
    );
};
