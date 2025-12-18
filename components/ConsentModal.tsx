import React from 'react';
import { useModal } from '../context/ModalContext';

const ConsentModal: React.FC = () => {
  const { isConsentOpen, closeConsentModal } = useModal();

  if (!isConsentOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 no-print">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-lg w-full animate-fadeIn">
        <h3 className="text-2xl font-bold mb-4 text-navy-gemini playfair">Terms of Service & Privacy</h3>
        <div className="h-64 overflow-y-auto text-gray-700 text-sm space-y-3 pr-2">
          <p><strong>Service Agreement:</strong> The Wedding Nanny provides professional childcare services for designated event periods. Our nannies are vetted, background-checked, and trained for group supervision. We require a detailed brief on all children's needs (allergies, special requirements) at least 7 days prior to the event.</p>
          <p><strong>Cancellation Policy:</strong> The 25% is non-refundable. Cancellations made less than 30 days before the event date are subject to the full payment fee.</p>
          <p><strong>Privacy:</strong> We collect contact information solely for the purpose of booking and managing our services. We do not share client data with third parties without explicit consent. By checking the box on the contact form, you consent to receive communication regarding your quote and booking.</p>
          <p className="text-rose-gemini font-semibold">This is a summary. Full terms are available upon booking confirmation.</p>
        </div>
        <button onClick={closeConsentModal} className="cta-button text-white font-bold py-2 px-6 rounded-full mt-6 hover:shadow-lg">Close</button>
      </div>
    </div>
  );
};

export default ConsentModal;