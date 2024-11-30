import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/LoginForm";
import Link from "next/link";
import RegisterForm from "@/components/RegisterForm";
export default function LoginRegisterPage() {
  return (
    <div className="container mx-auto flex items-center justify-center min-h-screen">
      <div className="flex items-end justify-center space-x-4">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
        </Tabs>
        <Link href="/admin">Admin</Link>
      </div>
    </div>
  );
}
