"use client";

import React, { useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { deleteUserServerAction } from "@/lib/actions/user-details.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface User {
  id: string;
  name: string;
  email: string;
  presentCount: number;
  absentCount: number;
  leaveCount: number;
}

interface UserDetailsProps {
  ALL_USERS_ATTENDANCE_DATA: User[];
}

const UserDetails: React.FC<UserDetailsProps> = ({
  ALL_USERS_ATTENDANCE_DATA,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [users, setUsers] = useState<User[]>(ALL_USERS_ATTENDANCE_DATA);
  const { toast } = useToast();

  const handleDelete = async (userId: string) => {
    try {
      const result = await deleteUserServerAction(userId);

      if (result.success) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
        toast({
          title: "Success",
          description: result.message,
          variant: "default",
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error: unknown) {
      toast({
        title: "Error",
        description: (error as Error).message || "Failed to delete user.",
        variant: "destructive",
      });
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <CardContent>
      <Input
        placeholder="Search users..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Present Count</TableHead>
            <TableHead>Absent Count</TableHead>
            <TableHead>Leave Count</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-left">
          {filteredUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.presentCount}</TableCell>
              <TableCell>{user.absentCount}</TableCell>
              <TableCell>{user.leaveCount}</TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete this user and remove all associated data.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-red-900 hover:bg-red-900/50 text-foreground"
                        onClick={() => {
                          handleDelete(user.id);
                          console.log(user);
                        }}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  );
};

export default UserDetails;
