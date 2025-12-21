"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Mail,
  CreditCard,
  Save,
  Key,
  Smartphone,
  Moon,
  Sun,
  Monitor,
  Upload,
  Check,
  AlertTriangle,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

import type { User as UserType } from "@/types";

interface AdminSettingsTabProps {
  user?: UserType;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function AdminSettingsTab({ user }: AdminSettingsTabProps) {
  const [activeTab, setActiveTab] = useState("profile");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Profile settings
  const [profile, setProfile] = useState({
    name: user?.name || "Admin User",
    email: user?.email || "admin@itfy.com",
    phone: "+233 24 123 4567",
    bio: user?.bio || "Platform administrator with expertise in event management.",
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    email_votes: true,
    email_payments: true,
    email_reports: false,
    push_votes: true,
    push_payments: true,
    push_system: true,
  });

  // Appearance settings
  const [appearance, setAppearance] = useState({
    theme: "dark",
    sidebar_collapsed: false,
    compact_mode: false,
    animations: true,
  });

  // Security settings
  const [security, setSecurity] = useState({
    two_factor: false,
    session_timeout: "30",
    login_alerts: true,
  });

  const handleSave = async () => {
    setSaving(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const settingsTabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "security", label: "Security", icon: Shield },
    { id: "platform", label: "Platform", icon: Globe },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-slate-400 text-sm mt-1">Manage your account and platform settings</p>
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white"
        >
          {saving ? (
            <span className="flex items-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
              />
              Saving...
            </span>
          ) : saved ? (
            <span className="flex items-center">
              <Check className="w-4 h-4 mr-2" /> Saved
            </span>
          ) : (
            <span className="flex items-center">
              <Save className="w-4 h-4 mr-2" /> Save Changes
            </span>
          )}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-slate-900/50 border border-slate-700/50 p-1 flex-wrap h-auto">
          {settingsTabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="mt-6">
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid gap-6">
            <motion.div variants={cardVariants}>
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Profile Information</CardTitle>
                  <CardDescription className="text-slate-400">Update your personal details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Avatar */}
                  <div className="flex items-center gap-6">
                    <Avatar className="w-20 h-20 ring-2 ring-slate-700">
                      <AvatarImage src={user?.photo_url || undefined} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-2xl">
                        {profile.name?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                        <Upload className="w-4 h-4 mr-2" /> Change Avatar
                      </Button>
                      <p className="text-slate-500 text-xs mt-2">JPG, PNG or GIF. Max 2MB</p>
                    </div>
                  </div>

                  <Separator className="bg-slate-700" />

                  {/* Form */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Full Name</Label>
                      <Input
                        value={profile.name}
                        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                        className="bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Email</Label>
                      <Input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Phone</Label>
                      <Input
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Role</Label>
                      <Input
                        value={user?.role || "Admin"}
                        disabled
                        className="bg-slate-800/30 border-slate-700 text-slate-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-slate-300">Bio</Label>
                    <Textarea
                      value={profile.bio}
                      onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                      placeholder="Tell us about yourself"
                      className="bg-slate-800/50 border-slate-700 text-white min-h-[100px]"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6">
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid gap-6">
            <motion.div variants={cardVariants}>
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Mail className="w-5 h-5 text-blue-400" />
                    Email Notifications
                  </CardTitle>
                  <CardDescription className="text-slate-400">Configure what emails you receive</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: "email_votes", label: "Vote Notifications", desc: "Get notified when new votes come in" },
                    { key: "email_payments", label: "Payment Alerts", desc: "Receive payment confirmation emails" },
                    { key: "email_reports", label: "Weekly Reports", desc: "Get weekly analytics summaries" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                      <div>
                        <Label className="text-white">{item.label}</Label>
                        <p className="text-slate-400 text-xs">{item.desc}</p>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Smartphone className="w-5 h-5 text-purple-400" />
                    Push Notifications
                  </CardTitle>
                  <CardDescription className="text-slate-400">In-app and mobile notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: "push_votes", label: "Real-time Votes", desc: "Live updates for voting activity" },
                    { key: "push_payments", label: "Payment Updates", desc: "Instant payment notifications" },
                    { key: "push_system", label: "System Alerts", desc: "Important system announcements" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                      <div>
                        <Label className="text-white">{item.label}</Label>
                        <p className="text-slate-400 text-xs">{item.desc}</p>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, [item.key]: checked })}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="mt-6">
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid gap-6">
            <motion.div variants={cardVariants}>
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Theme</CardTitle>
                  <CardDescription className="text-slate-400">Choose your preferred color scheme</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { id: "light", label: "Light", icon: Sun },
                      { id: "dark", label: "Dark", icon: Moon },
                      { id: "system", label: "System", icon: Monitor },
                    ].map((theme) => (
                      <button
                        key={theme.id}
                        onClick={() => setAppearance({ ...appearance, theme: theme.id })}
                        className={`p-4 rounded-xl border-2 transition-all ${
                          appearance.theme === theme.id
                            ? "border-blue-500 bg-blue-500/10"
                            : "border-slate-700 bg-slate-800/30 hover:border-slate-600"
                        }`}
                      >
                        <theme.icon className={`w-6 h-6 mx-auto mb-2 ${
                          appearance.theme === theme.id ? "text-blue-400" : "text-slate-400"
                        }`} />
                        <span className={appearance.theme === theme.id ? "text-blue-400" : "text-slate-300"}>
                          {theme.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Display Options</CardTitle>
                  <CardDescription className="text-slate-400">Customize your viewing experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { key: "sidebar_collapsed", label: "Collapsed Sidebar", desc: "Start with sidebar minimized" },
                    { key: "compact_mode", label: "Compact Mode", desc: "Reduce spacing for more content" },
                    { key: "animations", label: "Animations", desc: "Enable smooth transitions" },
                  ].map((item) => (
                    <div key={item.key} className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                      <div>
                        <Label className="text-white">{item.label}</Label>
                        <p className="text-slate-400 text-xs">{item.desc}</p>
                      </div>
                      <Switch
                        checked={appearance[item.key as keyof typeof appearance] as boolean}
                        onCheckedChange={(checked) => setAppearance({ ...appearance, [item.key]: checked })}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="mt-6">
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid gap-6">
            <motion.div variants={cardVariants}>
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Key className="w-5 h-5 text-orange-400" />
                    Password
                  </CardTitle>
                  <CardDescription className="text-slate-400">Update your password</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300">Current Password</Label>
                    <Input type="password" className="bg-slate-800/50 border-slate-700 text-white" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">New Password</Label>
                      <Input type="password" className="bg-slate-800/50 border-slate-700 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Confirm Password</Label>
                      <Input type="password" className="bg-slate-800/50 border-slate-700 text-white" />
                    </div>
                  </div>
                  <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                    Update Password
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-green-400" />
                    Security Options
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div>
                      <Label className="text-white">Two-Factor Authentication</Label>
                      <p className="text-slate-400 text-xs">Add an extra layer of security</p>
                    </div>
                    <Switch
                      checked={security.two_factor}
                      onCheckedChange={(checked) => setSecurity({ ...security, two_factor: checked })}
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div>
                      <Label className="text-white">Session Timeout</Label>
                      <p className="text-slate-400 text-xs">Auto logout after inactivity</p>
                    </div>
                    <Select
                      value={security.session_timeout}
                      onValueChange={(value) => setSecurity({ ...security, session_timeout: value })}
                    >
                      <SelectTrigger className="w-32 bg-slate-800/50 border-slate-700 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-700">
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="never">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div>
                      <Label className="text-white">Login Alerts</Label>
                      <p className="text-slate-400 text-xs">Get notified of new logins</p>
                    </div>
                    <Switch
                      checked={security.login_alerts}
                      onCheckedChange={(checked) => setSecurity({ ...security, login_alerts: checked })}
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="bg-red-950/30 border-red-900/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5" />
                    Danger Zone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-400 text-sm mb-4">
                    Permanently delete your account and all associated data. This action cannot be undone.
                  </p>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        {/* Platform Tab */}
        <TabsContent value="platform" className="mt-6">
          <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid gap-6">
            <motion.div variants={cardVariants}>
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-400" />
                    Platform Settings
                  </CardTitle>
                  <CardDescription className="text-slate-400">Configure global platform options</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-slate-300">Platform Name</Label>
                      <Input
                        defaultValue="ITFY eVoting"
                        className="bg-slate-800/50 border-slate-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-300">Default Currency</Label>
                      <Select defaultValue="GHS">
                        <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-700">
                          <SelectItem value="GHS">Ghana Cedi (GHS)</SelectItem>
                          <SelectItem value="USD">US Dollar (USD)</SelectItem>
                          <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300">Support Email</Label>
                    <Input
                      type="email"
                      defaultValue="support@itfy.com"
                      className="bg-slate-800/50 border-slate-700 text-white"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={cardVariants}>
              <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-green-400" />
                    Payment Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                        <span className="text-yellow-400 font-bold text-sm">MTN</span>
                      </div>
                      <div>
                        <Label className="text-white">MTN Mobile Money</Label>
                        <p className="text-slate-400 text-xs">Accept MoMo payments</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center">
                        <span className="text-red-400 font-bold text-sm">VOD</span>
                      </div>
                      <div>
                        <Label className="text-white">Vodafone Cash</Label>
                        <p className="text-slate-400 text-xs">Accept Vodafone payments</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-800/30 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <span className="text-blue-400 font-bold text-sm">AT</span>
                      </div>
                      <div>
                        <Label className="text-white">AirtelTigo Money</Label>
                        <p className="text-slate-400 text-xs">Accept AT Money payments</p>
                      </div>
                    </div>
                    <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30">Inactive</Badge>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
