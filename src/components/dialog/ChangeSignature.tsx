import React from 'react';
import CreateSignatureAttribute from './CreateSignatureAttribute';

const ChangeSignature = () => {
  return (
    <CreateSignatureAttribute>
      <Button
        size="lg"
        className="mt-3 w-full custom-shadow text-[#272B30] hover:text-[#272B30] bg-white font-semibold gap-2 py-5 lg:hover:scale-105 transition-transform"
        variant="ghost"
      >
        <EditIcon />
        {t('changeSignature')}
      </Button>
    </CreateSignatureAttribute>
  );
};

export default ChangeSignature;
