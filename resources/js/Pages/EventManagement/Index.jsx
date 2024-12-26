import Modal from "@/Components/Modal";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
    Alert,
    Button,
    Card,
    CardActions,
    CardContent,
    IconButton,
    Pagination,
    Stack,
    TextField,
} from "@mui/material";
import { useState } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import Grid from "@mui/material/Grid2";
import AddEventButton from "./Partials/AddEventButton";
import DeleteButton from "./Partials/DeleteButton";

export default function EventManagement() {
    const page = usePage();

    const { events } = page.props;

    console.log(events);
    console.log(page.props.flash);

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Event Management
                </h2>
            }
        >
            <Head title="Event Management" />

            <div className="py-12">
                <div className="flex flex-col justify-center mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-end mb-4">
                        <AddEventButton />
                    </div>

                    <div className="overflow-hidden bg-white">
                        <div className="p-6 text-gray-900">
                            {events.data.length === 0 ? (
                                <div className="text-center text-gray-500 my-8">
                                    <h2 className="text-lg font-semibold">
                                        No events found
                                    </h2>
                                    <p>
                                        There are no events to display right
                                        now.
                                    </p>
                                </div>
                            ) : (
                                <Grid container spacing={3}>
                                    {events.data.map((event) => (
                                        <Grid
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            key={event.id}
                                        >
                                            <Card sx={{ minWidth: 372 }}>
                                                <div className="p-2">
                                                    <CardContent>
                                                        <h1 className="text-lg font-bold">
                                                            {event.name}
                                                        </h1>
                                                        <p>{event.date}</p>
                                                        <p>{event.location}</p>
                                                        <p>
                                                            {event.description}
                                                        </p>
                                                    </CardContent>
                                                    <CardActions>
                                                        <Button
                                                            size="small"
                                                            variant="contained"
                                                        >
                                                            View
                                                        </Button>
                                                        <DeleteButton
                                                            event={event}
                                                        />
                                                    </CardActions>
                                                </div>
                                            </Card>
                                        </Grid>
                                    ))}
                                </Grid>
                            )}
                        </div>
                    </div>
                    {events.data.length > 0 && (
                        <div className="my-8 flex justify-center">
                            {events.links.map((link) =>
                                link.url ? (
                                    <Link
                                        key={link.label}
                                        href={link.url}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        className={`p-1 mx-1 ${
                                            link.active ? "text-blue-600" : ""
                                        }`}
                                    />
                                ) : (
                                    <span
                                        key={link.label}
                                        dangerouslySetInnerHTML={{
                                            __html: link.label,
                                        }}
                                        className="p-1 mx-1 text-slate-300"
                                    ></span>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
