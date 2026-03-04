import Image from 'next/image'

import { HomeSearchBar } from "@/components/(main)/search/SearchBar";
export function HomeVisual(){
    return (
        <section className="max-w-[1200px] mx-auto text-center pt-16 pb-12 px-6 "> 
            <div className="relative mx-auto mb-2 w-[400px] h-[100px]"> 
                <Image 
                    src="/search.png" 
                    alt="banner" 
                    width={400}
                    height={100}
                    priority
                    className="object-contain transition-transform duration-500 hover:scale-110" 
                />
            </div>
            <h1 className="text-[22px] font-bold tracking-tight mb-6" style={{ fontFamily: 'NanumHuman, sans-serif' }}>
            노션 템플릿, 커버 사진, 아이콘 검색
            </h1>
            <HomeSearchBar />
        </section>
    )
}