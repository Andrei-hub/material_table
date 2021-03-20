import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import axios from "axios";
import HeadCells from "./components/HeadCells";
import BodyCells from "./components/BodyCells";
import TablePagination from "@material-ui/core/TablePagination";


const fetchURL = 'https://jsonplaceholder.typicode.com/users'

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    container: {
        maxWidth: 1200,
        margin: "auto",
        backgroundColor: '#424242'
    },
    pagination: {
        color: '#fff'
    }
});


const TableWrap = () => {

    const [users, setUsers] = useState([])

    // console.log('data', users)
    useEffect(() => {
        axios
            .get(fetchURL)
            .then(res => {
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const pages = [5, 10, 15]
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pages[page])
    const [order, setOrder] = useState()
    const [orderBy, setOrderBy] = useState()

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1
        }
        if (b[orderBy] > a[orderBy]) {
            return 1
        }
        return 0
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy)
    }

    const stableSort = (array, comparator) => {
        const stabilizedThis = array.map((el, index) => [el, index])
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0])
            if (order !== 0) return order
            return a[1] - b[1]
        });
        return stabilizedThis.map((el) => el[0])
    }
    const classes = useStyles()

    const myState = (s) => {
         setOrder(s)
    }
    const myOrder = (o) => {
         setOrderBy(o)
    }


    console.log(order)
    console.log(orderBy)

    return (
        <TableContainer component={Paper} className={classes.container}>
            <Table className={classes.table} aria-label="simple table">
                <HeadCells setOrderParent={(s) => myState(s)}
                           setOrderByParent={(o) => myOrder(o)}
                />

                <BodyCells
                    users={stableSort(users, getComparator(order, orderBy)).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}/>
            </Table>
            <TablePagination
                className={classes.pagination}
                rowsPerPageOptions={pages}
                component="TableCell"
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />

        </TableContainer>
    );
}
export default TableWrap