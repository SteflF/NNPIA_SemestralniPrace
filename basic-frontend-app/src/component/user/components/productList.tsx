import * as React from "react";
import {IProductItem} from "../../../apiModels/viewModels";
import http from "../../../service/httpService";
import {ProductController_GetProducts} from "../../../apiClient/routes";
import ViewTypeEnum from "./products/viewTypeEnum";
import ProductTable from "./products/productTable";
import CarouselIndicators from "./common/carouselIndicators";

class ProductList extends React.Component{
    state = {
        products: Array<IProductItem>(),
        viewType: ViewTypeEnum.gridView
    };

    async componentDidMount(){
        const { data: products } = await http.get(ProductController_GetProducts);

        this.setState({ products: products.result });
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

export default ProductList;
