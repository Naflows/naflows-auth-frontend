"use client";

import { useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { useServiceData } from "../../../../layout";
import { LegalType } from "./layout";



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


export default function ServiceSettingsPage({
    type
}: {
    type: LegalType
}) {

    const [content, setContent] = useState<string>("");
    const { service } = useServiceData();
    const markdownHeaderRef = useRef<HTMLDivElement>(null);

    const [readRatio, setReadRatio] = useState<number>(0);

    

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
                <div id="textarea">
                    <textarea
                        value={content || basicMarkdownExample}
                        onChange={(e) => setContent(e.target.value)}
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
                    </div>
                    <div className="policy__header">
                        <h2>
                            {type === 'privacy-policy' ? 'Privacy Policy' : 'Terms of Service'}
                        </h2>
                    </div>


                </div>
                <div className="markdown__content" id="markdown-area" style={{
                    height: `calc(100% - ${markdownHeaderRef.current ? markdownHeaderRef.current.clientHeight : 0}px)`
                }}>
                    <Markdown>
                        {content || basicMarkdownExample}
                    </Markdown>
                </div>
            </div>
        </div>

                <p>
                    Enter the content of your legal document below in Markdown format. You can use standard Markdown syntax to format your text, including headings, lists, links, and more.
                </p>
        </div>
    );
}