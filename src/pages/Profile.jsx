import { useContext, useState } from "react";
import { FiCamera, FiLock, FiSave, FiTrash2, FiUser } from "react-icons/fi";
import toast from "react-hot-toast";

import FormField from "../components/UI/FormField";
import PageHeader from "../components/UI/PageHeader";
import { AuthContext } from "../context/auth-context";
import MainLayout from "../Layouts/MainLayout";
import { apiMessage } from "../services/api";
import {
  changePassword,
  deleteAccount,
  updateProfile,
  uploadAvatar,
} from "../services/users";

const Profile = () => {
  const { user, clearSession, setSessionUser } = useContext(AuthContext);
  const [profile, setProfile] = useState({
    name: user?.name || "",
    avatarUrl: user?.avatarUrl || "",
  });
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
  });
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      const updated = await updateProfile(profile);
      setSessionUser(updated);
      toast.success("Profile updated.");
    } catch (error) {
      toast.error(apiMessage(error, "Could not update profile."));
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const updated = await uploadAvatar(file);
      setProfile((current) => ({ ...current, avatarUrl: updated.avatarUrl || "" }));
      setSessionUser(updated);
      toast.success("Avatar uploaded.");
    } catch (error) {
      toast.error(apiMessage(error, "Could not upload avatar."));
    } finally {
      setIsUploading(false);
    }
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();

    try {
      await changePassword(passwords);
      toast.success("Password changed. Please log in again.");
      clearSession();
    } catch (error) {
      toast.error(apiMessage(error, "Could not change password."));
    }
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm("Delete your account? This signs you out and disables access.");
    if (!confirmed) return;

    try {
      await deleteAccount();
      toast.success("Account deleted.");
      clearSession();
    } catch (error) {
      toast.error(apiMessage(error, "Could not delete account."));
    }
  };

  return (
    <MainLayout>
      <PageHeader
        meta="Account"
        title="Profile"
        description="Manage your service desk identity, avatar, password, and account lifecycle."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_0.85fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-4">
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt=""
                className="h-20 w-20 rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-cyan-100 text-3xl font-bold text-cyan-800">
                {(profile.name || user?.email || "U").charAt(0)}
              </div>
            )}

            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
              <FiCamera />
              {isUploading ? "Uploading..." : "Upload avatar"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
                disabled={isUploading}
              />
            </label>
          </div>

          <form onSubmit={handleSaveProfile} className="space-y-4">
            <FormField label="Full name">
              <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3 transition focus-within:border-cyan-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-cyan-100">
                <FiUser className="text-slate-400" />
                <input
                  value={profile.name}
                  onChange={(event) => setProfile({ ...profile, name: event.target.value })}
                  className="w-full bg-transparent py-3 outline-none"
                  required
                />
              </div>
            </FormField>

            <FormField label="Avatar URL">
              <input
                value={profile.avatarUrl}
                onChange={(event) => setProfile({ ...profile, avatarUrl: event.target.value })}
                className={FormField.controlClasses}
                placeholder="https://..."
              />
            </FormField>

            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 font-semibold text-white transition hover:bg-cyan-700 disabled:opacity-60"
            >
              <FiSave />
              {isSaving ? "Saving..." : "Save profile"}
            </button>
          </form>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">Security</h2>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <FormField label="Current password">
              <input
                type="password"
                value={passwords.currentPassword}
                onChange={(event) =>
                  setPasswords({ ...passwords, currentPassword: event.target.value })
                }
                className={FormField.controlClasses}
                required
              />
            </FormField>

            <FormField label="New password">
              <input
                type="password"
                value={passwords.newPassword}
                onChange={(event) =>
                  setPasswords({ ...passwords, newPassword: event.target.value })
                }
                className={FormField.controlClasses}
                minLength={8}
                required
              />
            </FormField>

            <button
              type="submit"
              className="flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 font-semibold text-white transition hover:bg-cyan-700"
            >
              <FiLock />
              Change password
            </button>
          </form>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={handleDeleteAccount}
              className="flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 font-semibold text-rose-700 transition hover:bg-rose-100"
            >
              <FiTrash2 />
              Delete account
            </button>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Profile;
