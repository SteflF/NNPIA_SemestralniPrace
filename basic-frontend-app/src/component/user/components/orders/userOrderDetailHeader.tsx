import * as React from "react";

interface IUserOrderDetailHeaderProps {
    order: {
        id: number
        state: string
    }
}

class UserOrderDetailHeader extends React.Component<IUserOrderDetailHeaderProps>{

    render() {
        const { order } = this.props;

        return(
            <React.Fragment>
                <h2>Objednávka</h2>
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Datum</th>
                        <th scope="col">Číslo objednávky</th>
                        <th scope="col">Stav objednávky</th>
                        <th scope="col">&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>Datum</td>
                        <td>{order.id}</td>
                        <td>{order.state}</td>
                        <td></td>
                    </tr>
                    </tbody>
                </table>
            </React.Fragment>
        )
    }
}

export default UserOrderDetailHeader;
