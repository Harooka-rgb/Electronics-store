import { supabase } from "../supabase";

export const uploadFile = async ({ file, onSuccess, onError }) => {
  try {
    const fileName = `${Date.now()}-${file.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("e-commerce")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("e-commerce")
      .getPublicUrl(fileName);

    // ВАЖНО: передаем объект, который попадет в file.response
    onSuccess({ url: data.publicUrl }, file);

  } catch (error) {
    console.error("Ошибка загрузки:", error);
    onError(error);
  }
};