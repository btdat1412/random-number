"use client";

import React from "react";

import { useSession } from "next-auth/react";

const UserInfo = () => {
    const { data } = useSession();

    return <pre>{JSON.stringify(data)}</pre>;
};

export default UserInfo;
