import CategoryGrid from '@/components/CategoryGrid';
import FlexContainer from '@/components/FlexContainer';
import OrderButtonIcon from '@/components/OrderButtonIcon';
import ProductGrid from '@/components/ProductGrid';
import SearchProduct from '@/components/SearchProduct';

export default async function Home() {
  return (
    <div className="max-w-screen-lg w-full flex flex-wrap mx-auto my-2">
      <FlexContainer>
        <h2 className="text-3xl font-black">Seja bem vindo!</h2>
        <SearchProduct />
      </FlexContainer>
      <CategoryGrid />
      <ProductGrid />
      <OrderButtonIcon />
    </div>
  );
}
