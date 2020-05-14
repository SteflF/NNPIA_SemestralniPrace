import * as React from "react";
import {IProductItem} from "../../../apiModels/viewModels";
import http from "../../../service/httpService";
import {ProductController_GetProducts} from "../../../apiClient/routes";
import ViewTypeEnum from "./products/viewTypeEnum";
import ProductTable from "./products/productTable";
import CarouselIndicators from "./common/carouselIndicators";
import Pager from "./products/pager";

class ProductList extends React.Component{
    state = {
        products: Array<IProductItem>(),
        viewType: ViewTypeEnum.gridView,
        currentPageIndex: 0,
        pageSize: 3
    };

    async componentDidMount(){
        const { data: products } = await http.get(ProductController_GetProducts);

        this.setState({ products: products.result });
    }

    handlePageIndexChange = (newPageIndex: number): void => {
        this.setState({currentPageIndex: newPageIndex})
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

    getProduct = (): IProductItem[] => {
        let products = this.state.products;

        products = this.pageProducts(products);

        return products;
    }

    render() {
        const { viewType, currentPageIndex, pageSize } = this.state;
        let products = this.getProduct();

        return(
            <div className="col-lg-9">
                <CarouselIndicators />
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
        );
    }
}

export default ProductList;
