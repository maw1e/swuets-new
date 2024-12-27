import Modal from "@/Components/Modal";
import { Button, TextField, IconButton } from "@mui/material";
import React, { useState } from "react";

import { Delete } from "@mui/icons-material";
import { useForm, usePage } from "@inertiajs/react";

const AddContingentsForm = () => {
    const { events } = usePage().props;
    const [addContingentDialog, setAddContingentDialog] = useState(false);

    // Initialize form with data
    const { data, setData, post, processing, errors } = useForm({
        event_id: events?.id || "",
        contingents: [{ name: "", age: "" }],
    });

    // Handle input change
    const handleInputChange = (index, field, value) => {
        const updatedContingents = [...data.contingents];
        updatedContingents[index][field] = value;
        setData("contingents", updatedContingents);
    };

    // Add a new row
    const handleAddRow = () => {
        setData("contingents", [...data.contingents, { name: "", age: "" }]);
    };

    // Remove a row
    const handleRemoveRow = (index) => {
        setData(
            "contingents",
            data.contingents.filter((_, i) => i !== index)
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log("Submitting data:", data);

        post(route("contingents.store"), {
            onSuccess: () => {
                setData("contingents", [{ name: "", age: "" }]);
                setAddContingentDialog(false);
            },
        });
    };

    return (
        <>
            <Button
                variant="contained"
                color="success"
                onClick={() => setAddContingentDialog(true)}
            >
                Add Contingent
            </Button>

            <Modal
                show={addContingentDialog}
                onClose={() => setAddContingentDialog(false)}
            >
                <form onSubmit={handleSubmit}>
                    <div className="p-8">
                        <h1 className="font-bold text-lg mb-4">
                            Add new contingents
                        </h1>

                        {errors.error && (
                            <div className="text-red-500 mb-4">
                                {errors.error}
                            </div>
                        )}

                        <div
                            style={{
                                maxHeight: "400px",
                                overflowY: "auto",
                                padding: "8px",
                                marginBottom: "16px",
                            }}
                        >
                            {data.contingents.map((contingent, index) => (
                                <div
                                    key={index}
                                    className="flex items-center gap-4 mb-4"
                                >
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        value={contingent.name}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "name",
                                                e.target.value
                                            )
                                        }
                                        error={
                                            !!errors[
                                                `contingents.${index}.name`
                                            ]
                                        }
                                        helperText={
                                            errors[`contingents.${index}.name`]
                                        }
                                        fullWidth
                                    />

                                    <TextField
                                        label="Age"
                                        type="number"
                                        variant="outlined"
                                        value={contingent.age}
                                        onChange={(e) =>
                                            handleInputChange(
                                                index,
                                                "age",
                                                e.target.value
                                            )
                                        }
                                        error={
                                            !!errors[`contingents.${index}.age`]
                                        }
                                        helperText={
                                            errors[`contingents.${index}.age`]
                                        }
                                        fullWidth
                                    />

                                    <IconButton
                                        color="error"
                                        onClick={() => handleRemoveRow(index)}
                                    >
                                        <Delete />
                                    </IconButton>
                                </div>
                            ))}
                        </div>

                        <Button
                            type="button"
                            variant="outlined"
                            color="primary"
                            onClick={handleAddRow}
                            sx={{ my: 4 }}
                        >
                            Add Another Contingent
                        </Button>

                        <div className="flex justify-end gap-4 mt-4">
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => setAddContingentDialog(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="success"
                                disabled={processing}
                            >
                                {processing
                                    ? "Submitting..."
                                    : "Submit Contingents"}
                            </Button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default AddContingentsForm;
