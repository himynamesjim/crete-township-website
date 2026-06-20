import type { CollectionConfig } from 'payload'

export const GAInquiries: CollectionConfig = {
  slug: 'ga-inquiries',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'phone', 'email', 'assistanceType', 'submittedAt', 'status'],
    group: 'Forms',
  },
  access: {
    read: ({ req: { user } }) => {
      if (!user) return false
      return ['super-admin', 'township-admin', 'admin'].includes(user.role)
    },
    create: () => true, // Allow public to submit
    update: ({ req: { user } }) => {
      if (!user) return false
      return ['super-admin', 'township-admin', 'admin'].includes(user.role)
    },
    delete: ({ req: { user } }) => {
      if (!user) return false
      return ['super-admin', 'township-admin', 'admin'].includes(user.role)
    },
  },
  fields: [
    {
      name: 'submittedAt',
      type: 'date',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
      defaultValue: () => new Date().toISOString(),
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Referred', value: 'referred' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Applicant Information',
          fields: [
            {
              name: 'fullName',
              type: 'text',
              required: true,
              label: 'Full Name',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'phone',
                  type: 'text',
                  required: true,
                  label: 'Phone Number',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'email',
                  type: 'email',
                  required: true,
                  label: 'Email Address',
                  admin: {
                    width: '50%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'streetAddress',
                  type: 'text',
                  required: true,
                  label: 'Street Address',
                  admin: {
                    width: '60%',
                  },
                },
                {
                  name: 'city',
                  type: 'text',
                  required: true,
                  label: 'City',
                  admin: {
                    width: '40%',
                  },
                },
              ],
            },
            {
              name: 'residencyDuration',
              type: 'text',
              required: true,
              label: 'How Long a Crete Township Resident?',
              admin: {
                description: 'e.g. "2 years", "8 months"',
              },
            },
            {
              name: 'assistanceType',
              type: 'select',
              required: true,
              label: 'Type of Assistance Needed',
              options: [
                { label: 'General Assistance (monthly help for basic needs)', value: 'general' },
                {
                  label: 'Emergency Assistance (life-threatening or jeopardizes employment)',
                  value: 'emergency',
                },
              ],
            },
          ],
        },
        {
          label: 'Situation Description',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              required: true,
              label: 'Brief Description of Situation',
              admin: {
                description:
                  'Applicant-provided description of their need. Do not record SSNs, financial account details, or income figures here — those are collected on the formal paper application.',
              },
            },
            {
              name: 'consentGiven',
              type: 'checkbox',
              required: true,
              label:
                'Applicant acknowledged this is an inquiry only, not a formal application. Formal application requires in-person submission with original documents.',
            },
          ],
        },
        {
          label: 'Internal Notes',
          fields: [
            {
              name: 'internalNotes',
              type: 'textarea',
              label: 'Internal Notes',
              admin: {
                description: 'For staff use only — not visible to applicant',
              },
            },
          ],
        },
      ],
    },
  ],
}
