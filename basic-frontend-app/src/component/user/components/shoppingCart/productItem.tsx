import * as React from "react";

class ProductItem extends React.Component {
    render() {
        return(
            <tr>
                <td><img src="https://picsum.photos/100"/></td>
                <td>@item.Name</td>
                <td>@item.Count</td>
                <td>@Math.Round(item.Price, MidpointRounding.AwayFromZero) Kč</td>
                <td>
                    <a className="btn btn-danger" asp-action="RemoveItemFromCart"
                       asp-route-id="@item.Id"
                       title="Odebrat položku"><i className="far fa-trash-alt"></i>Odebrat</a>
                </td>
            </tr>
        );
    }
}

export default ProductItem;
