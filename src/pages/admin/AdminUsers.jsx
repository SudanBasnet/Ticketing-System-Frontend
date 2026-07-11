import { useCallback, useEffect, useState } from "react";
import { FiRefreshCw, FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";

import PageHeader from "../../components/UI/PageHeader";
import MainLayout from "../../Layouts/MainLayout";
import { apiMessage } from "../../services/api";
import { listUsers, updateUserRole, updateUserStatus } from "../../services/users";
import Spinner from "../../components/UI/Spinner";

const roles = ["user", "agent", "admin"];
const statuses = ["active", "disabled"];

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const loadUsers = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const result = await listUsers({ search: search || undefined });
      setUsers(result.users);
    } catch (loadError) {
      setError(apiMessage(loadError, "Could not load users."));
    } finally {
      setIsLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timeout = window.setTimeout(loadUsers, 250);
    return () => window.clearTimeout(timeout);
  }, [loadUsers]);

  const handleRoleChange = async (userId, role) => {
    try {
      const updated = await updateUserRole(userId, role);
      setUsers((current) => current.map((user) => (user.id === userId ? updated : user)));
      toast.success("Role updated.");
    } catch (updateError) {
      toast.error(apiMessage(updateError, "Could not update role."));
    }
  };

  const handleStatusChange = async (userId, status) => {
    try {
      const updated = await updateUserStatus(userId, status);
      setUsers((current) => current.map((user) => (user.id === userId ? updated : user)));
      toast.success("Status updated.");
    } catch (updateError) {
      toast.error(apiMessage(updateError, "Could not update status."));
    }
  };

  return (
    <MainLayout>
      <PageHeader
        meta="Administration"
        title="Users"
        description="Manage service desk roles and account access."
        actions={
          <button
            type="button"
            onClick={loadUsers}
            className="flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <FiRefreshCw />
            Refresh
          </button>
        }
      />

      <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-3">
          <FiSearch className="text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full bg-transparent py-3 outline-none"
          />
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full">
            <thead className="bg-slate-950 text-sm text-white">
              <tr>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Verified</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    <Spinner label="Loading users..." />
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id} className="border-b border-slate-100 last:border-b-0">
                    <td className="px-4 py-4 font-medium text-slate-900">{user.name}</td>
                    <td className="px-4 py-4 text-slate-700">{user.email}</td>
                    <td className="px-4 py-4">
                      <select
                        value={user.role}
                        onChange={(event) => handleRoleChange(user.id, event.target.value)}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                      >
                        {roles.map((role) => (
                          <option key={role} value={role}>
                            {role}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={user.status}
                        onChange={(event) => handleStatusChange(user.id, event.target.value)}
                        className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-4 text-slate-700">
                      {user.isEmailVerified ? "Yes" : "No"}
                    </td>
                  </tr>
                ))
              )}

              {!isLoading && users.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </MainLayout>
  );
};

export default AdminUsers;
