"use client";

import React, { Suspense, useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { UploadButton } from "@/lib/uploadthing";
import { updateUserProfile } from "@/lib/actions/update-user-profile.action";
import { useToast } from "@/hooks/use-toast";

interface UserDetails {
  name: string;
  email: string;
  profilePicture?: string;
}

interface ProfileInfoProps {
  userDetails: UserDetails;
  userId: string;
}

const ProfileInfo: React.FC<ProfileInfoProps> = ({ userDetails, userId }) => {
  // Local state for user details
  const [localDetails, setLocalDetails] = useState<UserDetails>(userDetails);
  const [name, setName] = useState<string>(localDetails.name);
  const [profilePicture, setProfilePicture] = useState<string>(
    localDetails.profilePicture || ""
  );
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false); // State to handle modal visibility
  const { toast } = useToast();

  // Submit handler to update user details
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await updateUserProfile(userId, { name, profilePicture });
    if (response.success) {
      // Update local details on success
      setLocalDetails({ ...localDetails, name, profilePicture });
      setIsDialogOpen(false); // Close the modal
      toast({
        variant: "default",
        title: "Success",
        description: "Profile updated successfully",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile",
      });
    }
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Your personal information</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={localDetails.profilePicture}
            alt="Profile picture"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">{localDetails.name}</h3>
          <p className="text-sm text-muted-foreground">{localDetails.email}</p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="mt-2">
                Update Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Update Profile</DialogTitle>
                <DialogDescription>
                  Update your name and profile picture
                </DialogDescription>
              </DialogHeader>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profilePicture">Profile Picture</Label>
                  <UploadButton
                    className="ut-button:bg-primary ut-button:w-full"
                    endpoint="imageUploader"
                    onClientUploadComplete={(files) => {
                      if (files.length > 0) {
                        setProfilePicture(files[0].url);
                        toast({
                          variant: "default",
                          title: "Image Uploaded",
                          description: "Profile picture updated successfully",
                        });
                      }
                    }}
                    onUploadError={(err) => {
                      toast({
                        variant: "destructive",
                        title: "Upload Error",
                        description: `Error: ${err.message}`,
                      });
                    }}
                  />
                </div>
                <DialogFooter className="sm:justify-start">
                  <Button className="bg-secondary" type="submit">
                    Save changes
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProfileInfo;
