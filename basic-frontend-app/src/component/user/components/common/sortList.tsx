import * as React from "react";
import SortTypeEnum from "../products/sortTypeEnum";

interface ISortListProps {
    sortBy: SortTypeEnum
    onSortTypeChange(sortType: SortTypeEnum): void
}

class SortList extends React.Component<ISortListProps>{

    handleSortTypeChange = (sortType: SortTypeEnum, e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();

        this.props.onSortTypeChange(sortType);
    }

    getButtonClass = (sortBy: SortTypeEnum):string => {
        if(this.props.sortBy === sortBy){
            return "list-group-item list-group-item-secondary btn btn-secondary active";
        }
        else{
            return "list-group-item list-group-item-secondary btn btn-secondary";
        }
    }

    render() {
        return(
            <ul className="list-group list-group-horizontal my-4 w-100 bg-dark">
                <a className={this.getButtonClass(SortTypeEnum.PriceAsc)} href="fuu" onClick={(e) => this.handleSortTypeChange(SortTypeEnum.PriceAsc, e)}>Nejlevnější</a>
                <a className={this.getButtonClass(SortTypeEnum.PriceDesc)} href="fuu" onClick={(e) => this.handleSortTypeChange(SortTypeEnum.PriceDesc, e)}>Nejdražší</a>
                <a className={this.getButtonClass(SortTypeEnum.NameAsc)} href="fuu" onClick={(e) => this.handleSortTypeChange(SortTypeEnum.NameAsc, e)}>A-Z</a>
                <a className={this.getButtonClass(SortTypeEnum.NameDesc)} href="fuu" onClick={(e) => this.handleSortTypeChange(SortTypeEnum.NameDesc, e)}>Z-A</a>
            </ul>
        );
    }
}

export default SortList;
