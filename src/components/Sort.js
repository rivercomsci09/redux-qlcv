import React, { Component } from 'react';

class Sort extends Component {

    constructor(props) {
        super(props);
    }
    onClick = (sortBy, sortValue) => {
        this.props.onSort(sortBy, sortValue);
    }
    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6" >
                <div className="dropdown">
                    <button type="button" className="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" id="dropdơnMenu1">Sắp Xếp</button>
                    <ul className="dropdown-menu" aria-labelledby="dropMenu1">
                        <li onClick={() => { this.onClick('name', 1) }}>
                            <a
                                role="button"
                                className = {(this.props.sortBy === 'name' && this.props.sortValue === 1) ? 'sort_selected' : ''}
                            >
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên A - Z
                                    </span>
                            </a>
                        </li>
                        <li onClick={() => { this.onClick('name', -1) }}>
                            <a role="button" className = {(this.props.sortBy === 'name' && this.props.sortValue === -1) ? 'sort_selected' : ''} >
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Tên Z - A
                                    </span>
                            </a>
                        </li>
                        <li onClick={() => { this.onClick('status', 1) }}>
                            <a role="button" className = {(this.props.sortBy === 'status' && this.props.sortValue === 1) ? 'sort_selected' : ''}>
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Trạng Thái Kích Hoạt
                                    </span>
                            </a>
                        </li>
                        <li onClick={() => { this.onClick('status', -1) }}>
                            <a role="button" className = {(this.props.sortBy === 'status' && this.props.sortValue === -1) ? 'sort_selected' : ''}>
                                <span className="fa fa-sort-alpha-asc pr-5">
                                    Trạng Thái Ẩn
                                    </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sort;