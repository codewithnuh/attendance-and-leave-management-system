/**
 * LoginForm Component
 *
 * A React component that renders a login form with email and password fields.
 * Handles form submission, validation, and displays error messages.
 * Uses server actions for authentication.
 */

"use client";

import React, { useState, useEffect, useActionState } from "react";
import { loginUser } from "@/lib/actions/login.action"; // Server action
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

/**
 * Interface representing the form data structure
 */
interface FormData {
  email: string;
  password: string;
}

/**
 * Interface for form validation errors
 */
interface FormErrors {
  email?: string[];
  password?: string[];
}

/**
 * Interface for the action result returned from form submission
 */
interface ActionResult {
  success: boolean;
  message?: string;
  errors?: FormErrors;
  data?: FormData;
  pending?: boolean;
}

/**
 * Initial state for the form action
 */
const initialState: ActionResult = {
  success: false,
  message: "",
  errors: {},
  data: { email: "", password: "" },
  pending: false,
};

/**
 * LoginForm Component
 * @returns React component that renders a login form
 */
export default function LoginForm() {
  // Local state for form data
  const [localFormData, setLocalFormData] = useState<FormData>({
    email: "",
    password: "",
  });

  /**
   * Server action state handler for form submission
   */
  const [state, formAction] = useActionState<ActionResult, FormData>(
    async (prevState, formData) => {
      const formDataObj = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataObj.append(key, value);
      });

      const result = await loginUser(formDataObj);

      if (result.error) {
        return { ...result, data: formData };
      }

      return result;
    },
    initialState
  );

  /**
   * Handles input field changes
   * @param e Change event from input field
   * @param field Name of the form field being changed
   */
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof FormData
  ) => {
    setLocalFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  /**
   * Reset form on successful submission
   */
  useEffect(() => {
    if (state.success) {
      setLocalFormData({
        email: "",
        password: "",
      });
    }
  }, [state.success]);

  return (
    <form
      action={(formData) => {
        const data: FormData = {
          email: formData.get("email") as string,
          password: formData.get("password") as string,
        };
        formAction(data);
      }}
      className="space-y-6 max-w-lg mx-auto"
    >
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your credentials to log in.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
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
              <div className="text-red-500 text-sm mt-1">
                {state.errors.email.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
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
                {state.errors.password.map((error, index) => (
                  <p key={index}>{error}</p>
                ))}
              </div>
            )}
          </div>

          {/* Global Error or Success Message */}
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

/**
 * Props interface for SubmitButton component
 */
interface SubmitButtonProps {
  pending?: boolean;
}

/**
 * SubmitButton Component
 * Renders a submit button that shows loading state
 * @param pending Boolean indicating if form submission is in progress
 */
function SubmitButton({ pending }: SubmitButtonProps) {
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Logging In..." : "Log In"}
    </Button>
  );
}
