"use client";
import axios from "axios";
import Link from "next/link";

export default function EditButton({ id, path }: { id: any; path: string }) {
	const editPost = async (id: any) => {
		try {
			await axios.patch(`${path}/${id}`, {
				data: {
					id,
				},
			});
		} catch (error) {
			console.log("Error", error);
		}
	};

	return (
		<Link
			onClick={() => editPost(id)}
			href={`/admins/product/${id}`}
			className="text-[16px] cursor-pointer font-serif font-medium bg-[#081226] text-white px-4 py-2 rounded-lg">
			Edit
		</Link>
	);
}
