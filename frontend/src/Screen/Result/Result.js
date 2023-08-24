import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import apiHelper from '../../API/ApiHelper';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));




export default function CustomizedTables() {
  const [result, setresult] = React.useState([])
  const { id } = useParams()
  const navigate = useNavigate()


  const Showresult = async () => {
    try {
      const result = await apiHelper.FetchData(id)
      console.log(result)
      if (result) {
        setresult(result.data.result[0])
      }
    } catch (error) {
      console.log(error)
    }
  }
  const StudentData = result?.subject
  const studentdata = result?.student
  console.log(StudentData)

  React.useEffect(() => {
    Showresult()
  }, [])

  return <>
    {
      studentdata ? <>
        <TableContainer sx={{ width: 600, margin: '0 auto', border: "none" }}>
          <Table className='mb-5'>
            <TableHead>
              <TableRow>
                <StyledTableCell>student</StyledTableCell>
                <StyledTableCell align="right">std</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {studentdata?.map((row) => (
                <StyledTableRow key={row?.name} >
                  <StyledTableCell component="th" scope="row">
                    {row?.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row?.std}</StyledTableCell>

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>subject</StyledTableCell>
                <StyledTableCell align="right">Marks</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {StudentData?.map((row) => (
                <StyledTableRow key={row?.subject}>
                  <StyledTableCell component="th" scope="row">
                    {row?.subject}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row?.marks}</StyledTableCell>

                </StyledTableRow>
              ))}


              <StyledTableRow >
                <StyledTableCell sx={{ backgroundColor: "black", color: "white" }} >Total Marks</StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: "black", color: "white" }} align="right" >{result?.totalmarks}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow >
                <StyledTableCell sx={{ backgroundColor: "black", color: "white" }} >Archived Marks</StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: "black", color: "white" }} align="right" >{result?.achievdmarks}</StyledTableCell>
              </StyledTableRow>
              <StyledTableRow >
                <StyledTableCell sx={{ backgroundColor: "green", color: "white" }} >Percentage</StyledTableCell>
                <StyledTableCell sx={{ backgroundColor: "green", color: "white" }} align="right" >{result?.percentage}%</StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <div className='row justify-content-center w-100 text-center mt-3'>
          <div className="col-6 col-md-3">
            <Button variant="contained" className='m-auto' onClick={() => navigate("/")}>Back</Button>
          </div>
          <div className="col-6 col-md-3">
            <Button variant="outlined" className='m-auto' onClick={() => window.print()}>Print</Button>
          </div>
        </div>
      </> : <h1 className='text-center text-danger'>This Student Result Not Declared</h1>
    }
  </>
}