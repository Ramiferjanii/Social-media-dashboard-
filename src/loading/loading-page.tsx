"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useEffect, useState } from "react"

export default function LoadingPage() {
  const [loadingText, setLoadingText] = useState("Loading")
  const [dots, setDots] = useState("")

  const loadingMessages = ["Loading" , "Almost ready"]

  useEffect(() => {
    // Animated dots
    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 400)

    // Rotating messages
    const messageInterval = setInterval(() => {
      setLoadingText((prev) => {
        const currentIndex = loadingMessages.indexOf(prev)
        return loadingMessages[(currentIndex + 1) % loadingMessages.length]
      })
    }, 2000)

    return () => {
      clearInterval(dotsInterval)
      clearInterval(messageInterval)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: -200px 0; }
          100% { background-position: calc(200px + 100%) 0; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6); }
        }
        
        @keyframes slide-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes wave {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .shimmer {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200px 100%;
          animation: shimmer 1.5s infinite;
        }
        
        .dark .shimmer {
          background: linear-gradient(90deg, #374151 25%, #4b5563 50%, #374151 75%);
          background-size: 200px 100%;
        }
        
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        
        .pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        
        .slide-in {
          animation: slide-in 0.6s ease-out forwards;
        }
        
        .wave-effect {
          position: relative;
          overflow: hidden;
        }
        
        .wave-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          animation: wave 2s infinite;
        }
        
        .stagger-1 { animation-delay: 0.1s; }
        .stagger-2 { animation-delay: 0.2s; }
        .stagger-3 { animation-delay: 0.3s; }
        .stagger-4 { animation-delay: 0.4s; }
        .stagger-5 { animation-delay: 0.5s; }
      `}</style>

      {/* Animated Header Skeleton */}
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 slide-in">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-full shimmer pulse-glow" />
            <Skeleton className="h-6 w-32 shimmer wave-effect" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton className="h-8 w-8 rounded-full shimmer stagger-1" />
            <Skeleton className="h-8 w-8 rounded-full shimmer stagger-2" />
            <Skeleton className="h-8 w-8 rounded-full shimmer stagger-3" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Animated Sidebar Skeleton */}
          <div className="hidden lg:block slide-in stagger-1">
            <Card className="wave-effect">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Skeleton className="h-12 w-12 rounded-full shimmer pulse-glow" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24 shimmer" />
                    <Skeleton className="h-3 w-16 shimmer" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full shimmer wave-effect" />
                  <Skeleton className="h-4 w-3/4 shimmer wave-effect" />
                </div>
                <div className="space-y-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className={`flex items-center gap-3 slide-in stagger-${i + 1}`}>
                      <Skeleton className="h-6 w-6 rounded shimmer" />
                      <Skeleton className="h-4 w-20 shimmer" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Animated Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Animated Create Post Skeleton */}
            <Card className="slide-in stagger-2 wave-effect">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-4">
                  <Skeleton className="h-10 w-10 rounded-full shimmer pulse-glow" />
                  <Skeleton className="h-10 flex-1 rounded-full shimmer wave-effect" />
                </div>
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <Skeleton className="h-8 w-16 shimmer stagger-1" />
                    <Skeleton className="h-8 w-16 shimmer stagger-2" />
                    <Skeleton className="h-8 w-16 shimmer stagger-3" />
                  </div>
                  <Skeleton className="h-8 w-20 shimmer pulse-glow" />
                </div>
              </CardContent>
            </Card>

            {/* Animated Posts Skeleton */}
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className={`slide-in stagger-${i + 3} wave-effect`}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-10 rounded-full shimmer pulse-glow float-animation" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-32 shimmer wave-effect" />
                      <Skeleton className="h-3 w-20 shimmer" />
                    </div>
                    <Skeleton className="h-6 w-6 rounded ml-auto shimmer" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-full shimmer wave-effect" />
                    <Skeleton className="h-4 w-4/5 shimmer wave-effect" />
                    <Skeleton className="h-4 w-3/5 shimmer wave-effect" />
                  </div>

                  <Skeleton className="h-64 w-full rounded-lg shimmer wave-effect" />

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex gap-6">
                      {Array.from({ length: 3 }).map((_, j) => (
                        <div key={j} className={`flex items-center gap-2 slide-in stagger-${j + 1}`}>
                          <Skeleton className="h-5 w-5 shimmer" />
                          <Skeleton className="h-4 w-8 shimmer" />
                        </div>
                      ))}
                    </div>
                    <Skeleton className="h-5 w-5 shimmer float-animation" />
                  </div>

                  <div className="space-y-3 pt-2">
                    <Skeleton className="h-3 w-24 shimmer" />
                    <div className="flex gap-3">
                      <Skeleton className="h-8 w-8 rounded-full shimmer pulse-glow" />
                      <div className="space-y-1 flex-1">
                        <Skeleton className="h-3 w-20 shimmer" />
                        <Skeleton className="h-3 w-full shimmer wave-effect" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Animated Right Sidebar */}
          <div className="hidden lg:block space-y-6">
            <Card className="slide-in stagger-4 wave-effect">
              <CardHeader>
                <Skeleton className="h-5 w-32 shimmer wave-effect" />
              </CardHeader>
              <CardContent className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className={`flex items-center gap-3 slide-in stagger-${i + 1}`}>
                    <Skeleton className="h-10 w-10 rounded-full shimmer pulse-glow float-animation" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-24 shimmer wave-effect" />
                      <Skeleton className="h-3 w-16 shimmer" />
                    </div>
                    <Skeleton className="h-8 w-16 rounded-full shimmer pulse-glow" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="slide-in stagger-5 wave-effect">
              <CardHeader>
                <Skeleton className="h-5 w-28 shimmer wave-effect" />
              </CardHeader>
              <CardContent className="space-y-3">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className={`flex items-start gap-3 slide-in stagger-${i + 1}`}>
                    <Skeleton className="h-8 w-8 rounded-full shimmer pulse-glow" />
                    <div className="space-y-1 flex-1">
                      <Skeleton className="h-3 w-full shimmer wave-effect" />
                      <Skeleton className="h-3 w-2/3 shimmer wave-effect" />
                      <Skeleton className="h-2 w-12 shimmer" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Enhanced Loading Overlay */}
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="h-20 w-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin mx-auto pulse-glow"></div>
            <div
              className="absolute inset-0 h-20 w-20 rounded-full border-4 border-transparent border-r-primary/40 animate-spin mx-auto"
              style={{ animationDirection: "reverse", animationDuration: "3s" }}
            ></div>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent float-animation">
              {loadingText}
              {dots}
            </h2>
            <p className="text-muted-foreground animate-pulse">Getting the latest updates...</p>

            {/* Progress dots */}
            <div className="flex justify-center gap-2 mt-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full bg-primary/60 animate-pulse stagger-${i + 1}`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
