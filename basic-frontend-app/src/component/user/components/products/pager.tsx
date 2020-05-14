import * as React from "react";

interface IPagerProps {
    currentPageIndex: number,
    itemsCount: number,
    pageSize: number,
    onPageIndexChange(pageIndex: number): void
}

class Pager extends React.Component<IPagerProps>{
    handlePageChange = (pageIndex: number, e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();

        this.props.onPageIndexChange(pageIndex);
    }

    renderItem(index: number, currentIndex: number): any {
        let classes = (index === currentIndex)
            ? "page-item active"
            : "page-item";

        return (
            <li className={classes} key={index}>
                <a className="page-link"
                   onClick={(e) => this.handlePageChange(index, e)}>
                    {index + 1}
                </a>
            </li>
        );
    }

    renderLeftArrow(currentPageIndex: number): any {
        let targetIndex = Math.max(currentPageIndex - 1, 0);
        let classes = currentPageIndex !== 0 ? "page-item" : "page-item disabled";

        return (
            <li className={classes} key="prev">
                <a className="page-link"
                   onClick={(e) => this.handlePageChange(targetIndex, e)}
                   arial-label="Previous">
                    Previous
                </a>
            </li>
        );
    }

    renderRightArrow(currentPageIndex: number, maxPageIndex: number): any {
        let targetIndex = Math.min(currentPageIndex + 1, maxPageIndex);
        let classes = currentPageIndex !== maxPageIndex ? "page-item" : "page-item disabled";

        return (
            <li className={classes} key="next">
                <a className="page-link"
                   onClick={(e) => this.handlePageChange(targetIndex, e)}
                   arial-label="Next">
                    Next
                </a>
            </li>
        );
    }

    render() {
        const { currentPageIndex, itemsCount, pageSize } = this.props;

        if (pageSize === null) {
            return <nav aria-label="Page Navigation"></nav>;
        }

        let maxPage = Math.ceil(itemsCount / pageSize);
        let pages = [];

        pages.push(this.renderLeftArrow(currentPageIndex));

        for (let i = 0; i < maxPage; i++) {
            pages.push(this.renderItem(i, currentPageIndex));
        }

        pages.push(this.renderRightArrow(currentPageIndex, maxPage - 1));

        return(
            <nav aria-label="Page Navigation">
                <ul className="pagination justify-content-center">
                    {pages}
                </ul>
            </nav>
        );
    }
}

export default Pager;
