import Modal from "@/Components/Modal";
import { useForm, usePage } from "@inertiajs/react";
import { Alert, Button, IconButton, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";

const DeleteContingentBtn = ({ contingent }) => {
    const [deleteContingentDialogOpen, setDeleteContingentDialogOpen] =
        useState(false);
    const [selectedContingentId, setSelectedContingentId] = useState(null);

    const page = usePage();

    // console.log(page);

    const { delete: destroy } = useForm();

    // Delete event dialog state
    const deleteContingentModalOpen = (eventId) => {
        setSelectedContingentId(eventId);
        setDeleteContingentDialogOpen(true);
    };
    const deleteContingentModalClose = () => {
        setDeleteContingentDialogOpen(false);
        setSelectedContingentId(null);
    };

    const deleteContingent = () => {
        if (selectedContingentId) {
            destroy(route("contingents.destroy", selectedContingentId), {
                onSuccess: () => {
                    deleteContingentModalClose();
                    setSelectedContingentId(null);
                },
            });
        }
    };

    return (
        <section>
            <IconButton
                size="large"
                color="error"
                aria-label="delete"
                onClick={() => deleteContingentModalOpen(contingent.id)}
            >
                <DeleteIcon fontSize="inherit" />
            </IconButton>

            <Modal
                show={deleteContingentDialogOpen}
                onClose={deleteContingentModalClose}
            >
                <div className="p-8">
                    <h1 className="text-2xl font-bold mb-4">
                        Delete Contingent
                    </h1>

                    <p>Are you sure you want to delete this contingent?</p>
                    <div className="flex justify-end gap-4 mt-4">
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={deleteContingentModalClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => deleteContingent(event.id)}
                        >
                            Delete
                        </Button>
                    </div>
                </div>
            </Modal>
        </section>
    );
};

export default DeleteContingentBtn;
