import * as React from "react";
import {IProductItem} from "../../../apiModels/viewModels";
import http from "../../../service/httpService";
import {ProductController_GetProducts} from "../../../apiClient/routes";
import ViewTypeEnum from "./products/viewTypeEnum";
import ProductTable from "./products/productTable";
import CarouselIndicators from "./common/carouselIndicators";
import Pager from "./products/pager";
import {RouteComponentProps} from "react-router";
import SideMenu from "../../layout/sideMenu";
import SortList from "./common/sortList";
import SortTypeEnum from "./products/sortTypeEnum";

type ProductListProps = RouteComponentProps;

class ProductList extends React.Component<ProductListProps>{
    state = {
        products: Array<IProductItem>(),
        viewType: ViewTypeEnum.gridView,
        currentPageIndex: 0,
        pageSize: 3,
        searchTerm: "",
        sortType: SortTypeEnum.AtoZ
    };

    async componentDidMount(){
        const { data: products } = await http.get(ProductController_GetProducts);

        this.setState({searchTerm: this.props.location.state});
        this.setState({ products: products.result });
    }

    componentDidUpdate(prevProps: Readonly<ProductListProps>, prevState: Readonly<{}>) {
        if(prevProps.location.state !== this.props.location.state){
            this.setState({searchTerm: this.props.location.state});
        }
    }

    handlePageIndexChange = (newPageIndex: number): void => {
        this.setState({currentPageIndex: newPageIndex})
    }

    handleSortTypeChange = (sortType: SortTypeEnum): void => {
        this.setState({sortType});
    }

    filterProducts = (products: IProductItem[]): IProductItem[] => {
        let searchTerm: string;
        if(this.state.searchTerm !== undefined && this.state.searchTerm !== null){
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

        if(products.length !== 0){
            if(this.state.searchTerm !== undefined && this.state.searchTerm !== null){
                products = this.filterProducts(products);
            }
            products = this.pageProducts(products);
            products = this.sortProducts(products);
        }

        return products;
    }

    render() {
        const { viewType, currentPageIndex, pageSize, searchTerm, sortType } = this.state;
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
                    {products.length !== 0
                        ? <Pager
                            currentPageIndex={currentPageIndex}
                            itemsCount={ searchTerm === undefined || searchTerm === null || searchTerm.length === 0 ?  this.state.products.length : products.length}
                            pageSize={pageSize}
                            onPageIndexChange={this.handlePageIndexChange}
                        />
                        : "Nebyly nalezeny zadne produkty."
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default ProductList;
