"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs } from "./ui/tabs";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { ComboBoxSelector } from "./ComboBoxSelector";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import useMyStore from "@/stores/zustand";
const StudentForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [department, setdepartment] = useState("");
  const [enrollmentnumber, setenrollmentnumber] = useState("");
  const [branch, setbranch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const role = useMyStore((newrole) => newrole.role);
    const handleUserCreation = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      try {
        const resp = await fetch("/api/create-user", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      name,
      role,
      department,
      branch,
      enrollmentnumber
    }),
  });
  
  
        const result = await resp.json();
  
        if (!resp.ok) {
          throw new Error(result.error);
        }
  
        toast.success("Account Created Successfully");
        setIsLoading(false);
        setEmail("");
        setName("");
        setPassword("");
        setbranch("");
        setdepartment("");
        setenrollmentnumber("");
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        toast.error(error.message);
      }
    };

  return (
    <div>
      <Card className="">
        <CardHeader>
          <CardTitle>Student Account</CardTitle>
          <CardDescription>Create Student Account</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUserCreation}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="rollnum">Enrollment Number</FieldLabel>
                <Input
                  id="rollnum"
                  type="text"
                  placeholder="0901ABCDE"
                  value={enrollmentnumber}
                  onChange={(e) => setenrollmentnumber(e.target.value)}
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>
              <div className="flex items-center gap-x-3">
                <Field>
                  <FieldLabel htmlFor="department">Department</FieldLabel>
                  <ComboBoxSelector
                    id="department"
                    context={"department"}
                    stateCapture={setdepartment}
                  />
                </Field>
                <Field>
                  <FieldLabel htmlFor="branch">Branch</FieldLabel>
                  <ComboBoxSelector
                    id="branch"
                    context={"branch"}
                    stateCapture={setbranch}
                  />
                </Field>
              </div>
              <Field>
                <Button
                  type="submit"
                  className="w-full cursor-pointer font-bold"
                  disabled={isLoading}
                >
                  {isLoading ? "Authenticating..." : "Create Account"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
        {/* <CardFooter>
    <Button>Create Teacher</Button>
  </CardFooter> */}
      </Card>
    </div>
  );
};

export default StudentForm;
