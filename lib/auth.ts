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
        .from("users")
        .select("id")
        .eq("email", user.email)
        .single();

      // 2. 신규 유저
      if (!existingUser) {
        const { error } = await supabase.from("users").insert({
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
    
    async jwt({ token, user, trigger, session }) {
      // 1. 처음 로그인할 때 DB에서 최신 정보를 가져와 토큰에 저장
      if (user) {
        token.id = user.id;
        token.email = user.email;
        
        const supabase = await createClient();
        const { data: dbUser } = await supabase
          .from("users")
          .select("name, image")
          .eq("id", user.id)
          .single();

        if (dbUser) {
          token.name = dbUser.name;
          token.image = dbUser.image;
        }
      }

      if (trigger === "update" && session?.name) {
        token.name = session.name;
      }

      if (trigger === "update" && "image" in session) { 
        token.image = session.image;
      }

      return token;
    },

    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.image as string;
      }
      return session;
    },
  },
};