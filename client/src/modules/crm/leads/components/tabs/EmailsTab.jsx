import React, { useState } from 'react';
import { Mail, Plus } from 'lucide-react';
import NewEmailModal from '../modals/NewEmailModal';

export default function EmailsTab({ lead, activities, onAddActivity }) {
  const [showModal, setShowModal] = useState(false);
  
  const emails = activities?.filter(a => a.type === 'email') || [];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' }}>
        <button
          onClick={() => setShowModal(true)}
          style={{ background: '#171717', border: '1px solid #2b2b2b', borderRadius: '6px', padding: '5px 12px', fontSize: '12px', color: '#afafaf', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
        >
          <Plus size={12} /> New Email
        </button>
      </div>

      {emails.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px 0' }}>
          <Mail size={36} color="#232323" strokeWidth={1} />
          <p style={{ fontSize: '13px', color: '#383838', marginTop: '12px' }}>No Email Communications</p>
          <button
            onClick={() => setShowModal(true)}
            style={{ background: '#171717', border: '1px solid #2b2b2b', borderRadius: '6px', padding: '5px 12px', fontSize: '12px', color: '#afafaf', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginTop: '12px' }}
          >
            <Plus size={12} /> New Email
          </button>
        </div>
      ) : (
        <div>
          {emails.map((email, i) => (
            <div key={i} style={{ background: '#171717', border: '1px solid #1c1c1c', borderRadius: '8px', padding: '12px 14px', marginBottom: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#f8f8f8' }}>{email.content?.subject || 'No Subject'}</span>
                <span style={{ fontSize: '11px', color: '#383838' }}>{email.timestamp}</span>
              </div>
              <div style={{ fontSize: '12px', color: '#afafaf', marginBottom: '8px' }}>To: {email.content?.to}</div>
              <div style={{ fontSize: '13px', color: '#7c7c7c', whiteSpace: 'pre-wrap' }}>{email.content?.message}</div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <NewEmailModal
          lead={lead}
          onClose={() => setShowModal(false)}
          onSend={(content) => {
            onAddActivity('email', content);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
