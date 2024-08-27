import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { ReturnListMain } from "../component/page/Direction/ReturnList/ReturnList/ReturnListMain";
import { ReturnListSearch } from "../component/page/Direction/ReturnList/ReturnListSearch/ReturnListSearch";

export const ReturnList = () => {
    return (
        <>
            <ContentBox>반품 지시서</ContentBox>
            <ReturnListSearch />
            <ReturnListMain />
        </>
    );
};
