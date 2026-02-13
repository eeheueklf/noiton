import { HomeSearchBar } from "@/components/(main)/search/SearchBar";
export function HomeVisual(){
    return (
        <section className="max-w-[1200px] mx-auto text-center pt-16 pb-12 px-6 "> 
            <img 
            src="/search.png" 
            alt="Search Icon"
            className="mx-auto w-100 mb-4 object-contain transition-transform duration-500 hover:scale-110" 
            />
            <h1 className="text-[22px] font-bold tracking-tight mb-6" style={{ fontFamily: 'NanumHuman, sans-serif' }}>
            노션 템플릿, 커버 사진, 아이콘 검색
            </h1>
            <HomeSearchBar />
        </section>
    )
}