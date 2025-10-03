import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCircle2, XCircle, MessageSquare, Mail, Play } from "lucide-react";
import { toast } from "sonner";

interface ValidationRow {
  id: string;
  parameter: string;
  sfdc: number;
  ns: number;
  zscm: number;
  sf: number;
  status: "pass" | "fail";
  comment?: string;
  retlRequired: boolean;
  retlSourceOption?: string;
  adminApproval?: "approved" | "rejected" | null;
}

const Compare = () => {
  const [validationData, setValidationData] = useState<ValidationRow[]>([
    {
      id: "1",
      parameter: "Total Revenue",
      sfdc: 1250000,
      ns: 1248500,
      zscm: 1250000,
      sf: 1249500,
      status: "pass",
      retlRequired: false,
    },
    {
      id: "2",
      parameter: "Active Customers",
      sfdc: 450,
      ns: 452,
      zscm: 450,
      sf: 450,
      status: "fail",
      retlRequired: true,
    },
    {
      id: "3",
      parameter: "Monthly Orders",
      sfdc: 3420,
      ns: 3420,
      zscm: 3425,
      sf: 3421,
      status: "pass",
      retlRequired: false,
    },
  ]);

  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [retlEnabled, setRetlEnabled] = useState(false);
  const [retlSource, setRetlSource] = useState<string>("");

  const handleCommentSubmit = (rowId: string) => {
    if (comment.split(" ").length < 10) {
      toast.error("Comment must be at least 10 words");
      return;
    }
    setValidationData((prev) =>
      prev.map((row) =>
        row.id === rowId ? { ...row, comment } : row
      )
    );
    setComment("");
    setSelectedRow(null);
    toast.success("Comment added successfully");
  };

  const handleApproval = (rowId: string, status: "approved" | "rejected") => {
    setValidationData((prev) =>
      prev.map((row) =>
        row.id === rowId ? { ...row, adminApproval: status } : row
      )
    );
    toast.success(`Row ${status}`);
  };

  const handleSendEmail = (rowId: string) => {
    if (!emailBody.trim()) {
      toast.error("Email body cannot be empty");
      return;
    }
    toast.success("Email sent successfully");
    setEmailBody("");
  };

  const handleRetlExecution = () => {
    if (!retlSource) {
      toast.error("Please select a source");
      return;
    }
    toast.success(`rETL execution started for ${retlSource}`);
  };

  const stats = {
    total: validationData.length,
    pass: validationData.filter((r) => r.status === "pass").length,
    fail: validationData.filter((r) => r.status === "fail").length,
    passRate: (
      (validationData.filter((r) => r.status === "pass").length /
        validationData.length) *
      100
    ).toFixed(1),
  };

  return (
    <div className="space-y-8">
      {/* Summary Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-sm text-muted-foreground">Total Validations</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-success">{stats.pass}</div>
            <p className="text-sm text-muted-foreground">Pass</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-destructive">
              {stats.fail}
            </div>
            <p className="text-sm text-muted-foreground">Fail</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold">{stats.passRate}%</div>
            <p className="text-sm text-muted-foreground">Pass Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* rETL Controls */}
      <Card>
        <CardHeader>
          <CardTitle>rETL Execution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="retl-enabled"
                checked={retlEnabled}
                onCheckedChange={setRetlEnabled}
              />
              <Label htmlFor="retl-enabled">Enable rETL</Label>
            </div>
            {retlEnabled && (
              <>
                <Select value={retlSource} onValueChange={setRetlSource}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SFDC">Salesforce</SelectItem>
                    <SelectItem value="NS">NetSuite</SelectItem>
                    <SelectItem value="ZSCM">ZSCM</SelectItem>
                  </SelectContent>
                </Select>
                <Button onClick={handleRetlExecution}>
                  <Play className="h-4 w-4 mr-2" />
                  Execute
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Validation Results */}
      <Card>
        <CardHeader>
          <CardTitle>Comparative Analysis & Validation</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Parameter</TableHead>
                <TableHead className="text-right">SFDC</TableHead>
                <TableHead className="text-right">NetSuite</TableHead>
                <TableHead className="text-right">ZSCM</TableHead>
                <TableHead className="text-right">SF Calc</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Comment</TableHead>
                <TableHead>rETL Req?</TableHead>
                <TableHead>rETL Source?</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Admin Review</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {validationData.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium">{row.parameter}</TableCell>
                  <TableCell className="text-right">
                    {row.sfdc.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {row.ns.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {row.zscm.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Input
                      type="number"
                      defaultValue={row.sf}
                      className="w-32 text-right"
                      onChange={(e) => {
                        const newValue = parseFloat(e.target.value);
                        setValidationData((prev) =>
                          prev.map((r) =>
                            r.id === row.id ? { ...r, sf: newValue } : r
                          )
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={row.status === "pass" ? "default" : "destructive"}
                    >
                      {row.status === "pass" ? (
                        <CheckCircle2 className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedRow(row.id)}
                        >
                          <MessageSquare className="h-4 w-4" />
                          {row.comment && (
                            <span className="ml-1 text-xs">✓</span>
                          )}
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Comment - {row.parameter}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <Textarea
                            placeholder="Enter comment (minimum 10 words)..."
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={4}
                          />
                          <Button onClick={() => handleCommentSubmit(row.id)}>
                            Submit Comment
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={row.retlRequired}
                      onCheckedChange={(checked) => {
                        setValidationData((prev) =>
                          prev.map((r) =>
                            r.id === row.id ? { ...r, retlRequired: checked } : r
                          )
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Select
                      value={row.retlSourceOption}
                      onValueChange={(value) => {
                        setValidationData((prev) =>
                          prev.map((r) =>
                            r.id === row.id ? { ...r, retlSourceOption: value } : r
                          )
                        );
                      }}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Select source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Salesforce">Salesforce</SelectItem>
                        <SelectItem value="NetSuite">NetSuite</SelectItem>
                        <SelectItem value="ZSCM">ZSCM</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Send Email - {row.parameter}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Recipient</Label>
                            <Input placeholder="recipient@company.com" />
                          </div>
                          <div className="space-y-2">
                            <Label>Subject</Label>
                            <Input
                              defaultValue={`Validation ${row.status} - ${row.parameter}`}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Body</Label>
                            <Textarea
                              value={emailBody}
                              onChange={(e) => setEmailBody(e.target.value)}
                              rows={6}
                              placeholder="Email body..."
                            />
                          </div>
                          <Button onClick={() => handleSendEmail(row.id)}>
                            Send Email
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant={
                          row.adminApproval === "approved"
                            ? "default"
                            : "outline"
                        }
                        onClick={() => handleApproval(row.id, "approved")}
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant={
                          row.adminApproval === "rejected"
                            ? "destructive"
                            : "outline"
                        }
                        onClick={() => handleApproval(row.id, "rejected")}
                      >
                        Reject
                      </Button>
                    </div>
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

export default Compare;
