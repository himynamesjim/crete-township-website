import type { Access } from 'payload'

/**
 * Role-Based Access Control for Crete Township CMS
 *
 * Roles:
 * - super-admin: Full access to everything (township supervisors)
 * - township-admin: Access to Documents, Content, Site Configs, and Form Submissions only
 * - admin: Can manage all content but not users or settings
 * - editor: Can create and edit content in their department
 * - viewer: Read-only access to published content
 */

export type UserRole = 'super-admin' | 'township-admin' | 'admin' | 'editor' | 'viewer'

/**
 * Check if user is authenticated
 */
export const isAuthenticated: Access = ({ req: { user } }) => {
  return Boolean(user)
}

/**
 * Check if user is super admin
 */
export const isSuperAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'super-admin'
}

/**
 * Check if user is admin or super admin
 */
export const isAdminOrSuperAdmin: Access = ({ req: { user } }) => {
  return user?.role === 'admin' || user?.role === 'super-admin'
}

/**
 * Admin panel access - returns boolean only (for collection.access.admin field)
 * Use this for the admin field in collection access config
 */
export const adminPanelAccess = ({ req: { user } }: any): boolean => {
  return Boolean(user?.role === 'admin' || user?.role === 'super-admin')
}

/**
 * Check if user is township admin or super admin
 */
export const isTownshipAdminOrAbove: Access = ({ req: { user } }) => {
  return user?.role === 'township-admin' || user?.role === 'super-admin'
}

/**
 * Check if user is editor, admin, or super admin
 */
export const isEditorOrAbove: Access = ({ req: { user } }) => {
  return user?.role === 'editor' || user?.role === 'admin' || user?.role === 'super-admin'
}

/**
 * Super admins can do anything
 * Township admins can create/update
 * Admins can create/update
 * Editors can create/update
 * Viewers can only read published content
 */
export const canCreateOrUpdate: Access = ({ req: { user } }) => {
  if (!user) return false

  // Super admins, township admins, and admins can do anything
  if (user.role === 'super-admin' || user.role === 'township-admin' || user.role === 'admin') {
    return true
  }

  // Editors can create/update
  if (user.role === 'editor') {
    return true
  }

  return false
}

/**
 * Only super admins, township admins, and admins can delete
 */
export const canDelete: Access = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'super-admin' || user.role === 'township-admin' || user.role === 'admin'
}

/**
 * Everyone can read published content
 * Authenticated users can see drafts
 */
export const canRead: Access = ({ req: { user } }) => {
  // If no user (public), only show published content
  if (!user) {
    return {
      status: { equals: 'published' }
    }
  }

  // Authenticated users can see all content
  return true
}

/**
 * Only super admins can manage users
 */
export const canManageUsers: Access = ({ req: { user } }) => {
  if (!user) return false

  // Only super admins can create/update/delete users
  if (user.role === 'super-admin') {
    return true
  }

  return false
}

/**
 * Users can read their own profile
 * Super admins can read all users
 */
export const canReadUsers: Access = ({ req: { user } }) => {
  if (!user) return false

  // Super admins can see all users
  if (user.role === 'super-admin') {
    return true
  }

  // Other users can only see themselves
  return {
    id: { equals: user.id }
  }
}

/**
 * Users can update their own profile
 * Super admins can update any user
 */
export const canUpdateUsers: Access = ({ req: { user }, id }) => {
  if (!user) return false

  // Super admins can update any user
  if (user.role === 'super-admin') {
    return true
  }

  // Users can update their own profile
  return user.id === id
}
