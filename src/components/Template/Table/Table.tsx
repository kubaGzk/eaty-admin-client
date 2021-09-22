import React from 'react';
// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
// core components
import styles from '../../../assets/jss//material-dashboard-react/components/tableStyle';
import { Button } from '@material-ui/core';
import TableDropdown, {
  TableDropdownOption,
} from '../../TableDropdown/TableDropdown';

export type TableDataElement =
  | string
  | { action: () => void; name: string }
  | { name?: string; options: TableDropdownOption[] };

const useStyles = makeStyles(styles);

export interface CustomTableProps {
  tableHead: string[];
  tableData: TableDataElement[][];
  tableHeaderColor?: string;
}

const CustomTable: React.FC<CustomTableProps> = (props) => {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor = 'gray' } = props;

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + 'TableHeader']}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop: any, key: any) => {
                return (
                  <TableCell
                    className={classes.tableCell + ' ' + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop: any, key: any) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                {prop.map((prop: any, key: any) => (
                  <TableCell
                    className={classes.tableCell + ' ' + classes.tableHeadCell}
                    key={key}
                  >
                    {prop.name && prop.action ? (
                      <Button onClick={prop.action}>{prop.name}</Button>
                    ) : prop.options ? (
                      <TableDropdown name={prop.name} options={prop.options} />
                    ) : (
                      prop
                    )}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomTable;
