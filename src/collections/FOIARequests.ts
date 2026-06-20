import type { CollectionConfig } from 'payload'

export const FOIARequests: CollectionConfig = {
  slug: 'foia-requests',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'submittedAt', 'status'],
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
        { label: 'In Review', value: 'in-review' },
        { label: 'Pending Response', value: 'pending' },
        { label: 'Fulfilled', value: 'fulfilled' },
        { label: 'Denied', value: 'denied' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Requester Information',
          fields: [
            {
              name: 'fullName',
              type: 'text',
              required: true,
              label: 'Full Name',
            },
            {
              name: 'organization',
              type: 'text',
              label: 'Organization/Affiliation',
            },
            {
              name: 'email',
              type: 'email',
              required: true,
              label: 'Email Address',
            },
            {
              name: 'phone',
              type: 'text',
              label: 'Phone Number',
            },
            {
              name: 'preferredFormat',
              type: 'select',
              required: true,
              options: [
                { label: 'Electronic (Email)', value: 'electronic' },
                { label: 'Paper Copies', value: 'paper' },
                { label: 'Inspect in Person', value: 'inspect' },
              ],
              defaultValue: 'electronic',
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'street',
                  type: 'text',
                  label: 'Street Address',
                  admin: {
                    width: '100%',
                  },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'city',
                  type: 'text',
                  label: 'City',
                  admin: {
                    width: '50%',
                  },
                },
                {
                  name: 'state',
                  type: 'text',
                  label: 'State',
                  admin: {
                    width: '25%',
                  },
                },
                {
                  name: 'zipCode',
                  type: 'text',
                  label: 'Zip Code',
                  admin: {
                    width: '25%',
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Records Requested',
          fields: [
            {
              name: 'recordsDescription',
              type: 'textarea',
              required: true,
              label: 'Description of Records',
              admin: {
                description:
                  'Please be as specific as possible about the records you are requesting. Include details such as subject matter, document types, departments, officials involved, etc.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'dateRangeStart',
                  type: 'date',
                  required: true,
                  label: 'Start Date',
                  admin: {
                    width: '50%',
                    description: 'Earliest date for records',
                  },
                },
                {
                  name: 'dateRangeEnd',
                  type: 'date',
                  required: true,
                  label: 'End Date',
                  admin: {
                    width: '50%',
                    description: 'Latest date for records',
                  },
                },
              ],
            },
            {
              name: 'supportingDocuments',
              type: 'upload',
              relationTo: 'media',
              label: 'Supporting Documents',
              admin: {
                description: 'Upload any supporting documents that may help clarify your request',
              },
            },
          ],
        },
        {
          label: 'Additional Information',
          fields: [
            {
              name: 'commercialPurpose',
              type: 'select',
              required: true,
              options: [
                { label: 'Yes', value: 'yes' },
                { label: 'No', value: 'no' },
              ],
              label: 'Is this request for a commercial purpose?',
              admin: {
                description:
                  'Commercial purpose means using records for sale, resale, or solicitation/advertising for sales or services.',
              },
            },
            {
              name: 'feeWaiverRequested',
              type: 'checkbox',
              label: 'Request Fee Waiver',
            },
            {
              name: 'feeWaiverJustification',
              type: 'textarea',
              label: 'Fee Waiver Justification',
              admin: {
                description: 'Explain how releasing these records serves the public interest',
                condition: (data) => data.feeWaiverRequested === true,
              },
            },
            {
              name: 'acknowledgment',
              type: 'checkbox',
              required: true,
              label:
                'I understand that inspecting records is free and copy fees may apply per Illinois FOIA law',
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
                description: 'For staff use only - not visible to requester',
              },
            },
            {
              name: 'responseDate',
              type: 'date',
              label: 'Response Date',
            },
            {
              name: 'assignedTo',
              type: 'text',
              label: 'Assigned To',
            },
          ],
        },
      ],
    },
  ],
}
