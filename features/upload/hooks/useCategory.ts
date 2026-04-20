
import { useEffect, useState, useMemo } from "react";
import { createClient } from "@/utils/supabase/client";

interface Category {
  id: string;
  name: string;
  path: string;
  parent_id: string | null;
  level: number;
}

export function useCategory(){
    const supabase = createClient();
    const [allCategories, setAllCategories] = useState<Category[]>([]);
    const [selectedLevels, setSelectedLevels]= useState({
        lvl1:"",
        lvl2: "",
        lvl3: "",
    })

    useEffect(() => {
        const fetchCats = async () => {
        const { data } = await supabase
            .from("categories")
            .select("id, name, path, parent_id, level")
            .order("name");
        if (data) setAllCategories(data);
        };
        fetchCats();
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
        selectedLevels,
        selectLevel1,
        selectLevel2,
        selectLevel3,
    }
}