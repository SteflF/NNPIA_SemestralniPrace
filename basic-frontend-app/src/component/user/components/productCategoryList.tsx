import * as React from "react";
import { string } from "prop-types";
import {RouteComponentProps} from 'react-router';
import {IProductItem} from "../../../apiModels/viewModels";
import http from "../../../service/httpService";
import {ProductController_GetProducts} from "../../../apiClient/routes";
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
        products: Array<IProductItem>(),
        viewType: ViewTypeEnum.gridView,
        category: string,
        currentPageIndex: 0,
        pageSize: 3,
        sortType: SortTypeEnum.AtoZ
    };

    async componentDidMount(){
        const { data: products } = await http.get(ProductController_GetProducts);
        this.setState({category: this.props.location.state})

        const filteredProducts = products.result.filter((i: any) => i.category === this.state.category);

        this.setState({ products: filteredProducts });
    }

    handlePageIndexChange = (newPageIndex: number): void => {
        this.setState({currentPageIndex: newPageIndex})
    }

    handleSortTypeChange = (sortType: SortTypeEnum): void => {
        this.setState({sortType});
    }

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
            case SortTypeEnum.AtoZ:
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

            case SortTypeEnum.ZtoA:
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

            case SortTypeEnum.PriceLowest:
                products.sort((a, b) => a.price - b.price);
                break;

            case SortTypeEnum.PriceHighest:
                products.sort((a, b) => a.price - b.price);
                products.reverse();
                break;
        }

        return products;
    }

    getProduct = (): IProductItem[] => {
        let products = this.state.products;

        products = this.pageProducts(products);
        products = this.sortProducts(products);

        return products;
    }

    render() {
        const { viewType, currentPageIndex, pageSize, sortType } = this.state;
        let products = this.getProduct();

        return(
            <React.Fragment>
                <SideMenu />
                <div className="col-lg-9">
                    <CarouselIndicators />
                    <SortList
                        sortType={sortType}
                        onSortTypeChange={this.handleSortTypeChange}
                    />
                    <div className="row">
                        <ProductTable
                            products={products}
                            viewType={viewType}
                        />
                    </div>
                    <Pager
                        currentPageIndex={currentPageIndex}
                        itemsCount={this.state.products.length}
                        pageSize={pageSize}
                        onPageIndexChange={this.handlePageIndexChange}
                    />
                </div>
            </React.Fragment>
        );
    }
}

export default ProductCategoryList;
