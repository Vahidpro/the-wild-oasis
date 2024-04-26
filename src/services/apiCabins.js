import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.log(error);
		throw new error("Cabnis could not be loaded");
	}

	return data;
}

export async function createCabin(newCabin) {
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		""
	);
	const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 1. Create a cabin
	const { data, error } = await supabase
		.from("cabins")
		.insert([{ ...newCabin, image: imagePath }])
		.select();

	if (error) {
		console.log(error);
		throw new error("Cabnis could not be created");
	}
	// 2. Upload image

	const { error: storageError } = await supabase.storage
		.from("cabin-images")
		.upload(imageName, newCabin.image);

	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data.id);

		throw new error(
			"Cabnis image could not be uploaded and the cabin was not created"
		);
	}
	return data;
}
export async function deleteCabin(id) {
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.log(error);
		throw new error("Cabnis could not be deleted");
	}

	return data;
}
