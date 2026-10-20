import React, { useState } from 'react';
import { X, Copy, Check, Download, ExternalLink, Code2, FileCode, FileText } from 'lucide-react';

interface ExportCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportCodeModal: React.FC<ExportCodeModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fileContents, setFileContents] = useState<{ html: string; css: string; js: string }>({
    html: '',
    css: '',
    js: '',
  });

  // Fetch the standalone files when modal opens
  React.useEffect(() => {
    if (!isOpen) return;
    setIsLoading(true);

    Promise.all([
      fetch('/standalone/index.html').then((r) => r.text()),
      fetch('/standalone/styles.css').then((r) => r.text()),
      fetch('/standalone/script.js').then((r) => r.text()),
    ])
      .then(([html, css, js]) => {
        setFileContents({ html, css, js });
        setIsLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load standalone code:', err);
        setIsLoading(false);
      });
  }, [isOpen]);

  if (!isOpen) return null;

  const currentCode = fileContents[activeTab];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (type: 'html' | 'css' | 'js') => {
    const filenames = {
      html: 'index.html',
      css: 'styles.css',
      js: 'script.js',
    };
    const mimeTypes = {
      html: 'text/html',
      css: 'text/css',
      js: 'text/javascript',
    };
    const blob = new Blob([fileContents[type]], { type: mimeTypes[type] });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filenames[type];
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = () => {
    handleDownload('html');
    setTimeout(() => handleDownload('css'), 200);
    setTimeout(() => handleDownload('js'), 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 text-[#00AEEF] flex items-center justify-center">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>HTML & CSS & JavaScript Code</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Ready to Host
                </span>
              </h3>
              <p className="text-xs text-zinc-400">
                Pure standalone HTML5, CSS3, and Vanilla JavaScript with zero framework dependencies.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar with Tabs & Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-3 border-b border-zinc-800 bg-zinc-900">
          {/* File Selector Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-zinc-950 rounded-lg border border-zinc-800">
            <button
              onClick={() => setActiveTab('html')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                activeTab === 'html'
                  ? 'bg-[#0066E5] text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>index.html</span>
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                activeTab === 'css'
                  ? 'bg-[#0066E5] text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>styles.css</span>
            </button>
            <button
              onClick={() => setActiveTab('js')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-mono transition-colors cursor-pointer ${
                activeTab === 'js'
                  ? 'bg-[#0066E5] text-white font-bold'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>script.js</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <a
              href="/standalone/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg border border-zinc-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#00AEEF]" />
              <span>Open HTML View</span>
            </a>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold rounded-lg border border-zinc-700 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>

            <button
              onClick={handleDownloadAll}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#0066E5] hover:bg-[#0052B8] text-white text-xs font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Files</span>
            </button>
          </div>
        </div>

        {/* Code Viewer */}
        <div className="flex-1 overflow-auto p-4 bg-zinc-950 font-mono text-xs text-zinc-300 leading-relaxed scrollbar-thin">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-zinc-500">
              Loading standalone code...
            </div>
          ) : (
            <pre className="p-2 whitespace-pre-wrap select-all font-mono">
              <code>{currentCode || '// File content loading...'}</code>
            </pre>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-zinc-950/80 border-t border-zinc-800 flex flex-wrap items-center justify-between text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Static files saved to: /public/standalone/ (index.html, styles.css, script.js)</span>
          </div>
          <div>Deployable to GitHub Pages, Netlify, Apache, cPanel, or S3</div>
        </div>
      </div>
    </div>
  );
};
