import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

// If using Vite, you can import as text:
import consentText from "../src/assets/consent.md?raw";

export function ConsentDialogContent() {
  return <ReactMarkdown>{consentText}</ReactMarkdown>;
}