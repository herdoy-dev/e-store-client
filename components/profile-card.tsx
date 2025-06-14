import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";

interface ProfileCardProps {
  user: {
    _id: string;
    name: string;
    handle: string;
    avatar: string;
    bio: string;
    followers: number;
    following: number;
    posts: number;
  };
}

export function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-2xl shadow-lg transition-all hover:shadow-xl">
      <div className="relative h-24 bg-gradient-to-r from-primary/60 to-destructive/10">
        <Avatar className="absolute -bottom-12 left-1/2 h-24 w-24 -translate-x-1/2 border-4 border-white">
          <AvatarImage src={user.avatar} alt={`${user.name}'s avatar`} />
          <AvatarFallback className="bg-white text-indigo-600">
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="mt-14 mb-6 space-y-4 px-6 text-center">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-500">@{user.handle}</p>
        </div>
        <p className="text-sm text-gray-600">{user.bio}</p>
      </div>

      {/* Stats */}
      <CardFooter className="border-t px-6 py-4">
        <div className="flex w-full items-center justify-between">
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">{user.posts}</p>
            <p className="text-xs text-gray-500">Posts</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">{user.followers}</p>
            <p className="text-xs text-gray-500">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-gray-900">{user.following}</p>
            <p className="text-xs text-gray-500">Following</p>
          </div>
        </div>
      </CardFooter>

      {/* Action Button */}
      <div className="px-6 pb-6">
        <Button className="w-full font-medium text-white">Follow</Button>
      </div>
    </div>
  );
}
