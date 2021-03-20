import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

const useStyles = makeStyles({
    row: {
        color: '#fff',
        borderColor: 'rgba(81, 81, 81, 1)'
    }
});
const BodyCells = (props) => {


    const dataUser = props.users

    const classes = useStyles();
    return (
        <TableBody>
            {dataUser
                .map((user) => (
                <TableRow key={user.name}>
                    <TableCell component="th" scope="row" className={classes.row}>{user.name}</TableCell>
                    <TableCell align="right" className={classes.row}>{user.username}</TableCell>
                    <TableCell align="right" className={classes.row}>{user.email}</TableCell>
                    <TableCell align="right" className={classes.row}>{user.phone}</TableCell>
                    <TableCell align="right" className={classes.row}>{user.website}</TableCell>
                </TableRow>
            ))}

        </TableBody>
    );
}
export default BodyCells;