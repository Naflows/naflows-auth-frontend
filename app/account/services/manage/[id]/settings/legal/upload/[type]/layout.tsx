import '@/public/root/pages/services/manage/sub-components/settings/upload.scss';
import { use } from 'react';


export type LegalType = 'privacy-policy' | 'terms-of-service' | 'support-contact';



export default function LegalUploadLayout({ children, params }: { children: React.ReactNode, params: Promise<{ type: LegalType }> }) {

    const paramsResolved = use(params);
    const type: LegalType = paramsResolved.type as LegalType;

  function getHeader() {
    switch (type) {
      case 'privacy-policy':
        return {title: 'Upload Privacy Policy', description: 'Upload your service\'s Privacy Policy document here. This document outlines how user data is collected, used, and protected.'};
      case 'terms-of-service':
        return {title: 'Upload Terms of Service', description: 'Upload your service\'s Terms of Service document here. This document defines the rules and regulations for using your service.'};
      case 'support-contact':
        return {title: 'Upload Support Contact', description: 'Upload your service\'s Support Contact information here. This information will be used to assist users with any issues they may encounter.'};
      default:
        return {title: '', description: ''};
    }
  }

  return (
    <div className="account__services__manage__settings__legal__upload__page">
      <div className="upload__page__header">
        <div className="page__header__content">
          <h2>{getHeader().title}</h2>
          <p>
            {getHeader().description}
          </p>
        </div>
      </div>
      <div className="upload__page__content">
        {children}
      </div>
    </div>
  );
}