import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Users, TrendingUp, Activity, Eye } from "lucide-react";
import { StatCard } from "@/components/StatCard";

const Adoption = () => {
  const userActivity = [
    {
      id: 1,
      name: "John Doe",
      email: "john@company.com",
      visits: 24,
      updates: 15,
      lastActive: "2025-10-03 15:30",
      engagement: "high",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@company.com",
      visits: 18,
      updates: 8,
      lastActive: "2025-10-03 14:20",
      engagement: "medium",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@company.com",
      visits: 32,
      updates: 22,
      lastActive: "2025-10-03 16:45",
      engagement: "high",
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice@company.com",
      visits: 5,
      updates: 2,
      lastActive: "2025-10-01 10:15",
      engagement: "low",
    },
  ];

  const weeklyData = [
    { week: "Week 1", visits: 120, updates: 45 },
    { week: "Week 2", visits: 180, updates: 68 },
    { week: "Week 3", visits: 245, updates: 92 },
    { week: "Week 4", visits: 310, updates: 125 },
  ];

  const engagementData = [
    { name: "High", value: 35, color: "hsl(var(--success))" },
    { name: "Medium", value: 45, color: "hsl(var(--warning))" },
    { name: "Low", value: 20, color: "hsl(var(--destructive))" },
  ];

  const activityTypeData = [
    { type: "Comments", count: 145 },
    { type: "Email Updates", count: 89 },
    { type: "Approvals", count: 67 },
    { type: "Rejections", count: 23 },
  ];

  const totalUsers = userActivity.length;
  const totalVisits = userActivity.reduce((acc, user) => acc + user.visits, 0);
  const totalUpdates = userActivity.reduce((acc, user) => acc + user.updates, 0);
  const avgEngagement = (
    (userActivity.filter((u) => u.engagement === "high").length / totalUsers) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Adoption Overview</h2>
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            title="Total Users"
            value={totalUsers}
            icon={Users}
            variant="default"
          />
          <StatCard
            title="Total Visits"
            value={totalVisits}
            icon={Eye}
            variant="success"
          />
          <StatCard
            title="Total Updates"
            value={totalUpdates}
            icon={Activity}
            variant="warning"
          />
          <StatCard
            title="High Engagement"
            value={`${avgEngagement}%`}
            icon={TrendingUp}
            variant="success"
          />
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="visits"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                />
                <Line
                  type="monotone"
                  dataKey="updates"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Engagement Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={engagementData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {engagementData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Activity Type Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={activityTypeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Contributors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userActivity
                .sort((a, b) => b.updates - a.updates)
                .slice(0, 5)
                .map((user, index) => (
                  <div key={user.id} className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.updates} updates
                      </p>
                    </div>
                    <Badge
                      variant={
                        user.engagement === "high"
                          ? "default"
                          : user.engagement === "medium"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {user.engagement}
                    </Badge>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed User Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed User Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Visits</TableHead>
                <TableHead className="text-right">Updates</TableHead>
                <TableHead>Last Active</TableHead>
                <TableHead>Engagement</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {userActivity.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-right">{user.visits}</TableCell>
                  <TableCell className="text-right">{user.updates}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {user.lastActive}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        user.engagement === "high"
                          ? "default"
                          : user.engagement === "medium"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {user.engagement}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default Adoption;
