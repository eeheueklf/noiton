import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center mt-1">
      <h2 className="text-4xl font-bold mb-4">페이지를 찾을 수 없습니다 😢</h2>
      <p className="text-gray-600 mb-8">요청하신 템플릿이 존재하지 않거나 삭제되었을 수 있습니다.</p>
      <Link href="/templates" className="px-6 py-3 bg-black text-white rounded-lg">
        전체 목록으로 돌아가기
      </Link>
    </div>
  )
}