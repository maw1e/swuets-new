import { useForm, usePage } from "@inertiajs/react";
import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@/Components/Modal";

const DeleteButton = ({ event }) => {
    const [deleteEventDialogOpen, setDeleteEventDialogOpen] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const page = usePage();

    const { delete: destroy } = useForm();

    // Delete event dialog state
    const deleteEventModalOpen = (eventId) => {
        setSelectedEventId(eventId);
        setDeleteEventDialogOpen(true);
    };
    const deleteEventModalClose = () => {
        setDeleteEventDialogOpen(false);
        setSelectedEventId(null);
    };

    useEffect(() => {
        if (page.props.flash.success) {
            setSnackbarMessage(page.props.flash.success);
            setSnackbarOpen(true);
        }
    }, [page.props.flash.success]);

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

    const deleteEvent = () => {
        if (selectedEventId) {
            destroy(route("event-management.destroy", selectedEventId), {
                onSuccess: () => {
                    deleteEventModalClose();
                    setSnackbarMessage(page.props.flash.success);
                    setSnackbarOpen(true); // Open the Snackbar
                    setSelectedEventId(null);
                    console.log("Event deleted");
                },
            });
        }
    };
    // setSnackbarOpen(true);
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
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Button
                size="small"
                variant="outlined"
                color="error"
                onClick={() => deleteEventModalOpen(event.id)}
            >
                Delete
            </Button>
            <Modal show={deleteEventDialogOpen} onClose={deleteEventModalClose}>
                <div className="p-8">
                    <h1 className="text-2xl font-bold mb-4">Delete Event</h1>

                    <p>Are you sure you want to delete this event?</p>
                    <div className="flex justify-end gap-4 mt-4">
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={deleteEventModalClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteEvent(event.id)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </section>
    );
};

export default DeleteButton;
