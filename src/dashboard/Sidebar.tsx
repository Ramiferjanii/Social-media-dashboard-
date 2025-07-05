import { Home, Users, Bookmark, Settings, TrendingUp, Calendar, Hash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Sidebar() {
  const menuItems = [
    { icon: Home, label: "Home", active: true },
    { icon: Users, label: "Friends", count: 12 },
    { icon: Hash, label: "Explore" },
    { icon: TrendingUp, label: "Trending" },
    { icon: Bookmark, label: "Saved Posts" },
    { icon: Calendar, label: "Events" },
    { icon: Settings, label: "Settings" },
  ]

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/placeholder.svg?height=48&width=48" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">John Doe</h3>
              <p className="text-sm text-gray-500">@johndoe</p>
            </div>
          </div>
          <div className="flex justify-between mt-4 text-sm">
            <div className="text-center">
              <div className="font-semibold">1.2K</div>
              <div className="text-gray-500">Following</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">3.4K</div>
              <div className="text-gray-500">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-semibold">156</div>
              <div className="text-gray-500">Posts</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Navigation Menu */}
      <Card>
        <CardContent className="p-2">
          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <Button key={index} variant={item.active ? "secondary" : "ghost"} className="w-full justify-start">
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
                {item.count && (
                  <span className="ml-auto bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">{item.count}</span>
                )}
              </Button>
            ))}
          </nav>
        </CardContent>
      </Card>
    </div>
  )
}
