import * as React from "react";
import SortTypeEnum from "../products/sortTypeEnum";

interface ISortListProps {
    sortType: SortTypeEnum
    onSortTypeChange(sortType: SortTypeEnum): void
}

class SortList extends React.Component<ISortListProps>{

    handleSortTypeChange = (sortType: SortTypeEnum, e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();

        this.props.onSortTypeChange(sortType);
    }

    getButtonClass = (sortType: SortTypeEnum):string => {
        if(this.props.sortType === sortType){
            return "list-group-item list-group-item-secondary btn btn-secondary active";
        }
        else{
            return "list-group-item list-group-item-secondary btn btn-secondary";
        }
    }

    render() {
        return(
            <ul className="list-group list-group-horizontal my-4 w-100 bg-dark">
                <a className={this.getButtonClass(SortTypeEnum.PriceLowest)} href="fuu" onClick={(e) => this.handleSortTypeChange(SortTypeEnum.PriceLowest, e)}>Nejlevnější</a>
                <a className={this.getButtonClass(SortTypeEnum.PriceHighest)} href="fuu" onClick={(e) => this.handleSortTypeChange(SortTypeEnum.PriceHighest, e)}>Nejdražší</a>
                <a className={this.getButtonClass(SortTypeEnum.AtoZ)} href="fuu" onClick={(e) => this.handleSortTypeChange(SortTypeEnum.AtoZ, e)}>A-Z</a>
                <a className={this.getButtonClass(SortTypeEnum.ZtoA)} href="fuu" onClick={(e) => this.handleSortTypeChange(SortTypeEnum.ZtoA, e)}>Z-A</a>
            </ul>
        );
    }
}

export default SortList;
