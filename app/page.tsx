import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
export default function LoginRegisterPage() {
  return (
    <div className="container mx-auto flex items-center flex-col justify-center min-h-screen py-4">
      <p className="font-bold text-foreground text-3xl mb-6">ALMS</p>
      <div className="flex items-end justify-center space-x-4 ">
        <Tabs defaultValue="login" className="sm:w-[400px]">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm />
          </TabsContent>

          <TabsContent value="register">
            <RegisterForm />
          </TabsContent>
          <TabsContent value="admin">
            <LoginForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
