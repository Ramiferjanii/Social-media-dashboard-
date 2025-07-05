"use client"
import { useState, useRef } from "react"
import { ImageIcon, Video, Smile, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAuth } from '../dashboard/auth-context';

// Define API base URL using environment variable
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export function CreatePost({ onNewPost }: { onNewPost: (post: any) => void }) {
  const [content, setContent] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [isPosting, setIsPosting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { token, user } = useAuth()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!token || !user) {
      console.error('Not authenticated');
      return;
    }
    
    if (!content.trim()) return;
    
    setIsPosting(true);
    const formData = new FormData();
    formData.append('content', content);
    if (image) formData.append('image', image);
    
    try {
      // Use API_BASE in the fetch URL
      const response = await fetch(`${API_BASE}/api/posts`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
      
      if (response.status === 401) {
        console.error('Authentication failed. Please log in again.');
        return;
      }
      
      if (!response.ok) {
        // Try to get error message from response
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || 'Failed to create post';
        throw new Error(errorMessage);
      }
      
      const newPost = await response.json();
      onNewPost(newPost);
      setContent('');
      setImage(null);
    } catch (error) {
      console.error('Error creating post:', error);
    } finally {
      setIsPosting(false);
    }
  }

  if (!user) return null;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex space-x-4">
          <Avatar className="h-10 w-10">
            <AvatarImage 
              src={user.avatar || "/placeholder.svg?height=40&width=40"} 
              alt="Your avatar" 
            />
            <AvatarFallback>
              {user.name?.split(' ').map(n => n[0]).join('') || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's on your mind?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] border-0 resize-none focus:ring-0 text-lg placeholder:text-gray-500"
            />
            {image && (
              <div className="mt-2 relative">
                <img 
                  src={URL.createObjectURL(image)} 
                  alt="Preview" 
                  className="max-h-40 rounded-md"
                />
                <button
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                  onClick={() => setImage(null)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}
            <div className="flex items-center justify-between mt-4">
              <div className="flex space-x-4">
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-blue-600 hover:bg-blue-50"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <ImageIcon className="h-5 w-5 mr-2" />
                  Photo
                </Button>
                <Button variant="ghost" size="sm" className="text-green-600 hover:bg-green-50">
                  <Video className="h-5 w-5 mr-2" />
                  Video
                </Button>
                <Button variant="ghost" size="sm" className="text-yellow-600 hover:bg-yellow-50">
                  <Smile className="h-5 w-5 mr-2" />
                  Feeling
                </Button>
                <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50">
                  <MapPin className="h-5 w-5 mr-2" />
                  Location
                </Button>
              </div>
              <Button 
                disabled={!content.trim() || isPosting} 
                className="bg-blue-600 hover:bg-blue-700"
                onClick={handleSubmit}
              >
                {isPosting ? 'Posting...' : 'Post'}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}