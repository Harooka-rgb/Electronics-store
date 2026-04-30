import { supabase } from "../supabase";



export const getProducts = async (category_id) => {

    let query = supabase.from('products').select('*');

    if (category_id) {
        query = query.eq('category_id', category_id);
    }

    const { data: products } = await query
    
    console.log(products);

    return products;
}

export const deleteProduct = async (id) => {
    const { data, error } = await supabase
        .from('products')
        .delete()
        .eq('id', id)
    if (error) throw error
    return data
}

export const updateProduct = async (id, updates) => {
    const { data, error } = await supabase
        .from('products')
        .update(updates)
        .eq('id', id)
    if (error) throw error
    return data
}




