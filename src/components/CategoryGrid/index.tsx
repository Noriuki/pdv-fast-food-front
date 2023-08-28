import apiService from "@/services/api";
import { Category } from "@/types";
import FlexContainer from "../FlexContainer";
import CategoryCard from "./CategoryCard";

async function getCategories() {
  try {
    const response = await apiService.get('/categories');
    return response.data;
  }
  catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

export default async function CategoryGrid(props: any) {
  const categories = await getCategories();
  return (
    <FlexContainer>
      <div>
        <h3 className="text-2xl font-black">Categorias</h3>
        <span className="font-light">Navegue por categoria</span>
      </div>
      <div className="grid grid-cols-[repeat(4,minmax(0,max-content))] justify-between">
        {categories?.map((category: Category) => (
          <CategoryCard image_url={category?.image_url} name={category.name} key={category.id} />
        ))}
      </div>
    </FlexContainer>
  )
}
