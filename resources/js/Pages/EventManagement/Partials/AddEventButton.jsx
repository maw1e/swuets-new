import Modal from "@/Components/Modal";
import { Alert, Button, IconButton, Snackbar, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useForm, usePage } from "@inertiajs/react";

const AddEventButton = () => {
    const page = usePage();
    const [addEventDialogOpen, setAddEventDialogOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // Add Event
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        date: null,
        location: "",
        description: "",
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("event-management.store"), {
            onSuccess: () => {
                addEventModalClose();
                setSnackbarOpen(true);
            },
        });
    };

    // Add event Modal state
    const addEventModalOpen = () => {
        setAddEventDialogOpen(true);
    };
    const addEventModalClose = () => {
        setAddEventDialogOpen(false);
    };

    // Snackbar state
    const snackbarClose = () => {
        setSnackbarOpen(false);
    };
    const snackbarAction = (
        <>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={snackbarClose}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </>
    );

    return (
        <section>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                onClose={snackbarClose}
                action={snackbarAction}
            >
                <Alert
                    onClose={snackbarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: "100%" }}
                >
                    {page.props.flash.success}
                </Alert>
            </Snackbar>
            <Button
                variant="contained"
                color="success"
                onClick={addEventModalOpen}
            >
                Add new event
            </Button>

            <Modal show={addEventDialogOpen} onClose={addEventModalClose}>
                <form onSubmit={submit}>
                    <div className="p-8">
                        <h1 className="font-bold text-lg mb-4">
                            Add new event
                        </h1>

                        <div className="flex flex-col gap-4">
                            <TextField
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                fullWidth
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                            />
                            {errors.name && (
                                <div className="text-red-500">
                                    {errors.name}
                                </div>
                            )}
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Date"
                                    value={data.date}
                                    onChange={(newDate) =>
                                        setData("date", newDate)
                                    }
                                />
                            </LocalizationProvider>
                            {errors.date && (
                                <div className="text-red-500">
                                    {errors.date}
                                </div>
                            )}
                            <TextField
                                id="outlined-basic"
                                label="Location"
                                variant="outlined"
                                fullWidth
                                value={data.location}
                                onChange={(e) =>
                                    setData("location", e.target.value)
                                }
                            />
                            {errors.location && (
                                <div className="text-red-500">
                                    {errors.location}
                                </div>
                            )}
                            <TextField
                                id="outlined-basic"
                                label="Description"
                                variant="outlined"
                                fullWidth
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                            {errors.description && (
                                <div className="text-red-500">
                                    {errors.description}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-end gap-4 mt-4">
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={addEventModalClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                disabled={processing}
                            >
                                Add Event
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
        </section>
    );
};

export default AddEventButton;
