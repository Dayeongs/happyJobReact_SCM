import { ContentBox } from '../component/common/ContentBox/ContentBox';
import { ReturnMain } from '../component/page/Mypage/Return/ReturnMain/ReturnMain';
import { ReturnSearch } from '../component/page/Mypage/Return/ReturnSearch/ReturnSearch';

export const Return = () => {
    return (
        <>
            <ContentBox>반품내역</ContentBox>
            <ReturnSearch />
            <ReturnMain />
        </>
    );
};
