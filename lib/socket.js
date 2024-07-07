/**
 * @file This file is used to initialize the Socket.io client.
 * @see https://socket.io/how-to/use-with-react
 * @createdBy Dat Phan
 * @createdAt 2024-07-07 17:09
 */

"use client";

import { io } from "socket.io-client";

export const socket = io();
