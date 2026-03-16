import Image from 'next/image'
import dynamic from 'next/dynamic'


const HomeSearchBar = dynamic(() => 
    import("@/components/(main)/search/SearchBar").then(mod => mod.HomeSearchBar), 
    { 
        ssr: true, 
        loading: () => <div className="h-[46px] w-full max-w-[320px] mx-auto bg-[#f5f5f5] rounded-full animate-pulse" /> 
    }
);export function HomeVisual(){
    return (
        <section className="max-w-[1200px] mx-auto text-center pt-16 pb-12 px-6 "> 
            <div className="flex justify-center mb-2">
                <div className="relative w-full md:w-[400px] aspect-[4/1]">
                    <Image
                    src="/search.png"
                    alt="banner"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                    className="object-contain transition-transform duration-500 hover:scale-110"
                    />
                </div>
            </div>
            <h1 className="text-[22px] font-bold tracking-tight mb-6 --font-nanum">
            노션 템플릿, 커버 사진, 아이콘 검색
            </h1>
            <HomeSearchBar />
        </section>
    )
}