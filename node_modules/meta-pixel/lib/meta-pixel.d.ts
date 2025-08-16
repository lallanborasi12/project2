import type { FacebookQuery, Setup } from './typings';
export * from './typings';
export declare function addScript(f: Window, b: Document, e: string, v: string, n?: any, t?: HTMLScriptElement, s?: HTMLScriptElement): FacebookQuery;
export declare function addScriptDefault(): FacebookQuery;
export declare function setup($fbq?: FacebookQuery): Setup;
