import * as React from "react";
import { string } from "prop-types";
import {RouteComponentProps} from 'react-router';
import {IProductItem} from "../../../apiModels/viewModels";
import http from "../../../service/httpService";
import {ProductController_GetProducts} from "../../../apiClient/routes";
import ViewTypeEnum from "./products/viewTypeEnum";
import ProductTable from "./products/productTable";
import CarouselIndicators from "./common/carouselIndicators";

type ProductDetailProps = RouteComponentProps;

class ProductCategoryList extends React.Component<ProductDetailProps>{
    constructor(props: ProductDetailProps) {
        super(props);
    }

    state = {
        products: Array<IProductItem>(),
        viewType: ViewTypeEnum.gridView,
        category: string
    };

    async componentDidMount(){
        const { data: products } = await http.get(ProductController_GetProducts);
        this.setState({category: this.props.location.state})

        const filteredProducts = products.result.filter((i: any) => i.category === this.state.category);

        this.setState({ products: filteredProducts });
    }

    render() {
        const { viewType } = this.state;
        let products = this.state.products;

        return(
            <div className="col-lg-9">
                <CarouselIndicators />
                <div className="row">
                    <ProductTable
                        products={products}
                        viewType={viewType}
                    />
                </div>
            </div>
        );
    }
}

export default ProductCategoryList;
