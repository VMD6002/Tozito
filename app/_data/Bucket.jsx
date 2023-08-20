"use client";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const Bucket = atomWithStorage("Bucket", []);
export const Loading = atom(false);
export const Bucket2 = atom([]);
