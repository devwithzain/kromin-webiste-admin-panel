"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { TproductData, productSchema } from "@/types";
import ImageUpload from "./ImageUpload";
import { useState } from "react";

export default function EditForm({ response }: any) {
	const router = useRouter();
	const [videoUrl, setVideoUrl] = useState(response?.videoUrl || "");

	const onImageUpload = (url: string) => {
		setVideoUrl(url);
		setValue("videoUrl", url);
	};

	const {
		register,
		reset,
		handleSubmit,
		setValue,
		formState: { isSubmitting, errors },
	} = useForm<TproductData>({
		resolver: zodResolver(productSchema),
		defaultValues: {
			title: response?.title || "",
			description: response?.description || "",
			videoUrl: response?.videoUrl || "",
		},
	});

	const onSubmits = async (data: TproductData) => {
		try {
			await axios.patch(`/api/process/${response.id}`, data);
			toast.success("Updated Services");
		} catch (error: any) {
			toast.error("Error updating service");
		} finally {
			reset();
			router.refresh();
			router.push("/dashboard/home");
		}
		console.log(data);
	};

	return (
		<div className="w-full h-screen bg-white pt-10">
			<div className="w-full">
				<form
					onSubmit={handleSubmit(onSubmits)}
					className="w-full flex flex-col gap-4">
					<div className="relative w-full flex flex-col gap-3">
						<div>
							<input
								{...register("title")}
								placeholder=" "
								type="text"
								className="peer p-4 pt-6 w-full font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70"
							/>
							<label className="absolute text-md duration-150 transform -translate-y-3 top-5 z-10 left-0 pl-6 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
								Title
							</label>
							{errors.title && (
								<span className="text-red-500">{errors.title.message}</span>
							)}
						</div>
					</div>
					<div className="relative w-full">
						<input
							{...register("description")}
							placeholder=" "
							type="text"
							className="peer p-4 pt-6 w-full font-light bg-white border-2 rounded-md outline-none transition disabled:opacity-70"
						/>
						<label className="absolute text-md duration-150 transform -translate-y-3 top-5 z-10 left-0 pl-6 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4">
							Description
						</label>
						{errors.description && (
							<span className="text-red-500">{errors.description.message}</span>
						)}
					</div>
					<ImageUpload onImageUpload={onImageUpload} />
					<input
						type="submit"
						className="text-[20px] cursor-pointer text-black font-serif font-medium bg-slate-200 px-6 py-3 rounded-lg"
						disabled={isSubmitting}
					/>
				</form>
			</div>
		</div>
	);
}
