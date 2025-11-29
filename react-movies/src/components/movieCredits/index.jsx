import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router";

const headshot = (path) =>
    path ? `https://image.tmdb.org/t/p/w185/${path}` : "";

const MovieCredits = ({ cast = [] }) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="credits table">
                <TableHead>
                    <TableRow>
                        <TableCell>Actor</TableCell>
                        <TableCell align="center">Character</TableCell>
                        <TableCell align="right">Department</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {cast.map((p) => (
                        <TableRow key={`${p.id}-${p.cast_id || p.credit_id}`}>
                            <TableCell component="th" scope="row">
                                <Avatar
                                    alt={p.name}
                                    src={headshot(p.profile_path)}
                                    sx={{ mr: 1, display: "inline-flex", verticalAlign: "middle" }}
                                />
                                <Link to={`/person/${p.id}`} style={{ textDecoration: "none" }}>
                                    {p.name}
                                </Link>
                            </TableCell>
                            <TableCell align="center">{p.character || "-"}</TableCell>
                            <TableCell align="right">{p.known_for_department || "-"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MovieCredits;
