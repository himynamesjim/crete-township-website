import type { GlobalConfig } from 'payload'

export const SidebarWidgets: GlobalConfig = {
  slug: 'sidebar-widgets',
  label: 'Sidebar Widgets',
  admin: {
    group: 'Site Settings',
    description: 'Configure the widgets that appear in page sidebars across the site.',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'widgets',
      type: 'blocks',
      label: 'Widgets',
      blocks: [
        {
          slug: 'quick-links',
          labels: { singular: 'Quick Links', plural: 'Quick Links' },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Quick Links',
            },
            {
              name: 'links',
              type: 'array',
              minRows: 1,
              fields: [
                { name: 'label', type: 'text', required: true },
                { name: 'url', type: 'text', required: true },
                {
                  name: 'newTab',
                  type: 'checkbox',
                  label: 'Open in new tab',
                  defaultValue: false,
                },
              ],
            },
          ],
        },
        {
          slug: 'contact-card',
          labels: { singular: 'Contact Card', plural: 'Contact Cards' },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              defaultValue: 'Contact Us',
            },
            { name: 'office', type: 'text', label: 'Office / Department Name' },
            { name: 'address', type: 'text', label: 'Street Address' },
            { name: 'cityStateZip', type: 'text', label: 'City, State ZIP' },
            { name: 'phone', type: 'text' },
            { name: 'fax', type: 'text' },
            { name: 'email', type: 'email' },
            {
              name: 'hours',
              type: 'textarea',
              label: 'Office Hours',
              admin: { placeholder: 'Monday – Friday: 8:00 AM – 4:30 PM' },
            },
          ],
        },
        {
          slug: 'announcement-alert',
          labels: { singular: 'Announcement / Alert', plural: 'Announcements / Alerts' },
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'body',
              type: 'textarea',
              required: true,
            },
            {
              name: 'style',
              type: 'select',
              defaultValue: 'info',
              options: [
                { label: 'Info (blue)', value: 'info' },
                { label: 'Warning (gold)', value: 'warning' },
                { label: 'Alert (red)', value: 'alert' },
                { label: 'Neutral (gray)', value: 'neutral' },
              ],
            },
            { name: 'linkLabel', type: 'text', label: 'Button Label (optional)' },
            { name: 'linkUrl', type: 'text', label: 'Button URL (optional)' },
          ],
        },
      ],
    },
  ],
}
