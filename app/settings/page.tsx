"use client"

import { useState } from "react"
import { AppNav } from "@/components/app-nav"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Bell, Shield, Palette } from "lucide-react"

export default function SettingsPage() {
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [marketingEmails, setMarketingEmails] = useState(false)
    const [publicProfile, setPublicProfile] = useState(true)

    return (
        <div className="min-h-screen">
            <AppNav />

            <div className="container max-w-4xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Settings</h1>

                <Tabs defaultValue="account" className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="md:col-span-1">
                            <TabsList className="flex flex-col h-auto w-full bg-transparent p-0 gap-2">
                                <TabsTrigger
                                    value="account"
                                    className="w-full justify-start gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                                >
                                    <User className="h-4 w-4" />
                                    Account
                                </TabsTrigger>
                                <TabsTrigger
                                    value="notifications"
                                    className="w-full justify-start gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                                >
                                    <Bell className="h-4 w-4" />
                                    Notifications
                                </TabsTrigger>
                                <TabsTrigger
                                    value="privacy"
                                    className="w-full justify-start gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                                >
                                    <Shield className="h-4 w-4" />
                                    Privacy
                                </TabsTrigger>
                                <TabsTrigger
                                    value="appearance"
                                    className="w-full justify-start gap-2 data-[state=active]:bg-primary/10 data-[state=active]:text-primary"
                                >
                                    <Palette className="h-4 w-4" />
                                    Appearance
                                </TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="md:col-span-3">
                            <TabsContent value="account" className="mt-0 space-y-6">
                                <Card className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">Account Information</h2>
                                    <div className="space-y-4">
                                        <div className="grid gap-2">
                                            <Label>Email Address</Label>
                                            <div className="text-muted-foreground text-sm">user@example.com</div>
                                        </div>
                                        <div className="pt-4 border-t border-border">
                                            <Button variant="outline" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                                Delete Account
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </TabsContent>

                            <TabsContent value="notifications" className="mt-0 space-y-6">
                                <Card className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">Email Notifications</h2>
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Job Alerts</Label>
                                                <p className="text-sm text-muted-foreground">Receive emails about new job matches</p>
                                            </div>
                                            <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-0.5">
                                                <Label>Marketing Emails</Label>
                                                <p className="text-sm text-muted-foreground">Receive emails about new features and promotions</p>
                                            </div>
                                            <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
                                        </div>
                                    </div>
                                </Card>
                            </TabsContent>

                            <TabsContent value="privacy" className="mt-0 space-y-6">
                                <Card className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">Privacy Settings</h2>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Public Profile</Label>
                                            <p className="text-sm text-muted-foreground">Allow employers to find your profile</p>
                                        </div>
                                        <Switch checked={publicProfile} onCheckedChange={setPublicProfile} />
                                    </div>
                                </Card>
                            </TabsContent>

                            <TabsContent value="appearance" className="mt-0 space-y-6">
                                <Card className="p-6">
                                    <h2 className="text-xl font-semibold mb-4">Appearance</h2>
                                    <p className="text-muted-foreground text-sm">Theme settings coming soon.</p>
                                </Card>
                            </TabsContent>
                        </div>
                    </div>
                </Tabs>
            </div>
        </div>
    )
}
