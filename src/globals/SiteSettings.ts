import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  access: {
    read: () => true,
    update: ({ req: { user } }) => {
      if (!user) return false
      return ['super-admin', 'township-admin', 'admin'].includes(user.role)
    },
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'FOIA Settings',
          fields: [
            {
              name: 'foiaNotificationEmail',
              type: 'email',
              required: true,
              label: 'FOIA Notification Email',
              admin: {
                description:
                  'Email address where FOIA request notifications will be sent (e.g., administrator@cretetownship.com)',
              },
            },
            {
              name: 'foiaResponseTime',
              type: 'text',
              label: 'Expected Response Time',
              defaultValue: '5 business days',
              admin: {
                description: 'Displayed on the form to set expectations',
              },
            },
            {
              name: 'foiaInstructions',
              type: 'textarea',
              label: 'Additional Instructions',
              admin: {
                description: 'Additional text to display on the FOIA request form',
              },
            },
          ],
        },
        {
          label: 'Contact Information',
          fields: [
            {
              name: 'mainPhone',
              type: 'text',
              label: 'Main Office Phone',
              defaultValue: '708-672-8279',
            },
            {
              name: 'mainEmail',
              type: 'email',
              label: 'Main Office Email',
              defaultValue: 'administrator@cretetownship.com',
            },
            {
              name: 'address',
              type: 'group',
              label: 'Office Address',
              fields: [
                {
                  name: 'street',
                  type: 'text',
                  defaultValue: '1367 Wood Street',
                },
                {
                  name: 'city',
                  type: 'text',
                  defaultValue: 'Crete',
                },
                {
                  name: 'state',
                  type: 'text',
                  defaultValue: 'IL',
                },
                {
                  name: 'zipCode',
                  type: 'text',
                  defaultValue: '60417',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
