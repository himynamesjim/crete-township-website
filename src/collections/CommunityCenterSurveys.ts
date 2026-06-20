import type { CollectionConfig } from 'payload'
import { canCreateOrUpdate, canDelete, canRead } from '../access'

export const CommunityCenterSurveys: CollectionConfig = {
  slug: 'community-center-surveys',
  labels: {
    singular: 'Community Center Survey',
    plural: 'Community Center Surveys',
  },
  admin: {
    useAsTitle: 'submittedAt',
    defaultColumns: ['residentStatus', 'visitFrequency', 'overallRating', 'submittedAt'],
    group: 'Forms',
    description: 'Resident survey responses for the Crete Township Community Center',
  },
  access: {
    create: () => true,
    read: canRead,
    update: canCreateOrUpdate,
    delete: canDelete,
  },
  fields: [
    {
      name: 'residentStatus',
      type: 'select',
      label: 'Resident Status',
      options: [
        { label: 'Crete Township Resident', value: 'resident' },
        { label: 'Non-Resident', value: 'non-resident' },
      ],
    },
    {
      name: 'visitFrequency',
      type: 'select',
      label: 'Visit Frequency',
      options: [
        { label: 'This is my first visit', value: 'first' },
        { label: 'A few times a year', value: 'few-year' },
        { label: 'Monthly', value: 'monthly' },
        { label: 'Weekly', value: 'weekly' },
        { label: 'Daily', value: 'daily' },
      ],
    },
    {
      name: 'facilitiesUsed',
      type: 'text',
      label: 'Facilities Used (comma-separated values)',
    },
    {
      name: 'overallRating',
      type: 'select',
      label: 'Overall Rating',
      options: [
        { label: '5 – Excellent', value: '5' },
        { label: '4 – Good', value: '4' },
        { label: '3 – Average', value: '3' },
        { label: '2 – Below Average', value: '2' },
        { label: '1 – Poor', value: '1' },
      ],
    },
    {
      name: 'cleanlinessRating',
      type: 'select',
      label: 'Cleanliness Rating',
      options: ['5','4','3','2','1'].map(v => ({ label: v, value: v })),
    },
    {
      name: 'staffRating',
      type: 'select',
      label: 'Staff Rating',
      options: ['5','4','3','2','1'].map(v => ({ label: v, value: v })),
    },
    {
      name: 'valuePricingRating',
      type: 'select',
      label: 'Value / Pricing Rating',
      options: ['5','4','3','2','1'].map(v => ({ label: v, value: v })),
    },
    {
      name: 'programsInterest',
      type: 'text',
      label: 'Programs of Interest (comma-separated)',
    },
    {
      name: 'wouldRecommend',
      type: 'select',
      label: 'Would Recommend',
      options: [
        { label: 'Yes', value: 'yes' },
        { label: 'No', value: 'no' },
        { label: 'Not sure', value: 'maybe' },
      ],
    },
    {
      name: 'improvements',
      type: 'textarea',
      label: 'Suggested Improvements',
    },
    {
      name: 'additionalComments',
      type: 'textarea',
      label: 'Additional Comments',
    },
    {
      name: 'wantsUpdates',
      type: 'checkbox',
      label: 'Wants Email Updates',
      defaultValue: false,
    },
    {
      name: 'name',
      type: 'text',
      label: 'Name (optional)',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email (optional)',
    },
    {
      name: 'submittedAt',
      type: 'date',
      label: 'Submitted At',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
  ],
}
