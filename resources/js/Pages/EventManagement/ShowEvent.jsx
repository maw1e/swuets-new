import EventTabs from "@/Components/EventManagement/EventTabs";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";

import React from "react";

const ShowEvent = () => {
    const { events, contingents } = usePage().props;
    // console.log(contingents);
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-2xl font-bold leading-tight text-gray-800">
                    {events.name}
                </h2>
            }
        >
            <Head title="Event Management" />

            <div className="py-12">
                <div className="flex flex-col justify-center mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <EventTabs contingents={contingents} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default ShowEvent;
