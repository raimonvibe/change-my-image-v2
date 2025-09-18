'use client';
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useDropzone } from "react-dropzone";
import { API_URL } from "../../env";
import { Download, Upload, Wand2, AlertTriangle } from "lucide-react";

const FORMATS = ["jpg","jpeg","png","webp","avif","heic","tiff","bmp","gif","svg"];

type Job = {
  file: File;
  status: 'queued' | 'running' | 'done' | 'error';
  url?: string;
  error?: string;
};

export default function ConvertPage() {
  const { data: session } = useSession();
  const [target, setTarget] = useState('webp');
  const [quality, setQuality] = useState(85);
  const [jobs, setJobs] = useState<Job[]>([]);
  const token = (session as any)?.idToken;

  const onDrop = (acceptedFiles: File[]) => {
    const newJobs = acceptedFiles.map((f) => ({ file: f, status: 'queued' } as Job));
    setJobs((prev) => [...prev, ...newJobs]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, multiple: true });
  const dropClass = isDragActive ? 'border-sky-500 bg-sky-50' : 'border-slate-300';

  const start = async () => {
    const pending = jobs.filter(j => j.status === 'queued');
    for (const j of pending) {
      setJobs((prev) => prev.map(x => x === j ? { ...x, status: 'running' } : x));
      const form = new FormData();
      form.append('file', j.file);
      form.append('to', target);
      form.append('quality', String(quality));
      try {
        const res = await fetch(`${API_URL}/api/convert`, {
          method: 'POST',
          headers: token ? ({ Authorization: `Bearer ${token}` } as HeadersInit) : undefined,
          body: form,
        });
        if (res.status === 401) throw new Error('Please sign in with Google to convert.');
        if (res.status === 402) throw new Error('Limit reached. Purchase more conversions for $1 = 5 images.');
        if (!res.ok) throw new Error(`Conversion failed: ${res.status}`);
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        setJobs((prev) => prev.map(x => x === j ? { ...x, status: 'done', url } : x));
      } catch (e: any) {
        setJobs((prev) => prev.map(x => x === j ? { ...x, status: 'error', error: e.message } : x));
      }
    }
  };

  useEffect(() => {
  }, [token]);

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold text-sky-800 flex items-center gap-2">
        <Wand2 className="text-sky-600" /> Convert Images
      </h1>
      <div className="rounded-lg border bg-white p-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-slate-600 mb-1">Target format</label>
            <select value={target} onChange={(e)=>setTarget(e.target.value)} className="w-full rounded-md border-slate-300">
              {FORMATS.map(f => <option key={f} value={f}>{f.toUpperCase()}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm text-slate-600 mb-1">Quality</label>
            <input type="range" min={1} max={100} value={quality} onChange={(e)=>setQuality(Number(e.target.value))} className="w-full" />
            <div className="text-xs text-slate-500 mt-1">{quality}</div>
          </div>
          <div className="flex items-end">
            <button onClick={start} className="inline-flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-white hover:bg-sky-700">
              <Wand2 size={16} /> Convert
            </button>
          </div>
        </div>
        <div {...getRootProps()} className={"mt-4 border-2 border-dashed rounded-lg p-8 text-center " + dropClass}>
          <input {...getInputProps()} />
          <div className="flex items-center justify-center gap-2 text-slate-600">
            <Upload /> Drag & drop images here, or click to select
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        {jobs.map((j, idx) => (
          <div key={idx} className="rounded-md border bg-white p-3 flex items-center justify-between">
            <div className="text-sm">
              <div className="font-medium">{j.file.name}</div>
              <div className="text-xs text-slate-500">{Math.round(j.file.size/1024)} KB — {j.status}</div>
              {j.status === 'error' && <div className="text-rose-600 flex items-center gap-1 text-xs mt-1"><AlertTriangle size={14}/> {j.error}</div>}
            </div>
            <div>
              {j.status === 'done' && j.url && (
                <a href={j.url} download={`converted.${target}`} className="inline-flex items-center gap-1 rounded-md bg-emerald-600 px-3 py-1.5 text-white hover:bg-emerald-700">
                  <Download size={16} /> Download
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}