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
    }
}


export const {
    getCategoryList,
    createCategory
} = categoryListApi