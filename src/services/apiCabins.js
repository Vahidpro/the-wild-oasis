import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
	const { data, error } = await supabase.from("cabins").select("*");

	if (error) {
		console.log(error);
		throw new error("Cabnis could not be loaded");
	}

	return data;
}

export async function createEditCabin(newCabin, id) {
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		""
	);
	const imagePath = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

	// 1. Create/edit a cabin

	let query = supabase.from("cabins");
	// A. Create
	if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

	// B. Edit

	if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

	const { data, error } = await query.select().single();
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
