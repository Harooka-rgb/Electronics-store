import { supabase } from '../supabase'
//write crud supabase methods

const categoryListApi = {
    getCategoryList: async () => {
        const { data: categories } = await supabase.from('category_list').select
        ('*')
        return categories
    },
    createCategory: async (category) => {
        const { data: categories } = await supabase.from('category_list').insert
        (category)
        return categories
    },
    deleteCategory: async (id) => {
        const { data, error } = await supabase
            .from('category_list')
            .delete()
            .eq('id', id)
        if (error) throw error
        return data
    },
    updateCategory: async (id, updates) => {
        const { data, error } = await supabase
            .from('category_list')
            .update(updates)
            .eq('id', id)
        if (error) throw error
        return data
    }
}


export const {
    getCategoryList,
    createCategory,
    deleteCategory,
    updateCategory
} = categoryListApi