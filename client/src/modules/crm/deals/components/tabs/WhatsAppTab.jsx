import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLeads } from '../../../../../context/LeadsContext';

export default function WhatsAppTab({ deal }) {
  const { leads } = useLeads();
  const contact = leads.find(l => l.id === deal?.linkedLeadId);
  const mobile = contact?.mobileNo || '';

  const handleOpenWhatsApp = () => {
    if (mobile) {
      const num = mobile.replace(/\D/g, '');
      window.open(`https://wa.me/${num}`, '_blank');
    } else {
      alert('No mobile number for this contact');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 0' }}>
      <MessageCircle size={36} color="#232323" strokeWidth={1} />
      <p style={{ fontSize: '13px', color: '#383838', marginTop: '12px' }}>No WhatsApp messages yet</p>
      
      <button
        onClick={handleOpenWhatsApp}
        style={{
          background: '#25D366', color: '#fff', border: 'none', borderRadius: '20px',
          padding: '8px 20px', fontSize: '13px', fontWeight: 500, marginTop: '14px', cursor: 'pointer'
        }}
      >
        Open WhatsApp
      </button>
    </div>
  );
}
