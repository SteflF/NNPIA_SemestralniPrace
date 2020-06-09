import * as React from "react";
import SortListItem from "./sortListItem";

interface ISortListProps {
    sortEnum: any
    sortBy: number
    onSortTypeChange(sortIndex: number): void
}

class SortList extends React.Component<ISortListProps>{
    render() {
        const { sortEnum, sortBy, onSortTypeChange } = this.props;

        return(
            <ul className="list-group list-group-horizontal my-4 w-100 bg-dark">
                {
                    Object.keys(sortEnum).filter(key => !isNaN(Number(sortEnum[key]))).map(function (item, index) {
                        return <SortListItem key={index} sortIndex={index} sortName={item} sortBy={sortBy} onSortTypeChange={onSortTypeChange} />
                    })
                }
            </ul>
        );
    }
}

export default SortList;
