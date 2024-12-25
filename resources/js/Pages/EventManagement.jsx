import Modal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Alert, Button, IconButton, TextField } from "@mui/material";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";

export default function EventManagement() {
    const page = usePage();

    // Modal state
    const [addEventDialogOpen, setAddEventDialogOpen] = useState(false);
    const addEventModalOpen = () => {
        setAddEventDialogOpen(true);
    };
    const addEventModalClose = () => {
        setAddEventDialogOpen(false);
    };

    // Snackbar state
    const [snackbarOpen, setSnackbarOpen] = useState(false);
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

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Event Management
                </h2>
            }
        >
            <Head title="Event Management" />

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

            <div className="py-12">
                <div className="flex flex-col justify-center mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-end mb-4">
                        <Button
                            variant="contained"
                            color="success"
                            onClick={addEventModalOpen}
                        >
                            Add new event
                        </Button>

                        <Modal
                            show={addEventDialogOpen}
                            onClose={addEventModalClose}
                        >
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
                                        <LocalizationProvider
                                            dateAdapter={AdapterDayjs}
                                        >
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
                                                setData(
                                                    "location",
                                                    e.target.value
                                                )
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
                                                setData(
                                                    "description",
                                                    e.target.value
                                                )
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
                                            variant="contained"
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
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
