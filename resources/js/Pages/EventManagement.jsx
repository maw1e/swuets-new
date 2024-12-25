import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button } from "@mui/material";

export default function EventManagement() {
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
                        <Button variant="contained" color="success">
                            Add new event
                        </Button>
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
