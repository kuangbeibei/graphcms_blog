import { FC, useState, useEffect } from "react";
import Link from "next/link";
import {Categories as ICategories} from "types";
import { useCategories } from "hooks";

const Header: FC<{}> = () => {
    const [categories, setCategories] = useState<Array<ICategories>>([])
    useCategories().then(res => {
        const [_categories] = res;
        setCategories(_categories);
    });

    return <div className='container mx-auto px-10 mb-8'>
        <div className="border-b border-blue-400 w-full inline-block py-8">
            <div className="block md:float-left">
                <Link href="/">
                    <span className="cursor-pointer font-bold text-4xl text-white">GraphCMS</span>
                </Link>
            </div>
            <div className="hidden md:float-left md:contents">
                {
                    categories.map((category) => (
                        <Link key={category.slug} href={`/category/${category.slug}`}>
                            <span className="mt-2 align-middle text-white ml-4 font-semibold cursor-pointer hover:text-red-200 md:float-right">
                                {category.name}
                            </span>
                        </Link>
                    ))
                }
            </div>
        </div>
    </div>
}

export default Header