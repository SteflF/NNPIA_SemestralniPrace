import * as React from "react";
import UserSideMenu from "../../layout/userSideMenu";
import {IOrder} from "../../../apiModels/viewModels";
import http from "../../../service/httpService";
import { OrderCotroller_GetByUserId } from "../../../apiClient/routes";
import UserOrderTable from "./orders/userOrderTable";
import SortList from "./common/sortList";
import OrderSortEnum from "./orders/OrderSortEnum";
import Pager from "./products/pager";

class UserOrderList extends React.Component{
    state = {
        ordersPaging:{
            orders: Array<IOrder>(),
            count: 0
        },
        pageNumber: 0,
        pageSize: 10,
        sortBy: OrderSortEnum.IdAsc,
        sortName: 'id',
        sortAsc: true,
    }

    async componentDidMount() {
        const { pageNumber, pageSize, sortName, sortAsc } = this.state;
        const userId = localStorage.getItem("userId");
        const result = await http.get(OrderCotroller_GetByUserId(Number(userId), pageNumber, pageSize, sortName, sortAsc));
        console.log("z db doslo: ", result);
        this.setState({ordersPaging: result.data.result});
    }

    async componentDidUpdate(prevProps: Readonly<any> ,prevState: Readonly<any>){
        const { pageNumber, pageSize, sortAsc, sortBy, sortName } = this.state;
        console.log("zavolano didUpdate");

        if(prevState.pageNumber !== pageNumber || prevState.sortAsc !== sortAsc || prevState.sortBy !== sortBy){
            const userId = localStorage.getItem("userId");
            console.log("Doslo ke zmene statu.");
            const { data: orders } = await http.get(OrderCotroller_GetByUserId(Number(userId), pageNumber, pageSize, sortName, sortAsc));
            console.log("nove se nacetla tato data: ", orders);
            this.setState({ordersPaging: orders.result});
        }
    }

    handleSortTypeChange = (sortIndex: number): void => {
        console.log("zavolano handleSortTypeChange: ", sortIndex);
        if (sortIndex === OrderSortEnum.IdAsc || sortIndex === OrderSortEnum.IdDesc){
            if (sortIndex === OrderSortEnum.IdAsc){
                console.log("Zavolano id asc");
                this.setState({sortAsc: true, sortName: "id", sortBy: OrderSortEnum.IdAsc});
            }else{
                console.log("Zavolano id desc");
                this.setState({sortAsc: false, sortName: "id", sortBy: OrderSortEnum.IdDesc});
            }
        }else{
            if (sortIndex === OrderSortEnum.StateAsc){
                console.log("Zavolano state asc");
                this.setState({sortAsc: true, sortName: "state", sortBy: OrderSortEnum.StateAsc});
            }else{
                console.log("Zavolano state desc");
                this.setState({sortAsc: false, sortName: "state", sortBy: OrderSortEnum.StateDesc});
            }
        }
    }

    handlePageIndexChange = (newPageNumber: number): void => {
        this.setState({ pageNumber: newPageNumber })
    }

    render() {
        const { ordersPaging, sortBy, pageNumber, pageSize } =this.state;

        return(
            <React.Fragment>
                <UserSideMenu />
                <div className="col-lg-9 mt-4">
                    <h2>Objednávky</h2>
                    {ordersPaging.count !== 0
                        ?
                        <div>
                            <SortList
                                sortEnum={OrderSortEnum}
                                sortBy={sortBy}
                                onSortTypeChange={this.handleSortTypeChange}
                            />
                             <UserOrderTable
                                orders={ordersPaging.orders}
                            />
                            <Pager
                                    currentPageIndex={pageNumber}
                                    itemsCount={ ordersPaging.count }
                                    pageSize={pageSize}
                                    onPageIndexChange={this.handlePageIndexChange}
                                />
                        </div>
                        : "Nebyly nalezeny žádné objednávky."
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default UserOrderList;
