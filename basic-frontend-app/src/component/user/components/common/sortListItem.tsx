import * as React from "react";
import SortTypeEnum from "../products/sortTypeEnum";

interface ISortListItem {
    sortName: SortTypeEnum
    onSortTypeChange(sortType: SortTypeEnum): void
}

class SortListItem extends React.Component<ISortListItem>{

    handleSortTypeChange = (sortType: SortTypeEnum, e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();

        this.props.onSortTypeChange(sortType);
    }

    getButtonClass = (sortBy: SortTypeEnum):string => {
        if(this.props.sortName === sortBy){
            return "list-group-item list-group-item-secondary btn btn-secondary active";
        }
        else{
            return "list-group-item list-group-item-secondary btn btn-secondary";
        }
    }

    render() {
        const { sortName } = this.props;

        return (
            <a className={this.getButtonClass(SortTypeEnum.PriceAsc)} href="fuu" onClick={(e) => this.handleSortTypeChange(SortTypeEnum.PriceAsc, e)}>{sortName}</a>
        );
    }
}

export default SortListItem;
