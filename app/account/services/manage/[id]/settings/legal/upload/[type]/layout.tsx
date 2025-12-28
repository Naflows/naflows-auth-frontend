import '@/public/root/pages/services/manage/sub-components/settings/upload.scss';


export type LegalType = 'privacy-policy' | 'terms-of-service';



export default function LegalUploadLayout({ children, type }: { children: React.ReactNode, type: LegalType }) {
  return (
    <div className="account__services__manage__settings__legal__upload__page">
      <div className="upload__page__header">
        <div className="page__header__content">
          <h2>{type === 'privacy-policy' ? 'Upload Privacy Policy' : 'Upload Terms of Service'}</h2>
          <p>
            {type === 'privacy-policy' ? 'Upload your service\'s Privacy Policy document here. This document outlines how user data is collected, used, and protected.' : 'Upload your service\'s Terms of Service document here. This document defines the rules and regulations for using your service.'}
          </p>
        </div>
      </div>
      <div className="upload__page__content">
        {children}
      </div>
    </div>
  );
}