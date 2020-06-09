import * as React from "react";

interface ISortListItem {
    sortIndex: number
    sortName: string
    sortBy: number
    onSortTypeChange(sortType: any): void
}

class SortListItem extends React.Component<ISortListItem>{

    handleSortTypeChange = (sortIndex: number, e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();

        this.props.onSortTypeChange(sortIndex);
    }

    getButtonClass = (sortIndex: number):string => {
        if(this.props.sortBy === sortIndex){
            return "list-group-item list-group-item-secondary btn btn-secondary active";
        }
        else{
            return "list-group-item list-group-item-secondary btn btn-secondary";
        }
    }

    render() {
        const { sortIndex, sortName } = this.props;
        return (
            <a className={this.getButtonClass(sortIndex)} href="#fuu" onClick={(e) => this.handleSortTypeChange(sortIndex, e)}>{sortName}</a>
        );
    }
}

export default SortListItem;
