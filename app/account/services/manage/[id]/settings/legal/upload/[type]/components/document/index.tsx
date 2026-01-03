import { useEffect, useRef, useState } from "react";
import { LegalType } from "../../layout";
import { useServiceData } from "@/app/account/services/manage/[id]/layout";
import Markdown from "react-markdown";
import { useNotification } from "@/global/action-information/NotificationContent";
import { updateLegalDocument } from "@/scripts/pages/services/post/update-legal";


const basicMarkdownExample = `# Sample Legal Document

This is a sample legal document written in Markdown.

## Section 1: Introduction

Welcome to our service. By using our service, you agree to the following terms and conditions.

## Section 2: User Responsibilities

- You must be at least 18 years old to use this service.
- You agree not to use the service for any illegal activities.

## Section 3: Data Collection

We collect the following types of data:
- Personal Information
- Usage Data

## Section 4: Contact Us

If you have any questions about this document, please contact us at [].

`;




export default function UploadLegalDocuments({ type }: { type: LegalType }) {
    const markdownHeaderRef = useRef<HTMLDivElement>(null);

    const [readRatio, setReadRatio] = useState<number>(0);
    const [currentRefHeight, setCurrentRefHeight] = useState<number>(0);
    const serviceData = useServiceData();
    const service = serviceData?.service;
    const [content, setContent] = useState<string>("");
    const [typeKey, setTypeKey] = useState<string>(type.replace(/-/g, "_") + "_url");

    const {
        addNotification
    } = useNotification();

    useEffect(() => {
        if (service) {
            console.log("Service details public:", service.details.public);
            console.log("Type key:", type.replace(/-/g, "_"));
            const typeKey = type.replace(/-/g, "_") + "_url";
            if (service.details.public[typeKey as keyof typeof service.details.public]) {
                setContent(service.details.public[type.replace(/-/g, "_") + "_url" as keyof typeof service.details.public]?.value || basicMarkdownExample);
                setTypeKey(typeKey);
            } else {
                setContent(basicMarkdownExample);
            }
        }
    }, [service])

    useEffect(() => {
        if (markdownHeaderRef.current) {
            setCurrentRefHeight(markdownHeaderRef.current.clientHeight);
        }
    }, [markdownHeaderRef.current]);



    useEffect(() => {
        const handleScroll = () => {
            const textarea = document.getElementById('markdown-area');
            if (textarea) {
                const scrollTop = textarea.scrollTop;
                const scrollHeight = textarea.scrollHeight - textarea.clientHeight;
                const ratio = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
                setReadRatio(ratio);
            }
        };

        const textarea = document.getElementById('markdown-area');
        if (textarea) {
            textarea.addEventListener('scroll', handleScroll);
        }

        return () => {
            if (textarea) {
                textarea.removeEventListener('scroll', handleScroll);
            }
        };
    }, [markdownHeaderRef.current]);

    if (!service) return null;


    return (
        <div className="account__services__manage__settings__page">

            <div className="upload__page__markdown__editor">
                <div className="textarea__content">

                    {
                        !service.details.public[typeKey as keyof typeof service.details.public]?.approved &&
                        <div className="info__banner">
                            <strong>Note:</strong> No {type === 'privacy-policy' ? 'Privacy Policy' : 'Terms of Service'} has been approved for this service yet. You cannot publish your service until an approved document is in place.
                        </div>
                    }
                    <div id="textarea">
                        <textarea
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Enter your legal document content in Markdown format here..."
                            value={content}
                        />
                    </div>
                </div>

                <div className="markdown__area">
                    <div className="policy__header" ref={markdownHeaderRef}>
                        <div className="reading__progress__bar">
                            <div className="reading__progress__fill" style={{ width: `${readRatio * 100}%` }}></div>
                        </div>
                        <div className="policy__service">
                            <img src={service.picture || '/default-service-icon.png'} alt="Service Icon" />
                            <div className="service__header">
                                <span id="service-name">{service.name}</span>
                                <span id="legal-document-preview">Legal document provided to users of {service.name}</span>
                            </div>

                            <button className="primary-button" onClick={async () => {

                                // Save markdown with all lines, spaces, and formatting intact
                                const contentToSave = content;


                                const res = await updateLegalDocument(service.id, type, contentToSave);
                                if (res.success) {
                                    addNotification({
                                        type: 'info',
                                        title: 'Legal Document Uploaded',
                                        description: 'Your legal document has been successfully uploaded.'
                                    });
                                } else {
                                    addNotification({
                                        type: 'error',
                                        title: 'Upload Failed',
                                        description: `There was an error uploading your document: ${res.message}`
                                    });
                                }
                            }} style={{
                                marginLeft: 'auto',
                            }}>
                                Save Changes
                            </button>
                        </div>
                        <div className="policy__header">
                            <h2>
                                {type === 'privacy-policy' ? 'Privacy Policy' : 'Terms of Service'}
                            </h2>
                        </div>


                    </div>
                    <div className="markdown__content" id="markdown-area" style={{
                        height: `calc(100% - ${currentRefHeight}px)`
                    }}>
                        <Markdown skipHtml>
                            {content || basicMarkdownExample}
                        </Markdown>
                    </div>
                </div>
            </div>

            <p>
                Enter the content of your legal document below in Markdown format. You can use standard Markdown syntax to format your text, including headings, lists, links, and more.
            </p>
        </div>
    )
}