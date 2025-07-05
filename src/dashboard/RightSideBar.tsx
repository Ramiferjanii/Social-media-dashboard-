import { TrendingUp, Users, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RightSidebar() {
  const trendingTopics = [
    { tag: "#TechNews", posts: "12.5K posts" },
    { tag: "#Photography", posts: "8.2K posts" },
    { tag: "#Travel", posts: "15.1K posts" },
    { tag: "#Fitness", posts: "6.8K posts" },
    { tag: "#Cooking", posts: "9.3K posts" },
  ]

  const suggestedUsers = [
    {
      name: "Alex Johnson",
      username: "@alexj",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualFriends: 5,
    },
    {
      name: "Lisa Park",
      username: "@lisapark",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualFriends: 12,
    },
    {
      name: "David Kim",
      username: "@davidkim",
      avatar: "/placeholder.svg?height=40&width=40",
      mutualFriends: 3,
    },
  ]

  const upcomingEvents = [
    {
      title: "Tech Meetup 2024",
      date: "Dec 25",
      attendees: 45,
    },
    {
      title: "Photography Workshop",
      date: "Dec 28",
      attendees: 23,
    },
  ]

  return (
    <div className="space-y-6">
      {/* Trending Topics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="h-5 w-5 mr-2" />
            Trending
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <div key={index} className="flex justify-between items-center hover:bg-gray-50 p-2 rounded cursor-pointer">
              <div>
                <p className="font-medium text-blue-600">{topic.tag}</p>
                <p className="text-sm text-gray-500">{topic.posts}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Suggested Users */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Users className="h-5 w-5 mr-2" />
            People You May Know
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {suggestedUsers.map((user, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-500">{user.mutualFriends} mutual friends</p>
                </div>
              </div>
              <Button size="sm" variant="outline">
                Follow
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Upcoming Events */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Calendar className="h-5 w-5 mr-2" />
            Upcoming Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
              <h4 className="font-medium">{event.title}</h4>
              <p className="text-sm text-gray-500">
                {event.date} • {event.attendees} attending
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
