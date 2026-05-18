import type { CollectionConfig } from 'payload'

import { canManageUsers, canReadUsers, canUpdateUsers } from '../../access'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req: { user } }) => Boolean(user),
    // Anyone authenticated can create users (for initial setup, will restrict later)
    create: ({ req: { user } }) => Boolean(user),
    // Only super admins can delete users
    delete: canManageUsers,
    // Users can read their own profile, super admins can read all
    read: canReadUsers,
    // Users can update their own profile, super admins can update any
    update: canUpdateUsers,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
    description: 'Manage users and their access permissions',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'super-admin', // Default to super-admin for initial setup
      options: [
        {
          label: 'Super Admin',
          value: 'super-admin',
        },
        {
          label: 'Township Admin',
          value: 'township-admin',
        },
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'Editor',
          value: 'editor',
        },
        {
          label: 'Viewer',
          value: 'viewer',
        },
      ],
      admin: {
        description: 'Super Admin: Full access | Township Admin: Documents, Content, Site Configs only | Admin: Manage content | Editor: Create/edit content | Viewer: Read-only',
        position: 'sidebar',
      },
      // Temporarily allow anyone authenticated to change roles for initial setup
      // TODO: Restore strict access control after initial setup
      access: {
        create: ({ req: { user } }) => Boolean(user),
        update: ({ req: { user } }) => Boolean(user),
      },
    },
    {
      name: 'department',
      type: 'select',
      options: [
        { label: 'Township Board', value: 'board' },
        { label: 'Assessor', value: 'assessor' },
        { label: 'Road District', value: 'road-district' },
        { label: 'Clerk', value: 'clerk' },
        { label: 'General Assistance', value: 'general-assistance' },
        { label: 'General', value: 'general' },
      ],
      admin: {
        description: 'User\'s department (optional)',
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}
