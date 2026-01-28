"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  return (
    <main style={{ padding: "50px", textAlign: "center" }}>
      <h1>🚀 노션 템플릿 마켓</h1>

      {session ? (
        <div>
          <p>반갑습니다, <strong>{session.user?.name}</strong>님!</p>
          {session.user?.image && (
            <img 
              src={session.user.image} 
              alt="프로필" 
              style={{ borderRadius: "50%", width: "80px", marginBottom: "10px" }} 
            />
          )}
          <br />
          <button onClick={() => signOut()} style={{ padding: "10px 20px", cursor: "pointer" }}>
            로그아웃
          </button>
        </div>
      ) : (
        <div>
          <p>로그인이 필요합니다.</p>
          <button onClick={() => signIn("google")} style={{ padding: "10px 20px", cursor: "pointer" }}>
            구글로 시작하기
          </button>
        </div>
      )}
    </main>
  );
}

