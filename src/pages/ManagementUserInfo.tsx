import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { CustInfoList } from "../component/page/Management/UserInfo/CustInfoList";
import { CustInfoSearch } from "../component/page/Management/UserInfo/CustInfoSearch";
import { UserInfoList } from "../component/page/Management/UserInfo/UserInfoList";
import { UserInfoSearch } from "../component/page/Management/UserInfo/UserInfoSearch";

export const ManagementUserInfo = () => {
    return (
        <>
            <ContentBox>기업고객 관리</ContentBox>
            <CustInfoSearch />
            <CustInfoList />
            <br />
            <br />
            <br />
            <ContentBox>직원 관리</ContentBox>
            <UserInfoSearch />
            <UserInfoList />
        </>
    );
};
