import * as React from "react";
import {IProductItem} from "../../../../apiModels/viewModels";
import ProductListItem from "./productListItem";
import ViewTypeEnum from "./viewTypeEnum";
import ProductGridItem from "./productGridItem";

interface IProductTableProps {
    products: IProductItem[],
    viewType: ViewTypeEnum
}

class ProductTable extends React.Component<IProductTableProps>{
    render(){
        const { products, viewType } = this.props;

        if(viewType === ViewTypeEnum.gridView){
            return(
                <React.Fragment>
                    { products.map(function (product) {
                        return <ProductListItem product={product} key={product.id} />
                    })}
                </React.Fragment>
            );
        }
        else{
            return (
                <React.Fragment>
                    <div className="row g-pt-30 g-mb-50">
                        {products.map(function (product) {
                            return <ProductGridItem product={product} key={product.id} />;
                        })}
                    </div>
                    <hr className="g-mb-60" />
                </React.Fragment>
            );
        }
    }
}

export default ProductTable;
