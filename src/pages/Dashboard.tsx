import { useState } from "react";
import { StatCard } from "@/components/StatCard";
import {
  CheckCircle2,
  XCircle,
  Clock,
  Mail,
  MailX,
  FileText,
  Database,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const [selectedEmailStatus, setSelectedEmailStatus] = useState<string | null>(null);
  const [selectedRETLStatus, setSelectedRETLStatus] = useState<string | null>(null);

  // Mock data
  const recordsData = {
    total: 1247,
    pass: 1089,
    fail: 132,
    pending: 26,
    passRate: 87.3,
  };

  const emailStats = {
    sent: 342,
    failed: 18,
    draft: 7,
  };

  const retlStats = {
    source: 3,
    completed: 245,
    failed: 12,
    pending: 8,
  };

  const emailActivity = [
    {
      id: 1,
      timestamp: "2025-10-03 14:32",
      from: "system@datasync.com",
      recipient: "admin@company.com",
      subject: "Validation Failed - SFDC Data Mismatch",
      status: "sent",
    },
    {
      id: 2,
      timestamp: "2025-10-03 13:15",
      from: "system@datasync.com",
      recipient: "data@company.com",
      subject: "Weekly Summary Report",
      status: "failed",
    },
  ];

  const retlErrors = [
    {
      id: 1,
      source: "SFDC",
      timestamp: "2025-10-03 12:45",
      error: "Connection timeout",
      resolution: "Retry connection with increased timeout",
    },
    {
      id: 2,
      source: "NetSuite",
      timestamp: "2025-10-03 11:30",
      error: "Incomplete data file",
      resolution: "Contact data provider for complete file",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Records Overview */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Records Assessment</h2>
          <Input type="date" className="w-48" />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <StatCard
            title="Total Records"
            value={recordsData.total.toLocaleString()}
            icon={Database}
            variant="default"
            subtitle={`${recordsData.passRate}% pass rate`}
          />
          <StatCard
            title="Pass"
            value={recordsData.pass.toLocaleString()}
            icon={CheckCircle2}
            variant="success"
          />
          <StatCard
            title="Fail"
            value={recordsData.fail.toLocaleString()}
            icon={XCircle}
            variant="danger"
          />
          <StatCard
            title="Pending"
            value={recordsData.pending.toLocaleString()}
            icon={Clock}
            variant="warning"
          />
        </div>
      </div>

      {/* Email Statistics */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Email Statistics</h2>
        <div className="grid gap-4 md:grid-cols-3 mb-6">
          <StatCard
            title="Sent"
            value={emailStats.sent}
            icon={Mail}
            variant="success"
            onClick={() =>
              setSelectedEmailStatus(
                selectedEmailStatus === "sent" ? null : "sent"
              )
            }
            isActive={selectedEmailStatus === "sent"}
          />
          <StatCard
            title="Failed"
            value={emailStats.failed}
            icon={MailX}
            variant="danger"
            onClick={() =>
              setSelectedEmailStatus(
                selectedEmailStatus === "failed" ? null : "failed"
              )
            }
            isActive={selectedEmailStatus === "failed"}
          />
          <StatCard
            title="Draft"
            value={emailStats.draft}
            icon={FileText}
            variant="warning"
            onClick={() =>
              setSelectedEmailStatus(
                selectedEmailStatus === "draft" ? null : "draft"
              )
            }
            isActive={selectedEmailStatus === "draft"}
          />
        </div>

        {selectedEmailStatus && (
          <Card className="animate-in slide-in-from-top-4">
            <CardHeader>
              <CardTitle>Email Activity - {selectedEmailStatus}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>From</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emailActivity
                    .filter((email) => email.status === selectedEmailStatus)
                    .map((email) => (
                      <TableRow key={email.id}>
                        <TableCell className="font-mono text-sm">
                          {email.timestamp}
                        </TableCell>
                        <TableCell>{email.from}</TableCell>
                        <TableCell>{email.recipient}</TableCell>
                        <TableCell>{email.subject}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              email.status === "sent"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {email.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      {/* rETL Statistics */}
      <div>
        <h2 className="text-2xl font-bold mb-6">rETL Statistics</h2>
        <div className="grid gap-4 md:grid-cols-4 mb-6">
          <StatCard
            title="Sources"
            value={retlStats.source}
            icon={Database}
            variant="default"
          />
          <StatCard
            title="Completed"
            value={retlStats.completed}
            icon={CheckCircle2}
            variant="success"
          />
          <StatCard
            title="Failed"
            value={retlStats.failed}
            icon={AlertCircle}
            variant="danger"
            onClick={() =>
              setSelectedRETLStatus(
                selectedRETLStatus === "failed" ? null : "failed"
              )
            }
            isActive={selectedRETLStatus === "failed"}
          />
          <StatCard
            title="Pending"
            value={retlStats.pending}
            icon={Clock}
            variant="warning"
          />
        </div>

        {selectedRETLStatus === "failed" && (
          <Card className="animate-in slide-in-from-top-4">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Error Details - Failed Jobs</CardTitle>
                <Button variant="outline" size="sm">
                  Download Logs
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Source</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Error</TableHead>
                    <TableHead>Resolution</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {retlErrors.map((error) => (
                    <TableRow key={error.id}>
                      <TableCell>
                        <Badge variant="outline">{error.source}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {error.timestamp}
                      </TableCell>
                      <TableCell className="text-destructive">
                        {error.error}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {error.resolution}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
