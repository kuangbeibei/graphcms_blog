import { FC, useState } from "react";
import Link from "next/link";
import {Categories as ICategories} from "types";
import { useCategories } from "hooks";


const Categories: FC<{}> = () => {
    const [categories, setCategories] = useState<Array<ICategories>>([])
    useCategories().then(res => {
        const [_categories] = res;
        setCategories(_categories);
    });

    return <div className="bg-white shadow-lg rounded-lg p-8 mb-8">
        <h3 className="text-xl font-semibold mb-8 border-b pb-4">
            Categories
        </h3>
        {
            categories.map(category => <Link key={category.name} href={`/category/${category.slug}`}>
                <span className="block cursor-pointer pb-3 mb-3">{category.name}</span>
            </Link>)
        }
    </div>
}

export default Categories;
