import Category from "@/schemas/Category";
import FilterByCategory from "../../components/filter-by-category";
import FilterByPrice from "../../components/filter-by-price";

interface Props {
  categorys: Category[];
}

function Aside({ categorys }: Props) {
  return (
    <aside className="space-y-6 rounded-2xl">
      <FilterByCategory categorys={categorys} />
      <FilterByPrice />
    </aside>
  );
}

export default Aside;
