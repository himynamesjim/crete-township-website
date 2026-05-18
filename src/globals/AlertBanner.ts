import type { GlobalConfig } from 'payload'

export const AlertBanner: GlobalConfig = {
  slug: 'alert-banner',
  label: 'Alert Banner',
  admin: {
    description: 'Emergency or important site-wide notice displayed at the top of every page',
    group: 'Site Config',
  },
  access: {
    read: () => true, // Public
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Show Alert Banner',
      defaultValue: false,
      admin: {
        description: 'Toggle to show/hide the alert banner site-wide',
      },
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
      label: 'Alert Message',
      admin: {
        placeholder: 'e.g., Emergency Board Meeting: May 20, 2026 at 6:00 PM',
        rows: 2,
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'info',
      options: [
        {
          label: 'Info (Blue)',
          value: 'info',
        },
        {
          label: 'Warning (Gold)',
          value: 'warning',
        },
        {
          label: 'Emergency (Red)',
          value: 'emergency',
        },
        {
          label: 'Success (Green)',
          value: 'success',
        },
      ],
    },
    {
      name: 'link',
      type: 'group',
      label: 'Link (optional)',
      fields: [
        {
          name: 'url',
          type: 'text',
          label: 'Link URL',
          admin: {
            placeholder: '/about or https://example.com',
          },
        },
        {
          name: 'text',
          type: 'text',
          label: 'Link Text',
          admin: {
            placeholder: 'e.g., Learn More',
          },
        },
      ],
    },
    {
      name: 'expiresAt',
      type: 'date',
      label: 'Auto-hide Date (optional)',
      admin: {
        description: 'Alert will automatically hide after this date',
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
