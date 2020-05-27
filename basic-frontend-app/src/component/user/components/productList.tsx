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
import SortTypeEnum from "./products/sortTypeEnum";

type ProductListProps = RouteComponentProps;

class ProductList extends React.Component<ProductListProps>{
    state = {
        productsPaging: {
            products: Array<IProductItem>(),
            count: 0,
        },
        viewType: ViewTypeEnum.gridView,
        pageNumber: 0,
        pageSize: 3,
        sortAsc: true,
        sortBy: 'name',
        sortByEnum: SortTypeEnum.NameAsc,
        searchTerm: ''
    };

    async componentDidMount(){
        const { pageNumber, pageSize, sortBy, sortAsc } = this.state;

        const { data: products } = await http.get(ProductController_GetProducts(pageNumber, pageSize, sortBy, sortAsc));

        this.setState({ productsPaging: products.result });
        this.setState({ searchTerm: this.props.location.state });
    }

    async componentDidUpdate(prevProps: Readonly<ProductListProps>, prevState: Readonly<any>) {
        const { pageNumber, pageSize, sortBy, sortAsc, searchTerm } = this.state;

        if(prevProps.location.state !== this.props.location.state){
            this.setState({ searchTerm: this.props.location.state });

            if(this.props.location.state !== undefined && this.props.location.state !== ''){
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
        let products = this.state.productsPaging.products;

        if(products.length !== 0){
            if(this.state.searchTerm !== undefined && this.state.searchTerm !== null){
                products = this.filterProducts(products);
            }
            //products = this.pageProducts(products);
            //products = this.sortProducts(products);
        }

        return products;
    }
*/

    render() {
        const { viewType, pageNumber, pageSize, searchTerm, sortByEnum, productsPaging } = this.state;

        return(
            <React.Fragment>
                <SideMenu />
                <div className="col-lg-9">
                    <CarouselIndicators />
                    <SortList
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
