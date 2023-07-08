import supabase, { supabaseUrl } from "./supabase";

export async function createEditCabin(newCabin) {
  const checkImage =
    typeof newCabin.image === "string" &&
    newCabin?.image?.includes(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  const image = !checkImage ? imagePath : newCabin.image;

  let query = supabase.from("cabins");

  if (!newCabin.id) query = query.insert([{ ...newCabin, image }]);
  else query = query.update({ ...newCabin, image }).eq("id", newCabin.id);

  const { data, error } = await query.select().single();

  if (error) {
    if (newCabin.id) {
      console.log("There was some error updating data...");
      throw new Error("There was some error updating data");
    } else {
      console.log("There was some error creating data...");
      throw new Error("There was some error creating data");
    }
  }

  if (!checkImage) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.log(storageError);
      throw new Error(
        "There was some error uploading image, cabin was not created"
      );
    }
  }
}

export async function getCabins() {
  let { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log("There was some error loading data...");
    throw new Error("There was some error loading data");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log("There was some error deleting data...");
    throw new Error("There was some error deleting data");
  }
  return data;
}
