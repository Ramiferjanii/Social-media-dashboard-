"use client"
import { useState, useEffect } from 'react';
import { CreatePost } from "./CreatePost";
import { PostCard } from "./PostCard";
import { useAuth } from '../dashboard/auth-context';

export function Feed() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { token, isAuthenticated } = useAuth();

  const fetchPosts = async () => {
    if (!isAuthenticated || !token) {
      setLoading(false);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/posts', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 401) {
        console.error('Authentication failed. Please log in again.');
        return;
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch posts');
      }
      
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [isAuthenticated, token]);

  const handleNewPost = (newPost: any) => {
    setPosts([newPost, ...posts]);
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-8">
        <p className="text-lg">Please log in to view the feed</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="text-center py-8">
        <p>Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CreatePost onNewPost={handleNewPost} />
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        ) : (
          <div className="text-center py-8">
            <p>No posts found. Be the first to post!</p>
          </div>
        )}
      </div>
    </div>
  );
}