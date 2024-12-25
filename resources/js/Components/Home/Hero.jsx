import { Link } from "@inertiajs/react";
import { Button } from "@mui/material";
import React from "react";

const Hero = () => {
    return (
        <section className="text-center flex flex-col gap-8 items-center">
            <h1 className="text-7xl font-bold">
                WELCOME TO{" "}
                <span className="font-serif text-blue-600">SWUETS</span>
            </h1>
            <p className="w-1/2">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Commodi eum tempora temporibus nesciunt esse voluptas fuga
                consequuntur illum odit, corporis rem voluptatem culpa vero modi
                natus. Deleniti autem corporis possimus?
            </p>
            <Link href={route("login")}>
                <Button variant="contained" size="large">
                    Get Started
                </Button>
            </Link>
        </section>
    );
};

export default Hero;
