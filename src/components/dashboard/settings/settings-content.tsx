"use client"

import { ChangePasswordSection } from "./change-password-section"
import { EditProfileSection } from "./edit-profile-section"
import { DeleteAccountSection } from "./delete-account-section"

export function AccountSettingsContent() {
  return (
    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
      <div className="space-y-6">
        <ChangePasswordSection />
        <EditProfileSection />
        <DeleteAccountSection />
      </div>
    </div>
  )
}
