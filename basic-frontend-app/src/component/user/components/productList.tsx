import * as React from "react";
import {IProductItem} from "../../../apiModels/viewModels";
import http from "../../../service/httpService";
import {ProductController_GetProducts} from "../../../apiClient/routes";
import ViewTypeEnum from "./products/viewTypeEnum";
import ProductTable from "./products/productTable";
import CarouselIndicators from "./common/carouselIndicators";
import Pager from "./products/pager";
import {RouteComponentProps} from "react-router";
import { string, number } from "prop-types";

type ProductListProps = RouteComponentProps;

class ProductList extends React.Component<ProductListProps>{
    state = {
        products: Array<IProductItem>(),
        viewType: ViewTypeEnum.gridView,
        currentPageIndex: 0,
        pageSize: 3,
        searchTerm: "",
        productsCount: number
    };

    async componentDidMount(){
        const { data: products } = await http.get(ProductController_GetProducts);

        this.setState({searchTerm: this.props.location.state});
        this.setState({ products: products.result });
        this.setState({productsCount: products.result.length});
    }

    componentDidUpdate(prevProps: Readonly<ProductListProps>, prevState: Readonly<{}>) {
        if(prevProps.location.state !== this.props.location.state){
            this.setState({searchTerm: this.props.location.state});
        }
    }

    handlePageIndexChange = (newPageIndex: number): void => {
        this.setState({currentPageIndex: newPageIndex})
    }

    filterProducts = (products: IProductItem[]): IProductItem[] => {
        let searchTerm: string;
        if(this.state.searchTerm !== undefined){
            searchTerm = this.state.searchTerm.toString().toLowerCase();
        }

        return products.filter(i => i.name.toLowerCase().includes(searchTerm) || i.description.toLowerCase().includes(searchTerm));
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

        if(products.length !== 0){
            if(this.state.searchTerm !== undefined){
                products = this.filterProducts(products);
            }
            products = this.pageProducts(products);
        }

        return products;
    }

    render() {
        const { viewType, currentPageIndex, pageSize, searchTerm } = this.state;
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
                    itemsCount={ searchTerm === undefined || searchTerm.length === 0 ?  this.state.products.length : products.length}
                    pageSize={pageSize}
                    onPageIndexChange={this.handlePageIndexChange}
                />
            </div>
        );
    }
}

export default ProductList;
