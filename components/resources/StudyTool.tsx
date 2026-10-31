"use client";

import { useEffect, useRef, useState } from "react";
import { createToolEnvironment } from "@/lib/learning-tool-runtime";
import { learningToolStyles } from "./learning-tool-styles";

type ToolModule = { markup: string; styles: string; mount: (...args: ReturnType<typeof createToolEnvironment>["args"]) => void };

export function StudyTool({ id }: { id: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  useEffect(() => {
    const element=host.current!;
    const root=element.shadowRoot ?? element.attachShadow({mode:"open"});
    let active=true;
    let environment: ReturnType<typeof createToolEnvironment> | undefined;
    const url=`/learning-tools/${id}.js`;
    import(/* webpackIgnore: true */ url).then((tool: ToolModule) => {
      if(!active) return;
      // Only build-generated, same-origin content is mounted; no user HTML.
      root.innerHTML=`<style>${tool.styles}\n${learningToolStyles}</style><div class="tool-document" data-theme="light"><div class="tool-head"></div><div class="tool-body">${tool.markup}</div></div>`;
      environment=createToolEnvironment(root);
      tool.mount(...environment.args);
      setStatus("ready");
    }).catch(() => {
      if(!active) return;
      environment?.dispose();
      setStatus("error");
    });
    return () => { active=false; environment?.dispose(); };
  }, [id]);
  return <div className="study-tool">
    {status==="loading" && <p role="status" className="rounded-card border border-ink-200 bg-white p-8 text-ink-600">Loading your study tools…</p>}
    {status==="error" && <div role="alert" className="rounded-card border border-ink-200 bg-white p-8"><h2 className="text-xl font-bold">The study tool couldn’t load</h2><p className="mt-3">Your saved progress is still in this browser. Refresh the page to try again.</p></div>}
    <div ref={host} className={status==="ready" ? "" : "hidden"}/>
    <noscript>Enable JavaScript to use these interactive study tools.</noscript>
  </div>;
}
