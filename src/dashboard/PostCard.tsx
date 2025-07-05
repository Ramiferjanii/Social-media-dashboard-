"use client"

import { useState } from "react"
import { Heart, MessageCircle, Share, MoreHorizontal, Bookmark } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Post {
  _id: string;
  author: {
    _id: string;
    name: string;
    username: string;
    avatar: string;
  };
  content: string;
  image?: string;
  createdAt: string;
  likesCount: number;
  commentsCount: number;
  shares?: number;
  liked: boolean;
}

interface PostCardProps {
  post: Post;
  onLikeUpdate: (postId: string, likesCount: number, liked: boolean) => void;
}

export function PostCard({ post, onLikeUpdate }: PostCardProps) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(post.likesCount);
  const [isLiking, setIsLiking] = useState(false);

  const handleLike = async () => {
    if (isLiking) return;
    
    setIsLiking(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/posts/${post._id}/like`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to like post');
      
      const { likesCount, liked: newLikedStatus } = await response.json();
      setLikes(likesCount);
      setLiked(newLikedStatus);
      onLikeUpdate(post._id, likesCount, newLikedStatus);
    } catch (error) {
      console.error('Error liking post:', error);
    } finally {
      setIsLiking(false);
    }
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.abs(now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < 1) {
      return `${Math.floor(diffHours * 60)} minutes ago`;
    } else if (diffHours < 24) {
      return `${Math.floor(diffHours)} hours ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <Card>
      <CardContent className="p-4">
        {/* Post Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
              <AvatarFallback>
                {post.author.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{post.author.name}</h3>
              <p className="text-sm text-gray-500">
                {post.author.username} • {formatTime(post.createdAt)}
              </p>
            </div>
          </div>
          {/* ... dropdown menu ... */}
        </div>

        {/* Post Content */}
        <div className="mb-4">
          <p className="text-gray-900 leading-relaxed">{post.content}</p>
          {post.image && (
            <div className="mt-3 rounded-lg overflow-hidden">
              <img 
                src={post.image} 
                alt="Post content" 
                className="w-full h-auto object-cover"
              />
            </div>
          )}
        </div>

        {/* Post Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center space-x-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={isLiking}
              className={`${liked ? "text-red-500 hover:text-red-600" : "text-gray-500 hover:text-red-500"}`}
            >
              <Heart className={`h-5 w-5 mr-2 ${liked ? "fill-current" : ""}`} />
              {likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-blue-500">
              <MessageCircle className="h-5 w-5 mr-2" />
              {post.commentsCount}
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-green-500">
              <Share className="h-5 w-5 mr-2" />
              {post.shares || 0}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}