import { ReactElement, createContext, useState, useEffect } from "react";

// Product Type Initialization
export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

// Initial State
const initState: ProductType[] = [];

export type UseProductsContextType = { products: ProductType[] };

// Initial Context State - Storing the value
const initContextState: UseProductsContextType = {
  products: [],
};

// Context to be shared across the components
const ProductsContext = createContext<UseProductsContextType>(initContextState);

type ChildrenType = {
  children?: ReactElement | ReactElement[];
};

// Provider Section
export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  // Encapsulating the state
  const [products, setProducts] = useState<ProductType[]>(initState);

  // Fetch products from the server
  useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      try {
        const data = await fetch("http://localhost:5000/products");

        if (!data.ok) throw new Error(data.statusText);

        const products = await data.json();
        return products;
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(error.message);
        }
        throw new Error("An unexpected error occurred.");
      }
    };
    // Update the products state with the fetched products
    fetchProducts().then((products) => setProducts(products));
  }, []);
  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
