import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const useStyles = makeStyles({
    row: {
        color: '#fff',
        borderColor: 'rgba(81, 81, 81, 1)'
    }
});


const HeadCells = ( props) => {
    const classes = useStyles();

    const headCell = [
        {id: 'name', align: 'left', classes: 'row', name: 'Name'},
        {id: 'userName', align: 'right', classes: 'row', name: 'User name'},
        {id: 'email', align: 'right', classes: 'row', name: 'E-mail'},
        {id: 'phone', align: 'right', classes: 'row', name: 'Phone'},
        {id: 'site', align: 'right', classes: 'row', name: 'Website'},
    ]
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()


    const handleSortRequest = cellId => {
        const isAsc = orderBy === cellId && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(cellId)
        props.setOrderParent(cellId)
        const ordering = isAsc
        props.setOrderByParent(ordering)

    }


    return (
        <TableHead>
            <TableRow>
                {headCell.map((tableHeadCell) => (
                        <TableCell
                            key={tableHeadCell.id}
                            align={tableHeadCell.align}
                            className={classes.row}
                            sortDirection={orderBy === tableHeadCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === tableHeadCell.id}
                                direction={orderBy === tableHeadCell.id ? order : 'asc'}
                                onClick={() => {handleSortRequest(tableHeadCell.id)} }
                            >
                                {tableHeadCell.name}
                            </TableSortLabel>
                        </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}
export default HeadCells;