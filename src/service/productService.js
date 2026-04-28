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




