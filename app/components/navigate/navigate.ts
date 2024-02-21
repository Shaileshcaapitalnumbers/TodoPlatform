"use client"

import { useRouter } from "next/router"

export const navigate = () => {
const router = useRouter()
router.push("/")
}