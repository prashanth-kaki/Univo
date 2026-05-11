import React from 'react';

import {
  Ban,
  Trash2,
  Shield,
} from 'lucide-react';

import RoleBadge
  from '../RoleBadge';

import StatusBadge
  from '../StatusBadge';

const UserTable = ({
  users,
  onEditRole,
  onBanUser,
  onDeleteUser,
}) => {

  return (

    <div className="
      w-full
      overflow-x-auto
    ">

      <table className="
        w-full
        text-left
        border-collapse
      ">

        {/* TABLE HEADER */}

        <thead>

          <tr className="
            bg-slate-50
            border-y
            border-slate-200
          ">

            <th className="
              py-4
              px-6
              text-xs
              font-semibold
              text-slate-500
              uppercase
              tracking-wider
            ">
              User
            </th>

            <th className="
              py-4
              px-6
              text-xs
              font-semibold
              text-slate-500
              uppercase
              tracking-wider
            ">
              Role
            </th>

            <th className="
              py-4
              px-6
              text-xs
              font-semibold
              text-slate-500
              uppercase
              tracking-wider
            ">
              Department
            </th>

            <th className="
              py-4
              px-6
              text-xs
              font-semibold
              text-slate-500
              uppercase
              tracking-wider
            ">
              Status
            </th>

            <th className="
              py-4
              px-6
              text-xs
              font-semibold
              text-slate-500
              uppercase
              tracking-wider
            ">
              Joined
            </th>

            <th className="
              py-4
              px-6
              text-xs
              font-semibold
              text-slate-500
              uppercase
              tracking-wider
              text-right
            ">
              Actions
            </th>

          </tr>
        </thead>

        {/* TABLE BODY */}

        <tbody className="
          divide-y
          divide-slate-100
        ">

          {users.length === 0 ? (

            <tr>

              <td
                colSpan="6"
                className="
                  py-8
                  text-center
                  text-slate-500
                "
              >
                No users found.
              </td>

            </tr>

          ) : (

            users.map(
              (user) => (

                <tr

                  key={
                    user._id
                  }

                  className="
                    hover:bg-slate-50/50
                    transition-colors
                  "
                >

                  {/* USER */}

                  <td className="
                    py-3
                    px-6
                  ">

                    <div className="
                      flex
                      items-center
                      gap-3
                    ">

                      {/* AVATAR */}

                      <div className="
                        w-9
                        h-9
                        rounded-full
                        bg-indigo-100
                        text-indigo-600
                        flex
                        items-center
                        justify-center
                        font-bold
                        text-sm
                        uppercase
                      ">

                        {user?.name
                          ?.charAt(0) || 'U'}

                      </div>

                      {/* USER DETAILS */}

                      <div className="
                        flex
                        flex-col
                      ">

                        <span className="
                          font-semibold
                          text-slate-800
                          text-sm
                        ">
                          {user.name}
                        </span>

                        <span className="
                          text-xs
                          text-slate-500
                        ">
                          {user.email}
                        </span>

                      </div>
                    </div>
                  </td>

                  {/* ROLE */}

                  <td className="
                    py-3
                    px-6
                  ">

                    <RoleBadge
                      role={
                        user.role
                      }
                    />

                  </td>

                  {/* DEPARTMENT */}

                  <td className="
                    py-3
                    px-6
                    text-sm
                    text-slate-600
                  ">

                    {user.branch ||
                      user.department ||
                      'N/A'}

                  </td>

                  {/* STATUS */}

                  <td className="
                    py-3
                    px-6
                  ">

                    <StatusBadge

                      status={
                        user.isActive
                          ? 'active'
                          : 'inactive'
                      }
                    />

                  </td>

                  {/* CREATED DATE */}

                  <td className="
                    py-3
                    px-6
                    text-sm
                    text-slate-600
                  ">

                    {new Date(
                      user.createdAt
                    ).toLocaleDateString()}

                  </td>

                  {/* ACTIONS */}

                  <td className="
                    py-3
                    px-6
                    text-right
                  ">

                    <div className="
                      flex
                      items-center
                      justify-end
                      gap-2
                    ">

                      {/* EDIT ROLE */}

                      <button

                        onClick={() =>
                          onEditRole(
                            user
                          )
                        }

                        className="
                          p-1.5
                          text-slate-400
                          hover:text-indigo-600
                          hover:bg-indigo-50
                          rounded-lg
                          transition-colors
                        "

                        title="Change Role"
                      >

                        <Shield size={16} />

                      </button>

                      {/* BAN USER */}

                      <button

                        onClick={() =>
                          onBanUser(
                            user
                          )
                        }

                        className={`
                          p-1.5
                          rounded-lg
                          transition-colors

                          ${user.isActive
                            ? 'text-slate-400 hover:text-amber-600 hover:bg-amber-50'
                            : 'text-red-500 hover:bg-red-50'}
                        `}

                        title={
                          user.isActive
                            ? 'Ban User'
                            : 'Unban User'
                        }
                      >

                        <Ban size={16} />

                      </button>

                      {/* DELETE USER */}

                      <button

                        onClick={() =>
                          onDeleteUser(
                            user
                          )
                        }

                        className="
                          p-1.5
                          text-slate-400
                          hover:text-red-600
                          hover:bg-red-50
                          rounded-lg
                          transition-colors
                        "

                        title="Delete User"
                      >

                        <Trash2 size={16} />

                      </button>

                    </div>
                  </td>
                </tr>
              )
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;