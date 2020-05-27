import * as React from "react";
import { string } from "prop-types";
import {RouteComponentProps} from 'react-router';
import {IProductItem} from "../../../apiModels/viewModels";
import http from "../../../service/httpService";
import { ProductController_GetProductsByCategory} from "../../../apiClient/routes";
import ViewTypeEnum from "./products/viewTypeEnum";
import ProductTable from "./products/productTable";
import CarouselIndicators from "./common/carouselIndicators";
import Pager from "./products/pager";
import SideMenu from "../../layout/sideMenu";
import SortList from "./common/sortList";
import SortTypeEnum from "./products/sortTypeEnum";

type ProductCategoryListProps = RouteComponentProps;

class ProductCategoryList extends React.Component<ProductCategoryListProps>{
    state = {
        productsPaging: {
            products: Array<IProductItem>(),
            count: 0,
        },
        viewType: ViewTypeEnum.gridView,
        category: string,
        pageNumber: 0,
        pageSize: 1,
        sortAsc: true,
        sortBy: 'name',
        sortByEnum: SortTypeEnum.NameAsc
    };

    async componentDidMount(){
        const { pageNumber, pageSize, sortBy, sortAsc } = this.state;
        const category = this.props.location.state;
        const { data: products } = await http.get(ProductController_GetProductsByCategory(category!.toString(), pageNumber, pageSize, sortBy, sortAsc));

        this.setState({ category })
        this.setState({ productsPaging: products.result });
    }

    async componentDidUpdate(prevProps: Readonly<ProductCategoryListProps>, prevState: Readonly<any>) {
        if(prevState.pageNumber !== this.state.pageNumber || prevState.sortAsc !== this.state.sortAsc || prevState.sortByEnum !== this.state.sortByEnum){
            const { category, pageNumber, pageSize, sortBy, sortAsc } = this.state;
            const { data: products } = await http.get(ProductController_GetProductsByCategory(category.toString(), pageNumber, pageSize, sortBy, sortAsc));

            this.setState({ productsPaging: products.result });
        }
    }

    handlePageIndexChange = (newPageIndex: number): void => {
        this.setState({pageNumber: newPageIndex})
    }

    handleSortTypeChange = (sortType: SortTypeEnum): void => {
        if (sortType === SortTypeEnum.NameAsc || sortType === SortTypeEnum.NameDesc){
            if (sortType === SortTypeEnum.NameAsc){
                this.setState({sortAsc: true, sortBy: "name", sortByEnum: SortTypeEnum.NameAsc});
            }else{
                this.setState({sortAsc: false, sortBy: "name", sortByEnum: SortTypeEnum.NameDesc});
            }
        }else{
            if (sortType === SortTypeEnum.PriceAsc){
                this.setState({sortAsc: true, sortBy: "price", sortByEnum: SortTypeEnum.PriceAsc});
            }else{
                this.setState({sortAsc: false, sortBy: "price", sortByEnum: SortTypeEnum.PriceDesc});
            }
        }
    }
/*
    pageProducts = (products: IProductItem[]): IProductItem[] => {
        const { currentPageIndex, pageSize } = this.state;

        if (pageSize === 0) {
            return products;
        }

        let start = (pageSize * currentPageIndex);
        let end = (pageSize * (currentPageIndex + 1));

        return products.slice(start, end);
    }

    sortProducts = (products: IProductItem[]): IProductItem[] => {
        switch (this.state.sortType) {
            case SortTypeEnum.NameAsc:
                products.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
                break;

            case SortTypeEnum.NameDesc:
                products.sort((a, b) => {
                    if (a.name < b.name) {
                        return -1;
                    }
                    if (a.name > b.name) {
                        return 1;
                    }
                    return 0;
                });
                products.reverse();
                break;

            case SortTypeEnum.PriceAsc:
                products.sort((a, b) => a.price - b.price);
                break;

            case SortTypeEnum.PriceDesc:
                products.sort((a, b) => a.price - b.price);
                products.reverse();
                break;
        }

        return products;
    }

    getProduct = (): IProductItem[] => {
        let products = this.state.productsPaging.products;

        //products = this.pageProducts(products);
        //products = this.sortProducts(products);

        return products;
    }
*/

    render() {
        const { viewType, pageNumber, pageSize, sortByEnum, productsPaging } = this.state;

        return(
            <React.Fragment>
                <SideMenu />
                <div className="col-lg-9">
                    <CarouselIndicators />
                    <SortList
                        sortBy={sortByEnum}
                        onSortTypeChange={this.handleSortTypeChange}
                    />
                    {productsPaging.count !== 0
                        ?<div>
                            <div className="row">
                                <ProductTable
                                    products={productsPaging.products}
                                    viewType={viewType}
                                />
                            </div>
                            <Pager
                                currentPageIndex={pageNumber}
                                itemsCount={this.state.productsPaging.count}
                                pageSize={pageSize}
                                onPageIndexChange={this.handlePageIndexChange}
                            />
                        </div>
                        : "Nebyly nalezeny žádné produkty."}
                </div>
            </React.Fragment>
        );
    }
}

export default ProductCategoryList;
