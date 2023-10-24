"use client";

import { useParams } from "next/navigation";

const DocumentIdPage = () => {
    const { documentId } = useParams();
    return <div>Note id: {documentId}</div>;
    }

export default DocumentIdPage;
