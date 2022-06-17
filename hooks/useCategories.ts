import {useState, useEffect} from "react";
import { getCategories } from "Services";
import {Categories as ICategories} from "types";


async function useCategories() {
    const [categories, setCategories] = useState<Array<ICategories>>([]);
    // 这里还是需要优化，组件内部也写了不少。用redux可以放在仓库里。
    useEffect(() => {
        getCategories().then(result => {
            setCategories(result)
        })
    }, [])
    
    return [categories]
}

export default useCategories