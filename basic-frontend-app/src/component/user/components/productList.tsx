import * as React from "react";
import {IProductItem} from "../../../apiModels/viewModels";
import http from "../../../service/httpService";
import {ProductController_GetProducts, ProductController_GetProductsBySearchString} from "../../../apiClient/routes";
import ViewTypeEnum from "./products/viewTypeEnum";
import ProductTable from "./products/productTable";
import CarouselIndicators from "./common/carouselIndicators";
import Pager from "./products/pager";
import {RouteComponentProps} from "react-router";
import SideMenu from "../../layout/sideMenu";
import SortList from "./common/sortList";
import ProductSortEnum from "./products/sortTypeEnum";

type ProductListProps = RouteComponentProps;

class ProductList extends React.Component<ProductListProps>{
    state = {
        productsPaging: {
            products: Array<IProductItem>(),
            count: 0,
        },
        viewType: ViewTypeEnum.listView,
        pageNumber: 0,
        pageSize: 3,
        sortAsc: true,
        sortBy: 'name',
        sortByEnum: ProductSortEnum.NameAsc,
        searchTerm: ''
    };

    async componentDidMount(){
        const { pageNumber, pageSize, sortBy, sortAsc } = this.state;

        const { data: products } = await http.get(ProductController_GetProducts(pageNumber, pageSize, sortBy, sortAsc));

        this.setState({ productsPaging: products.result, searchTerm: this.props.location.state });
    }

    async componentDidUpdate(prevProps: Readonly<ProductListProps>, prevState: Readonly<any>) {
        const { pageNumber, pageSize, sortBy, sortAsc, searchTerm } = this.state;

        if(prevProps.location.state !== this.props.location.state){
            this.setState({ searchTerm: this.props.location.state });

            if(this.props.location.state !== undefined && this.props.location.state !== '' && this.props.location.state !== null){
                let searchString = this.props.location.state;

                const { data: products } = await http.get(ProductController_GetProductsBySearchString(searchString!.toString(), pageNumber, pageSize, sortBy, sortAsc));
                this.setState({ productsPaging: products.result });
            }else{
                const { data: products } = await http.get(ProductController_GetProducts(pageNumber, pageSize, sortBy, sortAsc));
                this.setState({ productsPaging: products.result });
            }
        }

        if(prevState.pageNumber !== this.state.pageNumber || prevState.sortAsc !== this.state.sortAsc || prevState.sortByEnum !== this.state.sortByEnum){
            if(searchTerm !== '' && searchTerm !== undefined){
                const { data: products } = await http.get(ProductController_GetProductsBySearchString(searchTerm, pageNumber, pageSize, sortBy, sortAsc))
                this.setState({ productsPaging: products.result });
            }else{
                const { data: products } = await http.get(ProductController_GetProducts(pageNumber, pageSize, sortBy, sortAsc));
                this.setState({ productsPaging: products.result });
            }
        }
    }

    handlePageIndexChange = (newPageNumber: number): void => {
        this.setState({ pageNumber: newPageNumber })
    }

    handleSortTypeChange = (sortIndex: number): void => {
        if (sortIndex === ProductSortEnum.NameAsc || sortIndex === ProductSortEnum.NameDesc){
            if (sortIndex === ProductSortEnum.NameAsc){
                this.setState({sortAsc: true, sortBy: "name", sortByEnum: ProductSortEnum.NameAsc});
            }else{
                this.setState({sortAsc: false, sortBy: "name", sortByEnum: ProductSortEnum.NameDesc});
            }
        }else{
            if (sortIndex === ProductSortEnum.PriceAsc){
                this.setState({sortAsc: true, sortBy: "price", sortByEnum: ProductSortEnum.PriceAsc});
            }else{
                this.setState({sortAsc: false, sortBy: "price", sortByEnum: ProductSortEnum.PriceDesc});
            }
        }
    }

    render() {
        const { viewType, pageNumber, pageSize, sortByEnum, productsPaging } = this.state;

        return(
            <React.Fragment>
                <SideMenu />
                <div className="col-lg-9">
                    <CarouselIndicators />
                    <SortList
                        sortEnum={ProductSortEnum}
                        sortBy={sortByEnum}
                        onSortTypeChange={this.handleSortTypeChange}
                    />
                    <div className="row">
                        {productsPaging.count !== 0
                            ? <ProductTable
                                products={productsPaging.products}
                                viewType={viewType}
                            />
                            : ""}
                    </div>
                    {productsPaging.count !== 0
                        ? <Pager
                            currentPageIndex={pageNumber}
                            itemsCount={ productsPaging.count }
                            pageSize={pageSize}
                            onPageIndexChange={this.handlePageIndexChange}
                        />
                        : "Nebyly nalezeny žádné produkty."
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default ProductList;
