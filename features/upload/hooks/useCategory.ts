
import { useEffect, useState, useMemo } from "react";
import { templateService } from "../services/templateService";
import { CategoryDetail } from "@/types/template";

export function useCategory(){
    const [allCategories, setAllCategories] = useState<CategoryDetail[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedLevels, setSelectedLevels]= useState({
        lvl1:"",
        lvl2: "",
        lvl3: "",
    })

    useEffect(() => {
        let isMounted = true;
        const loadCategories = async () => {
            try {
                const data = await templateService.fetchCategories();
                if (isMounted && data) setAllCategories(data);
            } catch (error) {
                console.error("카테고리 로딩 실패:", error);
            } finally {
                if(isMounted) setIsLoading(false);
            }
        };
        loadCategories();
        return () => { isMounted = false; }; 
    }, []);
    

    const options = useMemo(()=> ({
        level1: allCategories.filter((c) => c.level === 1),
        level2: allCategories.filter((c) => c.parent_id === selectedLevels.lvl1),
        level3: allCategories.filter((c) => c.parent_id === selectedLevels.lvl2),
    }), [allCategories, selectedLevels.lvl1, selectedLevels.lvl2])

    const selectLevel1 = (id: string) => {
        setSelectedLevels({ lvl1: id, lvl2: "", lvl3: "" });
    };

    const selectLevel2 = (id: string) => {
        setSelectedLevels(prev => ({ ...prev, lvl2: id, lvl3: "" }));
    };

    const selectLevel3 = (id: string) => {
        setSelectedLevels(prev => ({ ...prev, lvl3: id }));
    };

    return{
        options,
        isLoading,
        selectedLevels,
        selectLevel1,
        selectLevel2,
        selectLevel3,
    }
}