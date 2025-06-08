import type { Metadata } from "next"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { AccountSettingsContent } from "@/components/dashboard/account-settings/account-settings-content"

export const metadata: Metadata = {
  title: "Account Settings | ZuneMoney - Manage Your Profile",
  description:
    "Manage your ZuneMoney account settings. Update your password, profile name, or delete your account securely.",
  keywords: "account settings, manage profile, change password, delete account, ZuneMoney",
  openGraph: {
    title: "Account Settings | ZuneMoney - Manage Your Profile",
    description:
      "Manage your ZuneMoney account settings. Update your password, profile name, or delete your account securely.",
    url: "https://app.zune.money/dashboard/account-settings",
    siteName: "ZuneMoney",
    images: [
      {
        url: "https://app.zune.money/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ZuneMoney - Account Settings",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Account Settings | ZuneMoney - Manage Your Profile",
    description:
      "Manage your ZuneMoney account settings. Update your password, profile name, or delete your account securely.",
    images: ["https://app.zune.money/twitter-image.jpg"],
    creator: "@zunemoney",
  },
}

export default function AccountSettingsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground">Manage your account details and security settings</p>
        </div>
        <AccountSettingsContent />
      </div>
    </DashboardShell>
  )
}
