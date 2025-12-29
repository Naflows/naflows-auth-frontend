"use client";

import { use, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";
import { useServiceData } from "../../../../layout";
import { LegalType } from "./layout";
import UploadLegalDocuments from "./components/document";
import UploadServiceSupportContact from "./components/support";




export default function ServiceSettingsPage({
    params
}: {
    params: Promise<{ type: LegalType }>
}) {
    const paramsResolved = use(params);
    const type: LegalType = paramsResolved.type as LegalType;



    if (type === "support-contact") {
        return <UploadServiceSupportContact />;
    } else {
        return <UploadLegalDocuments type={type} />;
    }




}