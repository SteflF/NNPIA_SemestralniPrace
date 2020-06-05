import * as React from "react";
import {IProductItem} from "../../../../apiModels/viewModels";
import ProductListItem from "./productListItem";
import ViewTypeEnum from "./viewTypeEnum";

interface IProductTableProps {
    products: IProductItem[],
    viewType: ViewTypeEnum
}

class ProductTable extends React.Component<IProductTableProps>{
    render(){
        const { products, viewType } = this.props;

        if(viewType === ViewTypeEnum.listView){
            return(
                <React.Fragment>
                    { products.map(function (product) {
                        return <ProductListItem product={product} key={product.id} />
                    })}
                </React.Fragment>
            );
        }
    }
}

export default ProductTable;
