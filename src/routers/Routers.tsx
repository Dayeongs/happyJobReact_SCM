import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { DashBoard } from "../component/layout/DashBoard/DashBoard";
import { NotFound } from "../component/common/NotFound/NotFound";
import { Notice } from "../pages/Notice";
import { ComnCodMgr } from "../pages/ComnCodMgr";
import { ComnCodeMgrDetailMain } from "../component/page/ComnCodMgr/ComnCodeMgrDetailMain/ComnCodeMgrDetailMain";
import { Product } from "../pages/Product";
import { Cart } from "../pages/Cart";
import { Order } from "../pages/Order";
import { Return } from "../pages/Return";
import { Executive } from "../pages/Executives";
import { ExecutivesTop } from "../pages/ExecutivesTop";

const routers: RouteObject[] = [
    { path: "*", element: <NotFound /> },
    { path: "/", element: <Login /> },
    {
        path: "/react",
        element: <DashBoard />,
        children: [
            {
                path: "board",
                children: [{ path: "notice.do", element: <Notice /> }],
            },
            {
                path: "system",
                children: [
                    { path: "comnCodMgr.do", element: <ComnCodMgr /> },
                    { path: "comnCodMgr.do/:grpCod", element: <ComnCodeMgrDetailMain /> },
                ],
            },
            {
                path: "product",
                children: [{ path: "product.do", element: <Product /> }],
            },
            {
                path: "mypage",
                children: [
                    { path: "cart.do", element: <Cart /> },
                    { path: "order.do", element: <Order /> },
                    { path: "return.do", element: <Return /> },
                ],
            },
            {
                path: "executives",
                children: [
                    { path: "sales.do", element: <Executive /> },
                    { path: "salesTop.do", element: <ExecutivesTop /> },
                ],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
