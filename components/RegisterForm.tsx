"use client";

import React, { useActionState, useState, useEffect } from "react";
import { registerUser } from "@/lib/actions/register.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Comprehensive type definitions
interface FormData {
  name: string;
  email: string;
  password: string;
}

interface FormErrors {
  name?: string[];
  email?: string[];
  password?: string[];
}

interface ActionResult {
  success: boolean;
  message?: string;
  errors?: FormErrors;
  data?: FormData;
  pending?: boolean;
}

// Initial state with strong typing
const initialState: ActionResult = {
  success: false,
  message: "",
  errors: {},
  data: {
    name: "",
    email: "",
    password: "",
  },
  pending: false,
};

export default function SignupForm() {
  // Typed local state for form inputs
  const [localFormData, setLocalFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  // Typed action state with comprehensive error handling
  const [state, formAction] = useActionState<ActionResult, FormData>(
    async (prevState: ActionResult, formData: FormData) => {
      // Convert formData to FormData object for server action
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });

      // Call server action
      const result = await registerUser(formDataObj);

      // If validation fails, preserve current data
      if (result.errors) {
        return {
          ...result,
          data: formData,
        };
      }

      // On success, reset form data
      return result;
    },
    initialState
  );

  // Typed input change handler
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ) => {
    setLocalFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  // Handle form submission feedback
  useEffect(() => {
    if (state.success) {
      // Reset form on successful submission
      setLocalFormData({
        name: "",
        email: "",
        password: "",
      });
    }
  }, [state.success]);

  return (
    <form
      action={(formData) => {
        // Convert FormData to plain object for type safety
        const data: FormData = {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        };
        formAction(data);
      }}
      className="space-y-6 max-w-lg mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create an account to get started.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Name Field */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              value={localFormData.name}
              onChange={(e) => handleInputChange(e, "name")}
              aria-invalid={state.errors?.name ? "true" : "false"}
            />
            {state.errors?.name && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {state.errors.name[0]}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={localFormData.email}
              onChange={(e) => handleInputChange(e, "email")}
              aria-invalid={state.errors?.email ? "true" : "false"}
            />
            {state.errors?.email && (
              <p className="text-red-500 text-sm mt-1" role="alert">
                {state.errors.email[0]}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="********"
              value={localFormData.password}
              onChange={(e) => handleInputChange(e, "password")}
              aria-invalid={state.errors?.password ? "true" : "false"}
            />
            {state.errors?.password && (
              <div className="text-red-500 text-sm mt-1">
                <p>Password must:</p>
                <ul className="pl-4 list-disc">
                  {state.errors.password.map((error) => (
                    <li key={error}>{error}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Global Error Message */}
          {!state.success && state.message && (
            <div className="text-red-500 text-sm mt-2">{state.message}</div>
          )}
        </CardContent>

        <CardFooter>
          <SubmitButton pending={state.pending} />
        </CardFooter>
      </Card>
    </form>
  );
}

// Typed Submit Button Component
interface SubmitButtonProps {
  pending?: boolean;
}

function SubmitButton({ pending }: SubmitButtonProps) {
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Signing Up..." : "Sign Up"}
    </Button>
  );
}
