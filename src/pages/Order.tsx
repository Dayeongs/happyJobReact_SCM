import { ContentBox } from '../component/common/ContentBox/ContentBox';
import { OrderMain } from '../component/page/Mypage/Order/OrderMain/OrderMain';
import { OrderSearch } from '../component/page/Mypage/Order/OrderSearch/OrderSearch';

export const Order = () => {
    return (
        <>
            <ContentBox>주문내역</ContentBox>
            <OrderSearch />
            <OrderMain />
        </>
    );
};
