'use client'

import { useAuth } from "@/contexts/AuthContext";
import { addReview } from "@/lib/firestore/reviews/write";
import { useUser } from "@/lib/firestore/user/read";
import { Rating } from "@mui/material"
import { Button } from "@nextui-org/react"
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddReview({productId}) {
    const [isLoading, setIsLoading] = useState(false);
    const [rating, setRating] = useState(4);
    const [message, setMessage] = useState("");
    const {user} = useAuth();
    const {data: userData} = useUser({uid: user?.uid});

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            if(!user){
                throw new Error("You need to be logged in to add a review");
            }
            await addReview({
                displayName: userData?.displayName,
                photoURL: userData?.photoURL,
                message: message,
                productId: productId,
                rating: rating,
                uid: user?.uid,
            });
            setMessage("");
            toast.success("Successfully added review :)");
        } catch (error) {
            toast.error(error?.message)
        }
        setIsLoading(false);
    }

    return (
        <div className="flex flex-col gap-3 p-3 rounded-xl border w-full">
            <h1 className="text-lg font-semibold">Rate This Product</h1>
            <Rating 
                value={rating}
                onChange={(event, newValue) => {
                    setRating(newValue);
                }}
            />
            <textarea 
                value={message}
                onChange={e => setMessage(e.target.value)}
                type="text" 
                placeholder="Enter your thoughts on this product..."
                className="w-full border border-lg px-4 py-2 focus:outline-none" 
            />
            <Button onClick={handleSubmit} isLoading={isLoading} isDisabled={isLoading}>Submit</Button>
        </div>
    )
}