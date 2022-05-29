import {
  Box,
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableContainer,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/actions";

import RowGetUsers from "./RowGetUsers";

function GetAllUsersToAdmin({user}) {

  const dispatch = useDispatch();
  const allUsers = useSelector((state) => state.allUsers);
  const [render,setRender] = useState("")
  
  useEffect(() => {
    dispatch(getAllUsers());
  }, [render]);


  console.log(`Samu se está comiendo ${render} pijas! y le encanta!`);
  console.log("cerra el orto!!",allUsers)
  return (
    <Box sx={{ mt: 5, width: "100%" }}>
      <TableContainer component={Paper} align="center">
        <Table aria-label="collapsible table">
          <TableHead>
            <TableCell sx={{ width: "5%" }} />

            <TableCell>
              <Typography variant="h5">Usuario</Typography>
            </TableCell>

            <TableCell>
              <Typography variant="h5">Nombre de usuario</Typography>
            </TableCell>

            <TableCell>
              <Typography variant="h5">Tipo</Typography>
            </TableCell>

            <TableCell sx={{ width: "10%" }}></TableCell>

            <TableCell sx={{ width: "10%" }}></TableCell>
            {user === "superAdmin" ? (
            <TableCell>
            </TableCell>
            ):<></>}
          </TableHead>
          <TableBody>
            {allUsers?.map((p) => {
              return (
                p.role === "user" || p.role === "admin"? 
                <RowGetUsers row={p} user={user} setRender={setRender} render={render} />:
                <></>
              )

            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default GetAllUsersToAdmin;