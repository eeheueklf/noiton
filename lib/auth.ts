// lib/auth.ts
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createClient } from "@/utils/supabase/server";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    // 구글 로그인 성공 시 실행
    async signIn({ user }) {
      if (!user.email) return false;

      const supabase = await createClient();

      // 1. 기존 유저가 있는지 확인
      const { data: existingUser } = await supabase
        .from("User")
        .select("id")
        .eq("email", user.email)
        .single();

      // 2. 신규 유저라면 우리가 만든 SQL 테이블(User)에 삽입
      if (!existingUser) {
        const { error } = await supabase.from("User").insert({
          id: user.id, // Auth.js가 준 고유 ID
          name: user.name,
          email: user.email,
          image: user.image,
        });
        if (error) {
          console.error("DB 유저 생성 실패:", error);
          return false;
        }
      }
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};