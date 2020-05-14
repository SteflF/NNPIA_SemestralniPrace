import * as React from "react";
import { number, string } from "prop-types";
import { RouteComponentProps } from "react-router";
import http from "../../../service/httpService";
import {ProductController_GetProduct} from "../../../apiClient/routes";

type ProductDetailProps = RouteComponentProps<{ id: string }>;

class ProductDetail extends React.Component<ProductDetailProps>{
    constructor(props: ProductDetailProps) {
        super(props);
    }

    state = {
        product: {
            id: null,
            name: string,
            price: number,
            description: string,
            photo: string,
            category: string
        }
    };

    async componentDidMount(){
        const productId = parseInt(this.props.match.params.id);
        const product = await http.get(ProductController_GetProduct(productId));
        this.setState({product: product.data.result});
    }

    render() {
        const { product } = this.state;

        if(product.id != null){
            return(
                <div className="col-lg-9">
                    <div className="card mt-4">
                        <img className="card-img-top img-fluid" src="https://picsum.photos/900/400" alt="" />
                        <div className="card-body">
                            <h3 className="card-title">{product.name}</h3>
                            <h4>{product.price} Kč</h4>
                            <p className="card-text">
                                {product.description}
                            </p>
                            <span className="text-warning">★ ★ ★ ★ ☆</span> 4.0 stars
                        </div>
                    </div>

                    <div className="card card-outline-secondary my-4">
                        <div className="card-header">
                            Product Reviews
                        </div>
                        <div className="card-body">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore,
                                similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat
                                laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                            <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                            <hr />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam
                                inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam
                                aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.
                            </p>
                            <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                            <hr />
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam
                                inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam
                                aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.
                            </p>
                            <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                            <hr />
                            <a href="#" className="btn btn-success">Leave a Review</a>
                        </div>
                    </div>
                </div>
            );
        }
        else {
            return (
                <React.Fragment>
                    <h1>LOADING DATA...</h1>
                </React.Fragment>
            )
        }
    }
}

export default ProductDetail;
