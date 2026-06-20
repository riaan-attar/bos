import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/constants';

const EmailTemplatesContext = createContext(null);

const DEMO_TEMPLATES = [
  {
    id: 'TMPL-0001',
    name: 'Welcome Email',
    subject: 'Welcome to Avenue Builders — {{lead_name}}',
    body: '<p>Dear {{lead_name}},</p><p>Thank you for your interest in Avenue Builders. We are delighted to assist you in finding your dream property.</p><p>Our team will contact you shortly to discuss your requirements.</p><p>Warm regards,<br/>{{owner_name}}<br/>Avenue Builders</p>',
    category: 'Lead',
    createdBy: 'Admin User',
    createdOn: '01/01/2026',
  },
  {
    id: 'TMPL-0002',
    name: 'Site Visit Confirmation',
    subject: 'Site Visit Confirmed — {{property_name}}',
    body: '<p>Dear {{lead_name}},</p><p>Your site visit has been confirmed for {{visit_date}} at {{property_address}}.</p><p>Please bring a valid ID proof. Our representative {{owner_name}} will meet you at the site.</p><p>Looking forward to seeing you!</p><p>Avenue Builders Team</p>',
    category: 'Lead',
    createdBy: 'Admin User',
    createdOn: '01/01/2026',
  },
  {
    id: 'TMPL-0003',
    name: 'Deal Won — Thank You',
    subject: 'Congratulations on Your New Property!',
    body: '<p>Dear {{customer_name}},</p><p>Congratulations! We are thrilled to welcome you to the Avenue Builders family.</p><p>Your property {{property_name}} has been successfully registered.</p><p>Our team is here for any support you need going forward.</p><p>Thank you for choosing us!</p><p>Warm regards,<br/>Avenue Builders</p>',
    category: 'Deal',
    createdBy: 'Admin User',
    createdOn: '01/01/2026',
  },
  {
    id: 'TMPL-0004',
    name: 'Follow-up Reminder',
    subject: 'Following up — {{property_name}}',
    body: '<p>Dear {{lead_name}},</p><p>I hope you are doing well. I wanted to follow up regarding your interest in {{property_name}}.</p><p>We have some exciting updates and special offers available. Would you be available for a quick call this week?</p><p>Best regards,<br/>{{owner_name}}<br/>Avenue Builders</p>',
    category: 'Lead',
    createdBy: 'Amit Kulkarni',
    createdOn: '05/01/2026',
  },
];

export function EmailTemplatesProvider({ children }) {
  const [templates, setTemplates] = useState(() =>
    loadFromStorage('bos_emailtemplates', DEMO_TEMPLATES)
  );

  useEffect(() => {
    saveToStorage('bos_emailtemplates', templates);
  }, [templates]);

  const addTemplate = (template) =>
    setTemplates(prev => [template, ...prev]);

  const updateTemplate = (id, updates) =>
    setTemplates(prev =>
      prev.map(t => (t.id === id ? { ...t, ...updates } : t))
    );

  const deleteTemplate = (id) =>
    setTemplates(prev => prev.filter(t => t.id !== id));

  return (
    <EmailTemplatesContext.Provider value={{ templates, addTemplate, updateTemplate, deleteTemplate }}>
      {children}
    </EmailTemplatesContext.Provider>
  );
}

export const useEmailTemplates = () => useContext(EmailTemplatesContext);
