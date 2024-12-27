import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddContingentsForm from "@/Pages/EventManagement/Partials/AddContingentForm";
import { usePage } from "@inertiajs/react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const EventTabs = ({ contingents }) => {
    const [value, setValue] = React.useState(0);
    // const { events, contingents } = usePage().props;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Contingents" {...a11yProps(0)} />
                    <Tab label="Judge" {...a11yProps(1)} />
                    <Tab label="Criteria" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <div className="w-full flex flex-col gap-4">
                <CustomTabPanel value={value} index={0}>
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-2xl font-bold">CONTINGENTS</h1>
                        <AddContingentsForm />
                    </div>

                    <TableContainer component={Paper}>
                        <Table
                            sx={{ minWidth: 650, padding: "16px" }}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="center">Age</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contingents.map((contingent) => (
                                    <TableRow key={contingent.id}>
                                        <TableCell>{contingent.name}</TableCell>
                                        <TableCell align="center">
                                            {contingent.age}
                                        </TableCell>
                                        <TableCell align="center">
                                            <IconButton
                                                size="large"
                                                color="success"
                                                aria-label="Edit"
                                            >
                                                <EditIcon fontSize="inherit" />
                                            </IconButton>
                                            <IconButton
                                                size="large"
                                                color="error"
                                                aria-label="delete"
                                            >
                                                <DeleteIcon fontSize="inherit" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    Item Three
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    Item Four
                </CustomTabPanel>
            </div>
        </Box>
    );
};

export default EventTabs;
